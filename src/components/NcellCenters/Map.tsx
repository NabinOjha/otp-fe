import { useMap } from './MapContext';

export default function Map() {
  const { mapRef } = useMap();

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm h-[550px] relative overflow-hidden">
        <div className="relative h-full z-10">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
