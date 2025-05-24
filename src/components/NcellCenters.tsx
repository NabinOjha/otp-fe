import { useState, useEffect } from 'react';

interface NcellCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  latitude: number;
  longitude: number;
}

const NcellCenters = () => {
  const [centers, setCenters] = useState<NcellCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const fetchCenters = async () => {
      try {
        setLoading(true);

        // Replace with your actual API endpoint
        // const response = await fetch('https://your-backend-api.com/ncell-centers');
        // const data = await response.json();

        const mockData: NcellCenter[] = [
          {
            id: 1,
            name: 'Ncell Center Kathmandu',
            address: 'Durbar Marg, Kathmandu',
            phone: '9801234567',
            openingHours: '10:00 AM - 6:00 PM',
            latitude: 27.7172,
            longitude: 85.324,
          },
          {
            id: 2,
            name: 'Ncell Center Pokhara',
            address: 'Lakeside, Pokhara',
            phone: '9807654321',
            openingHours: '10:00 AM - 6:00 PM',
            latitude: 28.2096,
            longitude: 83.9856,
          },
          {
            id: 3,
            name: 'Ncell Center Chitwan',
            address: 'Bharatpur, Chitwan',
            phone: '9812345678',
            openingHours: '10:00 AM - 6:00 PM',
            latitude: 27.5291,
            longitude: 84.3542,
          },
          {
            id: 4,
            name: 'Ncell Center Biratnagar',
            address: 'Main Road, Biratnagar',
            phone: '9809876543',
            openingHours: '10:00 AM - 6:00 PM',
            latitude: 26.4525,
            longitude: 87.2718,
          },
          {
            id: 5,
            name: 'Ncell Center Butwal',
            address: 'Milanchowk, Butwal',
            phone: '9814567890',
            openingHours: '10:00 AM - 6:00 PM',
            latitude: 27.6866,
            longitude: 83.4323,
          },
        ];

        setTimeout(() => {
          setCenters(mockData);
          setLoading(false);
        }, 1000); // Simulate network delay
      } catch {
        setError('Failed to load Ncell centers. Please try again later.');
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  const filteredCenters =
    selectedProvince === 'all'
      ? centers
      : centers.filter(center => {
          // This is a simplified example. In a real app, you'd have province data
          if (selectedProvince === 'bagmati') {
            return ['Kathmandu', 'Chitwan'].some(loc =>
              center.address.includes(loc)
            );
          } else if (selectedProvince === 'gandaki') {
            return ['Pokhara'].some(loc => center.address.includes(loc));
          } else if (selectedProvince === 'lumbini') {
            return ['Butwal'].some(loc => center.address.includes(loc));
          } else if (selectedProvince === 'province1') {
            return ['Biratnagar'].some(loc => center.address.includes(loc));
          }
          return false;
        });

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6 text-purple-700">
        Ncell Centers
      </h1>

      <div className="mb-4">
        <label
          htmlFor="province"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filter by Province
        </label>
        <select
          id="province"
          value={selectedProvince}
          onChange={e => setSelectedProvince(e.target.value)}
          className="w-full rounded-md border-gray-300 border p-2 focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="all">All Provinces</option>
          <option value="province1">Province 1</option>
          <option value="bagmati">Bagmati Province</option>
          <option value="gandaki">Gandaki Province</option>
          <option value="lumbini">Lumbini Province</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      ) : filteredCenters.length === 0 ? (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
          No centers found in the selected province.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCenters.map(center => (
            <div
              key={center.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-purple-700">
                {center.name}
              </h3>
              <div className="mt-2 space-y-1 text-sm">
                <p className="flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>{center.address}</span>
                </p>
                <p className="flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span>{center.phone}</span>
                </p>
                <p className="flex items-start">
                  <svg
                    className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>{center.openingHours}</span>
                </p>
              </div>
              <div className="mt-3">
                <a
                  href={`https://www.google.com/maps?q=${center.latitude},${center.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NcellCenters;
