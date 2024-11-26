import _ from "lodash";
import qs from "qs";
import { FilterType, KeyValueObject } from "../types/files/filestypes";

export const removeFalsy = (malformedObject: KeyValueObject) => {
  return _.omitBy(malformedObject, _.isEmpty);
};

export const createFilterUrl = (filterObject: FilterType) => {
  const query = qs.stringify(
    {
      ...filterObject.basic,
    },
    {
      encodeValuesOnly: true,
    }
  );

  return query;
};

export const formFieldsToKeyValue = (queryObject: KeyValueObject) => {
  return removeFalsy(queryObject as KeyValueObject);
};

export const generateQueryFilterUrl = (
  queryObject: KeyValueObject
): {
  filterUrl: string;
  queryParams: _.Dictionary<string | number | boolean>;
} => {
  const newQueryObject = { ...queryObject };
  const queryParams = removeFalsy(newQueryObject as KeyValueObject);
  const filterUrl = qs.stringify(
    {
      ...queryParams,
    },
    {
      encodeValuesOnly: true,
    }
  );
  return {
    filterUrl,
    queryParams,
  };
};
