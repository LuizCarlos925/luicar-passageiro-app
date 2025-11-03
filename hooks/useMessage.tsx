import { useCallback, useEffect, useMemo, useState } from 'react';
import uuid from 'react-native-uuid';
import { format, isToday } from 'date-fns';
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  arrayUnion,
  setDoc,
  query,
  collection,
  getDocs,
  addDoc,
  where,
} from 'firebase/firestore';

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { firestore, storage } from '../services/firebase';
import { useAuth } from './useAuth';

export interface ChatDoc {
  messages: IMessagesBefore[];
  userToken: string;
}

export interface IMessagesBefore {
  id: string;
  message: string;
  author: string;
  author_id: string;
  created_at: Timestamp;
  image?: string;
  is_read: number[];
}

export interface IMessages {
  id: string;
  message: string;
  author: string;
  author_id: string;
  created_at: string;
  image?: string;
  self?: boolean;
  audio?: string;
  story_id?: number;
}

export interface IChatsResponse {
  id: string;
  last_message: IMessages & {
    author: string;
    author_id: string;
    created_at: BackendTimestamp;
  };
  other_user: {
    id?: string;
    name?: string;
    avatar?: string;
    role?: string;
  };
}

export interface BackendTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export const useMessage = (chatId?: string, isCommunity?: boolean) => {
  const [messages, setMessages] = useState<IMessages[]>([]);

  const { user } = useAuth();

  const userId = isCommunity ? user?.passenger?.feed_profile?.id : user?.id;

  const otherUser = useMemo(() => {
    const found = messages.find(
      message => message.author_id !== userId?.toString(),
    );
    return found?.author;
  }, [messages, userId]);

  const chatRef = useMemo(() => {
    return chatId
      ? doc(
          firestore,
          `/${isCommunity ? 'community_chats' : 'chats'}/${chatId}`,
        )
      : null;
  }, [chatId, isCommunity]);

  const convertTime = (time: Timestamp) => {
    const date = time.toDate();
    const timeFormat = isToday(date) ? 'HH:mm' : 'dd/MM HH:mm';
    return format(date, timeFormat);
  };

  const handleCreateChat = async (other_user_id: string) => {
    const sortedUsers = [userId, other_user_id].sort();
    const chatCollection = collection(firestore, 'chats');
    const chatQuery = query(
      chatCollection,
      where('user_ids', 'in', [sortedUsers]),
    );

    const chatQuerySnapshot = await getDocs(chatQuery);
    const chatQueryDoc = chatQuerySnapshot.docs[0];

    if (chatQueryDoc) {
      return chatQueryDoc.id;
    }

    const chatDoc = await addDoc(chatCollection, {
      messages: [],
      user_ids: sortedUsers,
    });

    return chatDoc.id;
  };

  useEffect(() => {
    if (chatRef) {
      const unsubscribe = onSnapshot(chatRef, _doc => {
        const data = _doc.data() as ChatDoc;
        if (!data?.messages?.length) {
          return;
        }

        const sortedMessagesByTime = data?.messages?.sort(
          (a, b) => a.created_at.seconds - b.created_at.seconds,
        );

        const mappedMessages = sortedMessagesByTime.map(message => ({
          ...message,
          created_at: convertTime(message.created_at),
          self: message.author_id?.toString() === userId?.toString(),
        }));

        setMessages(mappedMessages);

        const unreadMessages = data.messages.filter(
          msg =>
            Number(msg?.author_id) !== userId &&
            (!msg.is_read || !msg.is_read.includes(userId)),
        );

        if (unreadMessages.length > 0) {
          const updatedMessages = data.messages.map(msg => {
            if (
              Number(msg?.author_id) !== userId &&
              (!msg.is_read || !msg.is_read.includes(userId))
            ) {
              return {
                ...msg,
                is_read: [...(msg.is_read || []), userId],
              };
            }
            return msg;
          });

          updateDoc(chatRef, { messages: updatedMessages });
        }
      });

      return unsubscribe;
    }
  }, [chatRef, user]);

  const sendMessage = useCallback(
    (message: string, storyId?: number) => {
      const trimmedMessage = message.trim();
      if (!trimmedMessage) {
        return;
      }

      if (chatRef) {
        setDoc(
          chatRef,
          {
            messages: arrayUnion({
              message: trimmedMessage,
              id: uuid.v4(),
              author: user?.passenger?.socialName || user.passenger?.name,
              author_id: userId,
              ...(storyId && { story_id: storyId }),
              created_at: Timestamp.now(),
            }),
          },
          {
            merge: true,
          },
        );
      }
    },
    [chatRef, user],
  );

  const sendImage = useCallback(
    async (uri: string) => {
      const imageName = uri.split('/').pop();
      const imageRef = storageRef(storage, `chats/${chatId}/${imageName}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);
      if (chatRef) {
        updateDoc(chatRef, {
          messages: arrayUnion({
            message: '',
            image: imageUrl,
            id: uuid.v4(),
            created_at: Timestamp.now(),
            author: user?.passenger?.socialName || user.passenger?.name,
            author_id: userId,
          }),
        });
      }
    },
    [chatRef, user, chatId],
  );

  const sendAudio = useCallback(
    async (audioUri: string, storyId?: number) => {
      const audioName = audioUri.split('/').pop();
      if (!audioName) {
        throw new Error('Nome do arquivo de áudio inválido.');
      }

      const audioStorageRef = storageRef(
        storage,
        `chats/${chatId}/audio/${audioName}`,
      );

      const response = await fetch(audioUri);
      const audioBlob = await response.blob();
      const snapshot = await uploadBytes(audioStorageRef, audioBlob);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      if (chatRef) {
        await updateDoc(chatRef, {
          messages: arrayUnion({
            message: '',
            audio: downloadUrl,
            id: uuid.v4(),
            created_at: Timestamp.now(),
            author: user?.passenger?.socialName || user.passenger?.name,
            author_id: userId,
            ...(storyId && { story_id: storyId }),
          }),
        });
      }
    },
    [chatRef, user, chatId],
  );

  return {
    messages,
    sendMessage,
    sendImage,
    sendAudio,
    otherUser,
    handleCreateChat,
  };
};
