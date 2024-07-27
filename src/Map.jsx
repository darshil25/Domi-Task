import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ address }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const initializeMap = useCallback(() => {
    if (mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView([address.lat, address.lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    markerRef.current = L.marker([address.lat, address.lon]).addTo(mapInstanceRef.current);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;

    mapInstanceRef.current.setView([address.lat, address.lon], 13);
    markerRef.current.setLatLng([address.lat, address.lon]);
  }, [address]);

  return <div ref={mapRef} className='generated_map'></div>;
}

export default Map;