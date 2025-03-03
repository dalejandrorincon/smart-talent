export interface Country {
  name: string;
  cca2: string;
  region: string;
}

export interface CountryOperations {
  fetchCountries: () => Promise<Country[]>;
  isValidCountry: (countryName: string) => boolean;
}
