[![NPM](https://nodei.co/npm/province.svg?style=flat-square&data=n,v,u,d&color=brightgreen)](https://www.npmjs.com/package/province)

# Province – high-performance Thai geography lookups

`province` is a tiny, zero-dependency TypeScript library that gives you instant, typed lookups for Thailand’s cities, districts, subdistricts, and postal codes in both Thai and English. It is designed for latency-sensitive services where every microsecond matters (address validation, autocomplete, form enrichment, ETL, fraud/risk checks).

## Why this exists

Most Thailand geo helpers are either untyped, ship sparse datasets, or require network calls and iterative searches. `province` precomputes everything into lookup maps so you get deterministic, in-memory O(1) reads with fully typed results. The data is normalized, deduped, and packaged with no runtime dependencies.

## How it differs

- Prebuilt lookup maps (zip, district, city) for constant-time reads.
- Thai and English locality names with locale-aware helpers.
- Fully typed return values for safer downstream handling.
- Zero dependencies and tree-shakeable ESM output.
- Includes raw lists (`getCities`, `getDistricts`, `getZips`) and the underlying maps when you need to iterate or cache.
- Ships with the full dataset (~20 MB uncompressed, ~1.2 MB compressed). You trade a slightly larger package for dramatically lower CPU and latency at runtime.

## When to use it

- Server-side typeahead or autocomplete that needs to respond in microseconds.
- High-volume validation, enrichment, or scoring pipelines where you want predictable CPU usage.
- Moving address/geo lookups off the client and into a service layer without adding another datastore or network hop.

## Install

```bash
npm install province
```

## Quick start

```ts
import {
  getProvincesByZip,
  getProvincesByDistrict,
  getProvincesByCity,
  getCities,
  getDistricts,
  getZips,
} from 'province';

// Postal code lookup (O(1))
const byZip = getProvincesByZip(10200);

// District lookup in Thai (default locale)
const dusit = getProvincesByDistrict('ดุสิต');

// City lookup in English
const bangkok = getProvincesByCity('bangkok', 'en');

// Lists for select inputs or caching
const citiesTh = getCities();           // Thai by default
const districtsEn = getDistricts('en'); // English
const zips = getZips();
```

All lookups return arrays of `Province`:

```ts
type Province = {
  zip: number;
  subdistrict: string;
  subdistrict_th: string;
  district: string;
  district_th: string;
  district_zip: number;
  city: string;
  city_th: string;
};
```

## API

- `getProvincesByZip(zip: number | string): Province[]`
- `getProvincesByDistrict(district: string, locale?: 'en' | 'th'): Province[]`
- `getProvincesByCity(city: string, locale?: 'en' | 'th'): Province[]`
- `getCities(locale?: 'en' | 'th'): string[]`
- `getDistricts(locale?: 'en' | 'th'): string[]`
- `getZips(): number[]`
- `getZipMap(): Record<string, Province[]>`
- `getDistrictMap(locale?: 'en' | 'th'): Record<string, Province[]>`
- `getCityMap(locale?: 'en' | 'th'): Record<string, Province[]>`

## Performance

Benchmarks (vitest bench, local run):

```
✓ dist/__tests__/provinces.bench.js > provinces benchmarks 19953ms
    name                                    hz     min     max    mean     p75     p99    p995    p999     rme   samples
  · getProvincesByZip            30,517,705.08  0.0000  3.5031  0.0000  0.0000  0.0000  0.0000  0.0001  ±2.21%  15258853
  · getProvincesByDistrict (th)  14,683,503.71  0.0000  0.0266  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.06%   7341752
  · getProvincesByCity (th)      14,324,427.14  0.0000  0.0505  0.0001  0.0001  0.0001  0.0001  0.0002  ±0.08%   7162214
  · getCities (th)               39,487,357.05  0.0000  0.0286  0.0000  0.0000  0.0000  0.0000  0.0001  ±0.06%  19743679
  · getDistricts (th)            39,152,470.00  0.0000  0.1143  0.0000  0.0000  0.0000  0.0000  0.0001  ±0.09%  19576235
  · getZips                      38,768,475.15  0.0000  0.2333  0.0000  0.0000  0.0000  0.0000  0.0001  ±0.13%  19384238
```

All operations are in-memory and constant-time thanks to precomputed maps; no network calls or iterative scans.

## Data source

The dataset is embedded in the package as precomputed TypeScript maps with Thai and English names. Releases ship with the data already built; no network fetches or post-install steps are required.

## Contributing

Corrections, improvements, and additional test cases are welcome. If you spot any mistakes in the data or behavior, please open a pull request—PRs are encouraged and appreciated.

## License

MIT
