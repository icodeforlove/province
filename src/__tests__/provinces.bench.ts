import { bench, describe } from 'vitest';
import {
  provinces,
  getProvincesByZip,
  getProvincesByDistrict,
  getProvincesByCity,
  getCities,
  getDistricts,
  getZips,
} from '../index.js';

const sampleZip = provinces[0]?.zip ?? 0;
const sampleDistrictTh = provinces[0]?.district_th ?? '';
const sampleCityTh = provinces[0]?.city_th ?? '';

describe('provinces benchmarks', () => {
  bench('getProvincesByZip', () => {
    getProvincesByZip(sampleZip);
  });

  bench('getProvincesByDistrict (th)', () => {
    getProvincesByDistrict(sampleDistrictTh);
  });

  bench('getProvincesByCity (th)', () => {
    getProvincesByCity(sampleCityTh);
  });

  bench('getCities (th)', () => {
    getCities();
  });

  bench('getDistricts (th)', () => {
    getDistricts();
  });

  bench('getZips', () => {
    getZips();
  });
});

