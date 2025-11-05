import { Container, PasswordInput, Stack } from "@mantine/core";
import React from "react";

const CreatePassword = () => {
  return (
    <Container size={600}>
      <Stack gap="sm">
        <PasswordInput label="Password" placeholder="*********" size="md" />
      <PasswordInput
        label="Comfirm Password"
        placeholder="*********"
        size="md"
      />
      </Stack>
    </Container>
  );
};

export default CreatePassword;
