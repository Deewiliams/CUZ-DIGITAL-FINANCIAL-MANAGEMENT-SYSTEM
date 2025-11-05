import { useState } from "react";
import { Stepper, Button, Group, Container } from "@mantine/core";
import PersonInfo from "./PersonInfo";
import AccountType from "./AccountType";
import CreatePassword from "./CreatePassword";
import Preview from "./Preview";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function AuthStepper() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      // Personal Information
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      address: "",
      gender: "",
      nationalId: "",
      tpinNumber: "",

      // Account Type
      accountType: "",

      // Student Account Fields
      schoolName: "",
      // schoolBankAccount: "",
      studentNumber: "",
      courseOfStudy: "",
      yearOfStudy: "",
      expectedCompletion: "",

      // Personal Account Fields
      personalFullName: "",
      // nationalId: "",

      // Business Account Fields
      businessName: "",
      registrationNumber: "",

      // Savings Account Fields
      accountHolderName: "",
      initialDeposit: "",

      // Password
      password: "",
      confirmPassword: "",

      // Terms
      termsOfService: false,
    },

    validate: {
      // Personal Information Validation
      fullName: (value) => {
        if (!value || value.trim() === "") return "Full name is required";
        if (value.length < 2) return "Full name must be at least 2 characters";
        return null;
      },

      email: (value) => {
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        return null;
      },

      phone: (value) => {
        if (!value) return "Phone number is required";
        if (!/^\+?[\d\s\-()]+$/.test(value))
          return "Please enter a valid phone number";
        return null;
      },

      dateOfBirth: (value) => {
        if (!value) return "Date of birth is required";
        return null;
      },
      nationalId: (value) => {
        if (!value) return "NRC Number is required";
        return null;
      },
      tpinNumber: (value) => {
        if (!value) return "TPIN Number is required";
        return null;
      },

      address: (value) => {
        if (!value || value.trim() === "") return "Address is required";
        return null;
      },

      gender: (value) => {
        if (!value) return "Please select your gender";
        return null;
      },

      // Account Type Validation
      accountType: (value) => {
        if (!value) return "Please select an account type";
        return null;
      },

      // Student Account Validation
      schoolName: (value, values) => {
        if (
          values.accountType === "student" &&
          (!value || value.trim() === "")
        ) {
          return "School name is required";
        }
        return null;
      },
      studentNumber: (value, values) => {
        if (
          values.accountType === "student" &&
          (!value || value.trim() === "")
        ) {
          return "Student number is required";
        }
        return null;
      },
      courseOfStudy: (value, values) => {
        if (
          values.accountType === "student" &&
          (!value || value.trim() === "")
        ) {
          return "Course of study is required";
        }
        return null;
      },
      yearOfStudy: (value, values) => {
        if (values.accountType === "student" && !value) {
          return "Year of study is required";
        }
        return null;
      },
      expectedCompletion: (value, values) => {
        if (values.accountType === "student" && !value) {
          return "Expected completion year is required";
        }
        return null;
      },

      // Personal Account Validation
      personalFullName: (value, values) => {
        if (
          values.accountType === "personal" &&
          (!value || value.trim() === "")
        ) {
          return "Full name is required";
        }
        return null;
      },
      // nationalId: (value, values) => {
      //   if (
      //     values.accountType === "personal" &&
      //     (!value || value.trim() === "")
      //   ) {
      //     return "National ID is required";
      //   }
      //   return null;
      // },

      // Business Account Validation
      businessName: (value, values) => {
        if (
          values.accountType === "business" &&
          (!value || value.trim() === "")
        ) {
          return "Business name is required";
        }
        return null;
      },
      registrationNumber: (value, values) => {
        if (
          values.accountType === "business" &&
          (!value || value.trim() === "")
        ) {
          return "Registration number is required";
        }
        return null;
      },

      // Savings Account Validation
      accountHolderName: (value, values) => {
        if (
          values.accountType === "savings" &&
          (!value || value.trim() === "")
        ) {
          return "Account holder name is required";
        }
        return null;
      },
      initialDeposit: (value, values) => {
        if (
          values.accountType === "savings" &&
          (!value || value.trim() === "")
        ) {
          return "Initial deposit is required";
        }
        return null;
      },

      // Password Validation
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8)
          return "Password must be at least 8 characters long";
        return null;
      },

      confirmPassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },

      // Terms Validation
      termsOfService: (value) => {
        if (!value) return "You must accept the terms of service";
        return null;
      },
    },
  });

  // Validation function for each step
  const validateCurrentStep = () => {
    const values = form.getValues();

    switch (active) {
      case 0: // Personal Information step
        const personalFields = [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
          "nationalId",
          "tpinNumber",
        ];
        return personalFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return value && !error;
        });

      case 1: // Account Type step
        if (!values.accountType || form.validateField("accountType").error) {
          return false;
        }

        // Check conditional fields based on account type
        let accountTypeFields = [];
        switch (values.accountType) {
          case "student":
            accountTypeFields = [
              "schoolName",
              "studentNumber",
              "courseOfStudy",
              "yearOfStudy",
              "expectedCompletion",
            ];
            break;
          case "personal":
            accountTypeFields = ["personalFullName"];
            break;
          case "business":
            accountTypeFields = ["businessName", "registrationNumber"];
            break;
          case "savings":
            accountTypeFields = ["accountHolderName", "initialDeposit"];
            break;
        }

        return accountTypeFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return value && !error;
        });

      case 2: // Password step
        const passwordFields = [
          "password",
          "confirmPassword",
          "termsOfService",
        ];
        return passwordFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return field === "termsOfService" ? value === true : value && !error;
        });

      default:
        return true;
    }
  };

  const nextStep = () => {
    // Always trigger validation to show errors for current step
    const stepValid = validateCurrentStep();

    if (stepValid) {
      // If validation passes, proceed to next step
      setActive((current) => (current < 3 ? current + 1 : current));
    } else {
      // Show validation errors for the current step fields
      const currentStepFields = getCurrentStepFields();
      currentStepFields.forEach((field) => {
        form.validateField(field);
      });
    }
  };

  // Helper function to get current step fields
  const getCurrentStepFields = () => {
    const values = form.getValues();

    switch (active) {
      case 0:
        return [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
          "nationalId",
          "tpinNumber",
        ];
      case 1:
        let accountFields = ["accountType"];

        // Add conditional fields based on selected account type
        switch (values.accountType) {
          case "student":
            accountFields.push(
              "schoolName",
              "studentNumber",
              "courseOfStudy",
              "yearOfStudy",
              "expectedCompletion"
            );
            break;
          case "personal":
            accountFields.push("personalFullName", "nationalId");
            break;
          case "business":
            accountFields.push("businessName", "registrationNumber");
            break;
          case "savings":
            accountFields.push("accountHolderName", "initialDeposit");
            break;
        }

        return accountFields;
      case 2:
        return ["password", "confirmPassword", "termsOfService"];
      default:
        return [];
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleRegistration = async () => {
    const values = form.getValues();

    // Validate that required fields are present
    if (!values.fullName || values.fullName.trim() === "") {
      toast.error("Please fill in your full name before submitting");
      return;
    }

    // Prepare the payload
    const payload = {
      type: values.accountType,
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      dob: values.dateOfBirth,
      address: values.address,
      gender: values.gender,
      password: values.password,
      confirmPassword: values.confirmPassword,
      termsOfService: Boolean(values.termsOfService), // Ensure boolean
      tpinNumber: values.tpinNumber,
      nationalId: values.nationalId,

      // Student Account Fields
      schoolName: values.schoolName,
      studentId: values.studentNumber,
      course: values.courseOfStudy,
      yearOfStudy: parseInt(values.yearOfStudy) || null, // Ensure number
      expectedCompletion: parseInt(values.expectedCompletion) || null, // Ensure number

      // Personal Account Fields
      personalFullName: values.personalFullName,

      // Business Account Fields
      businessName: values.businessName,
      registrationNumber: values.registrationNumber,

      // Savings Account Fields
      accountHolderName: values.accountHolderName,
      initialDeposit: values.initialDeposit,
    };

    // Submit registration using auth service
    const result = await registerUser(payload);

    if (result.success) {
      navigate("/login");
      // Clear form values
      form.reset();
      // Registration successful - you can redirect or perform additional actions here
      console.log("Registration successful:", result.data);
    } else {
      // Error handling is already done in the service with toasts
      console.error("Registration failed:", result.error);
    }
  };

  return (
    <Container style={{ marginTop: "-70px" }}>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Personal Info"
          description="Fill in your personal details"
        >
          <PersonInfo form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Account Type"
          description="Choose your account type"
        >
          <AccountType form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Create Password"
          description="Set up your password"
        >
          <CreatePassword form={form} />
        </Stepper.Step>

        <Stepper.Completed>
          <Preview form={form} />
        </Stepper.Completed>
      </Stepper>

      <br />

      <Group justify="space-between">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>

        {active < 3 ? (
          <Button onClick={nextStep}>
            {active === 2 ? "Complete Registration" : "Next Step"}
          </Button>
        ) : (
          <Button onClick={handleRegistration}>Submit Registration</Button>
        )}
      </Group>
    </Container>
  );
}

export default AuthStepper;
