import { Container, PasswordInput, Stack, Checkbox, Text } from "@mantine/core";
import React from "react";

const CreatePassword = ({ form }) => {
  return (
    <Container size={600}>
      <Stack gap="sm">
        <PasswordInput
          label="Password"
          placeholder="*********"
          size="md"
          required
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="*********"
          size="md"
          required
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          mt="md"
          label={
            <Text size="sm">
              I accept the{" "}
              <Text
                component="span"
                c="blue"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                component="span"
                c="blue"
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Privacy Policy
              </Text>
            </Text>
          }
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
      </Stack>
    </Container>
  );
};

export default CreatePassword;
