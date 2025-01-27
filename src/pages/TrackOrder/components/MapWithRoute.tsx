import React, { useEffect, useState } from 'react';

import MarkIcon from '@/assets/svgs/markIcon.svg';
import Loader from '@/components/Loader';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  OverlayView,
  useLoadScript,
} from '@react-google-maps/api';

import AddressCard from './AddressCard';

interface MapWithRouteProps {
  startPoint: { lat: number; lng: number; address: string };
  endPoint: { lat: number; lng: number; address: string };
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({
  startPoint,
  endPoint,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
  });

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const [error, setError] = useState<string | null>(null);

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const fetchDirections = async () => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: { lat: startPoint.lat, lng: startPoint.lng },
        destination: { lat: endPoint.lat, lng: endPoint.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(result);
    } catch (err) {
      setError('Failed to fetch directions. Please try again.');
      console.error('Directions API Error:', err);
    }
  };

  useEffect(() => {
    if (!isLoaded || !startPoint || !endPoint) return;
    fetchDirections();
  }, [isLoaded, startPoint, endPoint]);

  if (!isLoaded) return <Loader />;

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  return (
    <div className='router-map-container'>
      <GoogleMap
        mapContainerStyle={{ height: 'calc(100vh - 72px)', width: '100%' }}
        center={{
          lat: directionsResponse
            ? (startPoint.lat + endPoint.lat) / 2
            : startPoint.lat,
          lng: directionsResponse
            ? (startPoint.lng + endPoint.lng) / 2
            : startPoint.lng,
        }}
        zoom={7}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {/* Start Point Overlay */}
        <OverlayView
          position={startPoint}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Marker
            position={startPoint}
            icon={{
              url: MarkIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            clickable={false}
          />
        </OverlayView>
        <AddressCard address={startPoint.address} />

        {/* End Point Overlay */}
        <OverlayView
          position={endPoint}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <Marker
            position={endPoint}
            icon={{
              url: MarkIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            clickable={false}
          />
        </OverlayView>

        {/* Directions Renderer */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true, // to hide default marked icon for A and B
              polylineOptions: {
                strokeColor: '#6666ff',
                strokeOpacity: 0.3,
                strokeWeight: 12,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapWithRoute;
