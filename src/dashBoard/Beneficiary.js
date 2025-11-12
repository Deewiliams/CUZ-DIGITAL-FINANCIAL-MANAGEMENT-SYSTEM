import React from "react";
import { Container, Input, TextInput, Textarea, Title, Card, Button, Group } from "@mantine/core";

const Beneficiary = () => {
  return (
    <Container size="sm" py="xl">
      <Card
        shadow="md"
        radius="lg"
        withBorder
        p="lg"
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          borderRadius: "20px",
        }}
      >
        <Title
          order={3}
          align="center"
          style={{
            marginBottom: "20px",
            color: "var(--mantine-color-blue-6)",
            fontWeight: 600,
          }}
        >
          Beneficiary Details
        </Title>

        <Input.Wrapper
          label="Account Number"
          description="STU-77565457"
          withAsterisk
          mb="md"
        >
          <Input
            placeholder="Enter beneficiary account number"
            radius="md"
            size="md"
          />
        </Input.Wrapper>

        <TextInput
          label="Nick Name"
          placeholder="Cavendish FAO"
          radius="md"
          size="md"
          mb="md"
        />

        <Textarea
          label="Description"
          placeholder="He is..."
          radius="md"
          size="md"
          autosize
          minRows={3}
          mb="lg"
        />

        <Group position="center" mt="md">
          <Button
            radius="md"
            size="md"
            color="blue"
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            Save Beneficiary
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default Beneficiary;
