// Registration form initial values
export const registrationInitialValues = {
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
};

// Registration form validation schema
export const registrationValidationSchema = {
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
    if (values.accountType === "student" && (!value || value.trim() === "")) {
      return "School name is required";
    }
    return null;
  },

  studentNumber: (value, values) => {
    if (values.accountType === "student" && (!value || value.trim() === "")) {
      return "Student number is required";
    }
    return null;
  },

  courseOfStudy: (value, values) => {
    if (values.accountType === "student" && (!value || value.trim() === "")) {
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
    if (values.accountType === "personal" && (!value || value.trim() === "")) {
      return "Full name is required";
    }
    return null;
  },

  // Business Account Validation
  businessName: (value, values) => {
    if (values.accountType === "business" && (!value || value.trim() === "")) {
      return "Business name is required";
    }
    return null;
  },

  registrationNumber: (value, values) => {
    if (values.accountType === "business" && (!value || value.trim() === "")) {
      return "Registration number is required";
    }
    return null;
  },

  // Savings Account Validation
  accountHolderName: (value, values) => {
    if (values.accountType === "savings" && (!value || value.trim() === "")) {
      return "Account holder name is required";
    }
    return null;
  },

  initialDeposit: (value, values) => {
    if (values.accountType === "savings" && (!value || value.trim() === "")) {
      return "Initial deposit is required";
    }
    return null;
  },

  // Password Validation
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
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
};
