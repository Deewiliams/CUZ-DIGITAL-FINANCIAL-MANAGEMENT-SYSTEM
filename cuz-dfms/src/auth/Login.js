import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Box,
  Stack,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  initialLoginValues,
  loginValidationSchema,
} from "../utils/SchemaValidation/login";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: initialLoginValues,
    validate: loginValidationSchema,
    validateInputOnBlur: true,
  });

  const handleSubmit = (values) => {
    setLoading(true);
    setError("");
    fetch("http://localhost:8000/cuz/bank/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          // Success response (status 200-299)
          console.log("Login successful:", data);

          // Store user data and token using context
          if (data && data.token) {
            login(data.token, data.user); // Pass token and user data separately
          }

          // Navigate to overview (this will happen automatically due to PublicRoute redirect)
          navigate("/overview");
        } else {
          // Error response (status 400-599)
          console.error("Login failed:", data.error || data.message);
          setError(data.error || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error.message);
        if (error.message === "Failed to fetch") {
          setError(
            "Unable to connect to server. Please ensure the backend server is running on http://localhost:8000"
          );
        } else {
          setError(
            "Network error. Please check your connection and try again."
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.background}>
      <Container size="xs" className={classes.container}>
        <Box className={classes.loginWrapper}>
          {/* Bank Logo/Icon Section */}
          <Box className={classes.logoSection}>
            <Title className={classes.title}>Forever Trust Bank</Title>
            <Text className={classes.motto}>Reliable. Always with you</Text>
          </Box>

          {/* Login Form */}
          <Paper className={classes.loginForm} shadow="xl" radius="lg" p={32}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <div className={classes.formHeader}>
                  <Title order={2} className={classes.formTitle}>
                    Welcome Back
                  </Title>
                  <Text className={classes.formSubtitle}>
                    Sign in to access your account
                  </Text>
                </div>

                {error && (
                  <Alert
                    color="red"
                    variant="light"
                    className={classes.errorAlert}
                  >
                    {error}
                  </Alert>
                )}

                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  size="md"
                  radius="md"
                  className={classes.input}
                  leftSection="📧"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  size="md"
                  radius="md"
                  className={classes.input}
                  leftSection="🔒"
                  {...form.getInputProps("password")}
                />

                <Group justify="space-between" mt="md">
                  <Checkbox
                    label="Remember me"
                    size="sm"
                    className={classes.checkbox}
                    {...form.getInputProps("rememberMe", { type: "checkbox" })}
                  />
                  <Anchor
                    component={Link}
                    to="/forgot-password"
                    className={classes.forgotLink}
                    size="sm"
                  >
                    Forgot password?
                  </Anchor>
                </Group>

                <Button
                  fullWidth
                  size="md"
                  radius="md"
                  type="submit"
                  loading={loading}
                  className={classes.loginButton}
                  mt="lg"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Box className={classes.signupSection}>
                  <Text size="sm" className={classes.signupText}>
                    Don't have an account?{" "}
                    <Anchor
                      component={Link}
                      to="/choose-account"
                      className={classes.signupLink}
                    >
                      Create Account
                    </Anchor>
                  </Text>
                </Box>
              </Stack>
            </form>
          </Paper>

          {/* Security Notice */}
          <Box className={classes.securityNotice}>
            <Text size="xs" className={classes.securityText}>
              🔒 Your information is protected with bank-level security
            </Text>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
