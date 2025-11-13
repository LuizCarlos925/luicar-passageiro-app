import { ILocal } from '@/interfaces/history';
import { ILocation } from '@/interfaces/location';
import { LocationGeocodedAddress } from 'expo-location';

export const formatAddress = (address: ILocation) => {
  try {
    let addressString = '';

    if (address?.neighborhood) {
      addressString = address?.neighborhood;
    }
    if (address?.city) {
      addressString = `${addressString}, ${address?.city}`;
    }
    if (address?.state) {
      addressString = `${addressString} - ${address?.state}`;
    }
    if (address?.zipCode) {
      addressString = `${addressString}, ${address?.zipCode}`;
    }

    return addressString;
  } catch (e) {
    return '';
  }
};

export const formatReverseGeocode = (address: LocationGeocodedAddress) => {
  try {
    if (address?.formattedAddress) {
      return address?.formattedAddress;
    }

    let addressString = '';

    if (address?.street) {
      addressString = address?.street;
    }
    if (address?.streetNumber) {
      addressString = `${addressString}, ${address?.streetNumber}`;
    }
    if (address?.district) {
      addressString = `${addressString} - ${address?.district}`;
    }
    if (address?.city) {
      addressString = `${addressString}, ${address?.city}`;
    }
    if (address?.region) {
      addressString = `${addressString} - ${address?.region}`;
    }
    if (address?.postalCode) {
      addressString = `${addressString}, ${address?.postalCode}`;
    }
    if (address?.country) {
      addressString = `${addressString}, ${address?.country}`;
    }

    return addressString;
  } catch (e) {
    return '';
  }
};

export const formatTripAddress = (address?: ILocal) => {
  try {
    if (!address) {
      return '';
    }
    let addressString = '';

    if (address?.address) {
      addressString = address?.address;
    }

    if (address?.number) {
      addressString = `${addressString}, ${address?.number}`;
    }

    if (address?.neighborhood) {
      addressString = `${addressString}, ${address?.neighborhood}`;
    }

    if (address?.city) {
      addressString = `${addressString}, ${address?.city}`;
    }

    if (address?.state) {
      addressString = `${addressString} - ${address?.state}`;
    }

    if (address?.zipCode) {
      addressString = `${addressString}, ${address?.zipCode}`;
    }

    return addressString;
  } catch (e) {
    return '';
  }
};
