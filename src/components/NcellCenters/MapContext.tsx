import { useRef, useContext, useState, useEffect } from 'react';
import { createContext } from 'react';
import * as L from 'leaflet';

import { mockData, type NcellCenter } from '../../ncell-centers';
import {
  MAX_ZOOM,
  type MapContextProviderProps,
  type MapContextType,
  type SelectOption,
} from './utils';

const MapContext = createContext<MapContextType | null>(null);

export const MapProvider = ({ children }: MapContextProviderProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [centers, setCenters] = useState<NcellCenter[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<SelectOption>({
    label: 'Select a Area',
    value: 'all',
  });
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption>({
    label: 'Select a Area',
    value: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<NcellCenter | null>(
    null
  );

  useEffect(() => {
    setCenters(mockData);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      if (mapRef.current) {
        const map = L.map(mapRef.current).setView([27.7172, 85.324], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: MAX_ZOOM,
        }).addTo(map);
        leafletMapRef.current = map;
        updateMarkers(map, centers);
      }
    };

    initializeMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [centers]);

  const updateMarkers = (map: L.Map, centersToShow: NcellCenter[]) => {
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    const purpleIcon = L.divIcon({
      className: 'custom-div-icon',
      html: "<img src='https://www.ncell.com.np/images/location.svg' />",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    centersToShow.forEach(center => {
      const marker = L.marker([center.latitude, center.longitude], {
        icon: purpleIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div class="relative">
            <h3 class="font-semibold text-lg mb-1">${center.name}</h3>
            <p class="text-sm text-gray-600 mb-1">${center.address}</p>
            <p class="text-sm text-gray-600 mb-1">📞 ${center.phone}</p>
            <p class="text-sm text-gray-600">🕒 ${center.openingHours}</p>
          </div>`
        );

      marker.on('click', () => {
        setSelectedCenter(center);
      });

      markersRef.current.push(marker);
    });
  };

  const filteredCenters = centers.filter(center => {
    const matchesProvince =
      selectedProvince?.value === 'all' ||
      center.area === selectedProvince?.value;
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvince && matchesSearch;
  });

  const handleCenterClick = async (center: NcellCenter) => {
    setSelectedCenter(center);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo(
        [center.latitude, center.longitude],
        MAX_ZOOM,
        {
          duration: 2,
          easeLinearity: 0.1,
          noMoveStart: false,
        }
      );

      const centerIndex = filteredCenters.findIndex(
        l => l.name === center.name
      );
      if (centerIndex >= 0 && markersRef.current[centerIndex]) {
        markersRef.current[centerIndex].openPopup();
      }
    }
  };

  return (
    <MapContext.Provider
      value={{
        mapRef,
        selectedProvince,
        setSelectedProvince,
        setSelectedDistrict,
        selectedDistrict,
        searchQuery,
        setSearchQuery,
        handleCenterClick,
        selectedCenter,
        filteredCenters,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
