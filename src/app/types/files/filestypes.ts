export type BasicType = {
    page: number;
    perPage: number;
  };
  
  export type KeyValueObject = {
    [key: string]: string | number | boolean;
  };
  
  export type FilterType = {
    basic: {
      page: number;
      per_page: number;
    };
  };
  
  export const FilterTypeInitialVal: FilterType = {
    basic: { page: 1, per_page: 10 },
  };