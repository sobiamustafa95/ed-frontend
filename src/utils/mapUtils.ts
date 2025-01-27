export const calculateDistance = (
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
): string => {
  const R = 6371; // Earth's radius in km
  const dLat = ((end.lat - start.lat) * Math.PI) / 180;
  const dLng = ((end.lng - start.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((start.lat * Math.PI) / 180) *
      Math.cos((end.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return `${distance.toFixed(2)} km`;
};

export const calculateETA = (distance: string): string => {
  const averageSpeed = 50; // Assume 50 km/h average speed
  const hours = parseFloat(distance) / averageSpeed;
  const minutes = Math.round(hours * 60);
  return `${minutes} min`;
};
