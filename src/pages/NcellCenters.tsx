import Sidebar from '../components/NcellCenters/Sidebar';
import Map from '../components/NcellCenters/Map';
import { MapProvider } from '../components/NcellCenters/MapContext';

const NcellCentersMap = () => {
  return (
    <MapProvider>
      <div className="min-h-screen w-full bg-red">
        <div className="mx-auto px-4 h-full flex flex-col gap-6">
          <p className="text-center text-3xl py-8 text-[#2D1B5C]">
            Ncell Centre
          </p>
          <div className="text-center mb-8">
            <p className="text-gray-600 max-w-4xl mx-auto text-lg">
              Ncell Centres are located in many major cities. We will be adding
              more Ncell Centres in various parts of Nepal in the near future.
              You are welcome to visit our Ncell Centres for any kind of queries
              at your convenience.
            </p>
          </div>

          <div className="flex justify-between gap-10">
            <Sidebar />
            <Map />
          </div>
        </div>
      </div>
    </MapProvider>
  );
};

export default NcellCentersMap;
