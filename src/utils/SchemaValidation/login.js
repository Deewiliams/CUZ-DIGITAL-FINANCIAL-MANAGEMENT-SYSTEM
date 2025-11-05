export const initialLoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const reactHookFormValidationSchema = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
};

export const loginValidationSchema = {
  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Invalid email address";
    return null;
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters long";
    return null;
  },
};
