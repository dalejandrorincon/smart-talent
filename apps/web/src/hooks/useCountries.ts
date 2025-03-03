import { Country } from "@types";
import { useState, useCallback, useMemo } from "react";

interface RestCountriesResponse {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  region: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_COUNTRIES_API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data: RestCountriesResponse[] = await response.json();

      const formattedCountries: Country[] = data.map((country) => ({
        name: country.name.common,
        cca2: country.cca2,
        region: country.region,
      }));

      setCountries(formattedCountries);
      return formattedCountries;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching countries:", errorMessage);

      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const isValidCountry = useMemo(
    () => (countryName: string) => {
      return countries.some(
        (country) =>
          country.name.toLowerCase() === countryName.toLowerCase() &&
          country.region === "Americas"
      );
    },
    [countries]
  );

  return {
    countries,
    fetchCountries,
    isValidCountry,
    loading,
    error,
  };
};
