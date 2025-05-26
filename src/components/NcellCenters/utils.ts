import type { NcellCenter } from "../../ncell-centers";

export type SelectOption = {
  label: string;
  value: string;
};

export const MAX_ZOOM = 12;

export type MapContextType = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  selectedProvince: SelectOption | null;
  setSelectedProvince: React.Dispatch<React.SetStateAction<SelectOption>>;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<SelectOption>>;
  selectedDistrict: SelectOption | null;
  searchQuery: string;
  handleCenterClick: (value: NcellCenter) => {};
  selectedCenter: NcellCenter | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredCenters: NcellCenter[];
};

export type MapContextProviderProps = {
  children: React.ReactNode;
};