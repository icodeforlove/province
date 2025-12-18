/**
 * MRZ Fast - High-performance TypeScript MRZ Parser
 * Focused on 2-line passport codes with optimized error correction
 */

import provincesData from './provinces.js';
import provincesByZip from './provinces_by_zip.js';
import provincesByDistrictEn from './provinces_by_district_en.js';
import provincesByDistrictTh from './provinces_by_district_th.js';
import provincesByCityEn from './provinces_by_city_en.js';
import provincesByCityTh from './provinces_by_city_th.js';
import citiesEnList from './cities_en.js';
import citiesThList from './cities_th.js';
import districtsEnList from './districts_en.js';
import districtsThList from './districts_th.js';
import zipList from './zips.js';

export type Province = {
  zip: number;
  subdistrict: string;
  subdistrict_th: string;
  district: string;
  district_th: string;
  district_zip: number;
  city: string;
  city_th: string;
};

// Keep the data as a list of provinces instead of mapping them to an object.
export const provinces: Province[] = provincesData as Province[];

const normalize = (value: string) => value.trim().toLowerCase();
type Locale = 'en' | 'th';
const DEFAULT_LOCALE: Locale = 'th';

const districtRecords: Record<Locale, Record<string, Province[]>> = {
  en: provincesByDistrictEn as Record<string, Province[]>,
  th: provincesByDistrictTh as Record<string, Province[]>,
};

const cityRecords: Record<Locale, Record<string, Province[]>> = {
  en: provincesByCityEn as Record<string, Province[]>,
  th: provincesByCityTh as Record<string, Province[]>,
};

const zipRecord = provincesByZip as Record<string, Province[]>;

export function getProvincesByZip(zip: number | string): Province[] {
  const key = typeof zip === 'number' ? String(zip) : zip;
  return zipRecord[key] ?? [];
}

export function getProvincesByDistrict(district: string, locale: Locale = DEFAULT_LOCALE): Province[] {
  const target = normalize(district);
  if (!target) return [];
  return districtRecords[locale][target] ?? [];
}

export function getProvincesByCity(city: string, locale: Locale = DEFAULT_LOCALE): Province[] {
  const target = normalize(city);
  if (!target) return [];
  return cityRecords[locale][target] ?? [];
}

export function getCities(locale: Locale = DEFAULT_LOCALE): string[] {
  return (locale === 'th' ? (citiesThList as string[]) : (citiesEnList as string[]));
}

export function getDistricts(locale: Locale = DEFAULT_LOCALE): string[] {
  return (locale === 'th' ? (districtsThList as string[]) : (districtsEnList as string[]));
}

export function getZips(): number[] {
  return zipList as number[];
}

export function getZipMap(): Record<string, Province[]> {
  return zipRecord;
}

export function getDistrictMap(locale: Locale = DEFAULT_LOCALE): Record<string, Province[]> {
  return districtRecords[locale];
}

export function getCityMap(locale: Locale = DEFAULT_LOCALE): Record<string, Province[]> {
  return cityRecords[locale];
}