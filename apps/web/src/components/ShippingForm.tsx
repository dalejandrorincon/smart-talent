import React, { useEffect } from "react";
import { ShippingFormData, ShippingFormProps } from "@types";
import { Controller, useForm } from "react-hook-form";
import { useCountries } from "@hooks";
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "ui-library";

export const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShippingFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      country: "",
      phone: "",
    },
  });

  const { countries, fetchCountries, isValidCountry } = useCountries();

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          rules={{ required: "Nombre es requerido" }}
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
          rules={{
            required: "Email es requerido",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email inválido",
            },
          }}
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
          rules={{
            required: "Teléfono es requerido",
            pattern: {
              value: /^\d{7,15}$/,
              message: "Teléfono inválido",
            },
          }}
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
          rules={{
            required: "Debe seleccionar un país",
            validate: (value) =>
              isValidCountry(value) ||
              "El país seleccionado no está en América",
          }}
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
              {errors.country && (
                <FormHelperText>{errors.country.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Button type="submit" size="large" disabled={!isValid}>
          Confirmar Envío
        </Button>
      </Box>
    </Container>
  );
};
