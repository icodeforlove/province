import { describe, it, expect } from 'vitest';
import {
  provinces,
  getProvincesByZip,
  getProvincesByDistrict,
  getProvincesByCity,
  getCities,
  getDistricts,
  getZips,
  getZipMap,
  getDistrictMap,
  getCityMap,
  type Province
} from '../index.js';

describe('provinces dataset', () => {
  it('exports provinces as an array', () => {
    expect(Array.isArray(provinces)).toBe(true);
    expect(provinces.length).toBeGreaterThan(0);
  });

  it('ensures every entry has the expected shape', () => {
    const allHaveShape = provinces.every((p: Province) =>
      typeof p.zip === 'number' &&
      typeof p.subdistrict === 'string' &&
      typeof p.subdistrict_th === 'string' &&
      typeof p.district === 'string' &&
      typeof p.district_th === 'string' &&
      typeof p.city === 'string' &&
      typeof p.city_th === 'string'
    );

    expect(allHaveShape).toBe(true);
  });

  it('contains a known Bangkok entry', () => {
    const bangkok = provinces.find(
      p => p.zip === 10200 && p.subdistrict === 'Phra Borom Maha Ratchawang'
    );

    expect(bangkok).toMatchObject({
      zip: 10200,
      subdistrict: 'Phra Borom Maha Ratchawang',
      district: 'Phra Nakhon',
      city: 'Bangkok',
    });
  });

  it('provides lookup helpers by zip and district', () => {
    const zipMatches = getProvincesByZip('10200');
    expect(zipMatches.length).toBeGreaterThan(0);
    expect(zipMatches.every(p => p.zip === 10200)).toBe(true);

    const byDistrict = getProvincesByDistrict('พระนคร');
    expect(byDistrict.length).toBeGreaterThan(0);
    expect(byDistrict.every(p => p.district_th === 'พระนคร')).toBe(true);

    const byDistrictEn = getProvincesByDistrict('Phra Nakhon', 'en');
    expect(byDistrictEn.length).toBeGreaterThan(0);
    expect(byDistrictEn.every(p => p.district === 'Phra Nakhon')).toBe(true);
  });

  it('provides lookup helpers by city', () => {
    const bangkokTh = getProvincesByCity('กรุงเทพมหานคร');
    expect(bangkokTh.length).toBeGreaterThan(0);
    expect(bangkokTh.some(p => p.zip === 10200)).toBe(true);

    const bangkok = getProvincesByCity('Bangkok', 'en');
    expect(bangkok.length).toBeGreaterThan(0);
    expect(bangkok.some(p => p.zip === 10200)).toBe(true);
  });

  it('exposes unique lists by locale', () => {
    const cities = getCities();
    expect(cities).toContain('กรุงเทพมหานคร');

    const citiesEn = getCities('en');
    expect(citiesEn).toContain('Bangkok');

    const districts = getDistricts();
    expect(districts).toContain('พระนคร');

    const districtsEn = getDistricts('en');
    expect(districtsEn).toContain('Phra Nakhon');

    const zips = getZips();
    expect(zips).toContain(10200);
  });

  it('exposes map-like lookup records by locale', () => {
    const zipMap = getZipMap();
    expect(zipMap['10200']?.every(p => p.zip === 10200)).toBe(true);

    const norm = (v: string) => v.trim().toLowerCase();

    const districtThMap = getDistrictMap('th');
    expect(districtThMap[norm('พระนคร')]?.length).toBeGreaterThan(0);
    expect(districtThMap[norm('พระนคร')]?.every(p => p.district_th === 'พระนคร')).toBe(true);

    const districtEnMap = getDistrictMap('en');
    expect(districtEnMap[norm('Phra Nakhon')]?.length).toBeGreaterThan(0);
    expect(districtEnMap[norm('Phra Nakhon')]?.every(p => p.district === 'Phra Nakhon')).toBe(true);

    const cityThMap = getCityMap('th');
    expect(cityThMap[norm('กรุงเทพมหานคร')]?.length).toBeGreaterThan(0);
    expect(cityThMap[norm('กรุงเทพมหานคร')]?.some(p => p.zip === 10200)).toBe(true);

    const cityEnMap = getCityMap('en');
    expect(cityEnMap[norm('Bangkok')]?.length).toBeGreaterThan(0);
    expect(cityEnMap[norm('Bangkok')]?.some(p => p.zip === 10200)).toBe(true);
  });
});

