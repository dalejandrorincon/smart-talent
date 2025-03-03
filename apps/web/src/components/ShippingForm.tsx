import React, { useEffect } from "react";
import { ShippingFormData, ShippingFormProps } from "@types";
import { Controller, useForm } from "react-hook-form";
import { useCountries } from "@hooks";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ShippingFormData>();

  const { countries, fetchCountries, isValidCountry } = useCountries();

  const handleFormSubmit = (data: ShippingFormData) => {
    if (!data.name) {
      setError("name", {
        type: "manual",
        message: "Nombre es requerido",
      });
      return;
    }

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      setError("email", {
        type: "manual",
        message: "Email inválido",
      });
      return;
    }

    if (!data.phone || !/^\d{7,15}$/.test(data.phone)) {
      setError("phone", {
        type: "manual",
        message: "Teléfono inválido",
      });
      return;
    }

    if (!isValidCountry(data.country)) {
      setError("country", {
        type: "manual",
        message: "El país seleccionado no está en América",
      });
      return;
    }

    onSubmit(data);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
        }}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono"
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl variant="outlined" error={!!errors.country}>
              <InputLabel>País</InputLabel>
              <Select {...field} label="País">
                <MenuItem value="">
                  <em>Selecciona un país</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.cca2} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Confirmar Envío
        </Button>
      </Box>
    </Container>
  );
};
