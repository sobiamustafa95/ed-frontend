/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';

import { ICreateBookingResponse } from '@/@types/booking';
import { DEFAULT_CENTER } from '@/constants';
import { useGeocoding } from '@/hooks/useGeocoding';
import { cn, sanitizeValue, showToast } from '@/lib/utils';
import { strings } from '@/locales';
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

import FormField from '../FormField';
import Loader from '../Loader';

interface IMapProps {
  address: string;
  errors: FieldErrors<ICreateBookingResponse>;
  control: Control<ICreateBookingResponse>;
  setValue: any;
  onLocationChange: (address: string, lat: string, lng: string) => void;
}

const Map: React.FC<IMapProps> = ({
  errors,
  control,
  setValue,
  onLocationChange,
}) => {
  const { location, fetchGeocode } = useGeocoding();
  const [mapOptions, setMapOptions] = useState<google.maps.MapOptions | null>(
    null,
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const staticText = strings.geocoding;
  const errorMessage = strings.errors.createRequest;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      setMapOptions({
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
      });
    }
  }, [isLoaded]);

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) {
      showToast.error(errorMessage.autoCompleteError);
      return;
    }

    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const formattedAddress = place.formatted_address || '';
      const latitude = place.geometry.location?.lat().toString() || '0';
      const longitude = place.geometry.location?.lng().toString() || '0';

      setValue('address', formattedAddress);
      setValue('location.lat', latitude);
      setValue('location.lng', longitude);
      onLocationChange(formattedAddress, latitude, longitude);
      fetchGeocode(formattedAddress);
    }
  };

  if (!isLoaded) return <Loader />;

  return (
    <div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={location || DEFAULT_CENTER}
        zoom={14}
        options={mapOptions || undefined}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <Controller
          control={control}
          name={'address' as Path<ICreateBookingResponse>}
          rules={{ required: errorMessage.addressRequired }}
          render={({ field: { onChange, value } }) => {
            return (
              <FormField
                title={staticText.heading}
                name='address'
                value={sanitizeValue(value)}
                onChange={(e) => {
                  onChange(e);
                }}
                placeholder={staticText.placeholder}
                errors={errors}
                className={cn(
                  'border-2 rounded-md focus:outline-none focus:border-primary',
                )}
                isRequired
              />
            );
          }}
        />
      </Autocomplete>
    </div>
  );
};

export default React.memo(Map);
