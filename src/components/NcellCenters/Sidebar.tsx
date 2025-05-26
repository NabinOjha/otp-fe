import Select from 'react-select';
import { useMap } from './MapContext';
import type { SingleValue } from 'react-select';
import { mockData } from '../../ncell-centers';
import type { SelectOption } from './utils';

export default function Sidebar() {
  const {
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    searchQuery,
    setSearchQuery,
    handleCenterClick,
    selectedCenter,
    filteredCenters,
  } = useMap();

  return (
    <div className="flex w-full md:max-w-[300px] lg:max-w-[375px] flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div>
          <Select
            className="rounded-lg"
            placeholder="Select a Area"
            value={selectedProvince}
            components={{ ClearIndicator: undefined }}
            styles={{
              control: provided => {
                return {
                  ...provided,
                  padding: '6px',
                  border: 'none',
                  boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.1)',
                  borderRadius: '100vh',
                };
              },
              indicatorSeparator: provided => ({
                ...provided,
                display: 'none',
              }),
              option: (provided, state) => {
                return {
                  ...provided,
                  cursor: 'pointer',
                  backgroundColor: state.isSelected
                    ? '#EBEBEB !important;'
                    : '',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#eee',
                  },
                };
              },
            }}
            onChange={(value: SingleValue<SelectOption>) => {
              setSelectedProvince(value as SelectOption);
            }}
            options={[...new Set(mockData.map(location => location.area))].map(
              l => ({ label: l, value: l })
            )}
            isClearable
          />
        </div>

        <div>
          <Select
            className="rounded-lg"
            placeholder="Select a Area"
            components={{ ClearIndicator: undefined }}
            styles={{
              control: provided => {
                return {
                  ...provided,
                  padding: '6px',
                  border: 'none',
                  boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.1)',
                  borderRadius: '100vh',
                };
              },
              indicatorSeparator: provided => ({
                ...provided,
                display: 'none',
              }),
              option: (provided, state) => {
                return {
                  ...provided,
                  backgroundColor: state.isSelected
                    ? '#EBEBEB !important;'
                    : '',
                  color: 'black',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#eee',
                  },
                };
              },
            }}
            value={selectedDistrict}
            onChange={(value: SingleValue<SelectOption>) => {
              const center = mockData.find(l => l.name == value?.value);
              if (center) handleCenterClick(center);
            }}
            options={mockData
              .filter(l => l.area == selectedProvince?.value)
              .map(l => ({ label: l.name, value: l.name }))}
            isClearable
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Location"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.1)' }}
            className="w-full bg-white p-[12px] pl-10 rounded-3xl focus:ring-0 focus:outline-none"
          />
          <div className="absolute left-3 top-2.5">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-80 overflow-y-auto scrollbar">
        <div className="rounded-lg shadow-sm h-full">
          <div className="flex flex-col gap-6 pr-3">
            {filteredCenters.map(center => (
              <div
                key={center.id}
                className={`p-4 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedCenter?.id === center.id ? 'border-red-500' : ''
                }`}
                onClick={() => handleCenterClick(center)}
              >
                <h3
                  className={`font-semibold text-lg mb-1 ${
                    selectedCenter?.id === center.id ? 'text-red-500' : ''
                  }`}
                >
                  {center.name}
                </h3>
                <p className="text-md text-gray-600 mb-2">{center.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
