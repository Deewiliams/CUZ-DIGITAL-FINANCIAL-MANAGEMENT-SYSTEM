import React, { useState, useEffect } from "react";
import {
  Container,
  Input,
  TextInput,
  Textarea,
  Title,
  Card,
  Button,
  Group,
} from "@mantine/core";

const Beneficiary = () => {
  const token = localStorage.getItem("authToken");
  const [accountNumber, setAccountNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);

  // For loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Handle saving a new beneficiary
 const handleSave = async () => {
  if (!accountNumber || !nickname) {
    alert("Please fill in all required fields.");
    return;
  }

  const newBeneficiary = {
    accountNumber,
    nickname,
    description,
  };

  try {
    setLoading(true);
    setError(null);

    const res = await fetch("http://localhost:8000/cuz/bank/beneficiaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBeneficiary),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server responded with ${res.status}: ${text}`);
    }

    const saved = await res.json();
    console.log("✅ Saved beneficiary:", saved);

    setBeneficiaries((prev) => [...prev, saved]);
    setAccountNumber("");
    setNickname("");
    setDescription("");

    alert("Beneficiary saved successfully!");
  } catch (err) {
    console.error("❌ Error saving beneficiary:", err);
    setError(`Failed to save beneficiary. ${err.message}`);
  } finally {
    setLoading(false);
  }
};

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
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Input.Wrapper>

        <TextInput
          label="Nick Name"
          placeholder="Cavendish FAO"
          radius="md"
          size="md"
          mb="md"
          withAsterisk
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <Textarea
          label="Description"
          placeholder="He is..."
          radius="md"
          size="md"
          autosize
          minRows={3}
          mb="lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <Group position="center" mt="md">
          <Button
            radius="md"
            size="md"
            color="blue"
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
            onClick={handleSave}
            loading={loading}
          >
            Save Beneficiary
          </Button>
        </Group>
      </Card>

     
    </Container>
  );
};

export default Beneficiary;



//  {/* Optional: Display saved beneficiaries */}
//       {beneficiaries.length > 0 && (
//         <Card
//           mt="xl"
//           shadow="sm"
//           radius="md"
//           withBorder
//           p="md"
//           style={{ backgroundColor: "var(--mantine-color-gray-1)" }}
//         >
//           <Title order={5} mb="sm">
//             Saved Beneficiaries
//           </Title>
//           {beneficiaries.map((b, i) => (
//             <div key={i} style={{ marginBottom: "8px" }}>
//               <strong>{b.nickname}</strong> — {b.account_number}
//               <br />
//               <em>{b.description}</em>
//             </div>
//           ))}
//         </Card>
//       )}


  // // Fetch all existing beneficiaries on load (optional)
  // useEffect(() => {
  //   const fetchBeneficiaries = async () => {
  //     try {
  //       const res = await fetch("http://localhost:8000/cuz/bank/beneficiaries");
  //       if (!res.ok) throw new Error("Failed to fetch beneficiaries");
  //       const data = await res.json();
  //       setBeneficiaries(data);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Could not load beneficiaries.");
  //     }
  //   };
  //   fetchBeneficiaries();
  // }, []);