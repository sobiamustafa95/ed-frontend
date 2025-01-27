import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ICoordinates } from '@/@types';
import { GEO_CODE_STATUS } from '@/constants';
import { showToast } from '@/lib/utils';
import { strings } from '@/locales';

export const useGeocoding = () => {
  const { t } = useTranslation();
  const staticText = strings.errors.createRequest;
  const [location, setLocation] = useState<ICoordinates | null>(null);

  const fetchGeocode = async (address: string): Promise<void> => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      showToast.error(t(staticText.missingApiKey));
      return;
    }

    const baseUrl = process.env.REACT_APP_GOOGLE_MAPS_BASE_URL;
    const geocodeUrl = `${baseUrl}/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === GEO_CODE_STATUS.OK && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
      } else {
        showToast.error(t(staticText.notFound));
      }
    } catch (error) {
      showToast.error(t(staticText.error));
    }
  };

  return { location, fetchGeocode };
};
