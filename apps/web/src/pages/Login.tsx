import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "@store/authStore";
import { Controller, useForm } from "react-hook-form";
import { Button } from "ui-library";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate("/admin");
      } else {
        setError("password", {
          type: "manual",
          message: "La contraseña debe tener al menos 6 caracteres",
        });
      }
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "manual",
        message: "Error en la autenticación",
      });
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 10,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            mb: 3,
          }}
        >
          Iniciar Sesión
        </Typography>
        {errors.root && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.root.message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "El email es requerido",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message ||
                  "Usa un correo con 'admin' para acceder al panel de administración"
                }
                disabled={isSubmitting}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message || "Mínimo 6 caracteres"}
                disabled={isSubmitting}
                sx={{ mb: 3 }}
              />
            )}
          />

          <Button type="submit" fullWidth size="large" disabled={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Ingresar"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
