import { useState, useEffect, useMemo } from 'react';
import uuid from 'react-native-uuid';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';

import useMyLocation from './useMyLocation';

export interface IPlacesResponse {
  suggestions: Suggestion[];
}

export interface Suggestion {
  placePrediction: PlacePrediction;
}

export interface PlacePrediction {
  place: string;
  placeId: string;
  text: Text;
  structuredFormat: StructuredFormat;
  types: string[];
  distanceMeters: number;
}

export interface StructuredFormat {
  mainText: Text;
  secondaryText: SecondaryText;
}

export interface Text {
  text: string;
  matches: Match[];
}

export interface Match {
  endOffset: number;
}

export interface SecondaryText {
  text: string;
}

export interface PlaceResult {
  id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const GOOGLE_API_KEY = 'AIzaSyBVJo5ok8Br8QP3UiS6HSImVzf2ptUM90U';
const PLACES_API_URL = 'https://places.googleapis.com/v1/places:autocomplete';

interface IUsePlacesAutocomplete {
  debounceTime?: number;
}

export const usePlacesAutocomplete = ({
  debounceTime = 500,
}: IUsePlacesAutocomplete) => {
  const [input, setInput] = useState('');
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { coords } = useMyLocation();

  const sessionToken = useMemo(() => {
    return uuid.v4();
  }, []);

  useEffect(() => {
    setLoading(true);

    const debounceTimeout = setTimeout(async () => {
      if (input.length < 3) {
        setPlaces([]);
        return;
      }

      setError(null);

      try {
        const response = await fetch(PLACES_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': '*',
          },
          body: JSON.stringify({
            input,
            languageCode: 'pt-BR',
            includedRegionCodes: ['br'],
            ...(coords?.latitude
              ? {
                  locationBias: {
                    circle: {
                      center: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                      },
                      radius: 3000.0,
                    },
                  },
                  origin: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  },
                }
              : {}),
            sessionToken,
          }),
        });
        console.log(JSON.stringify(response, null, 2));

        if (response.status === 403) {
          throw new Error('Sem acesso à API do Google Places');
        }

        const data: IPlacesResponse = await response.json();

        await api.post('countGoogleUsage', {
          type: 'placesGoogle',
        });

        if (data.suggestions) {
          const formattedPlaces =
            data.suggestions?.map(place => ({
              id: place?.placePrediction?.placeId,
              description: place?.placePrediction?.text?.text,
              structured_formatting: {
                main_text:
                  place?.placePrediction?.structuredFormat?.mainText?.text,
                secondary_text:
                  place?.placePrediction?.structuredFormat?.secondaryText?.text,
              },
              distanceMeters: place?.placePrediction?.distanceMeters,
            })) || [];

          const sorted = formattedPlaces.sort(
            (a, b) => a.distanceMeters - b.distanceMeters,
          );

          setPlaces(sorted);
        } else {
          setPlaces([]);
        }
      } catch (err) {
        handleError(err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    return () => {
      setLoading(false);
      clearTimeout(debounceTimeout);
    };
  }, [input, coords]);

  return {
    input,
    setInput,
    places,
    loading,
    error,
  };
};
