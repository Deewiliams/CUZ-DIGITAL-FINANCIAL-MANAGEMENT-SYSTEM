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
} from "@mantine/core";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className={classes.background}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome to Forever Trust Bank
        </Title>
        <p className="Motto-paragraph">Reliable. Always with you</p>

        <Text className={classes.subtitle}>
          Do not have an account yet? <Anchor component={Link} to="/choose-account">
  Create account
</Anchor>

        </Text>

        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Link to="/forgot-password" style={{ fontSize: "0.9rem" }}>
              Forgot password?
            </Link>
          </Group>
          <Button fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
