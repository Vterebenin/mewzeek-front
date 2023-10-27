import { Toster } from "@/vite-env";

export const BUTTON_TYPES = {
  SUBMIT: "submit",
};

export const PATHS = {
  BASE: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  HOME: "/home",
  LAB: "/app/lab",
};

// todo make default props like duration and is closable?
export const TOSTER: Toster = {
  CONFLICT_REGISTRATION: {
    title: "Can't Sign Up!",
    description: "Email already exists in the system",
    status: "error",
    duration: 10000,
    isClosable: true,
  },
  INVALID_EMAIL_OR_PSWD: {
    title: "Cant Sign In!",
    description: "Invalid email or password",
    status: "error",
    duration: 10000,
    isClosable: true,
  },
};

export const MSG_TO_TOSTER_MAPPER: Toster = {
  email_conflict: TOSTER.CONFLICT_REGISTRATION,
  incorrect_email_or_password: TOSTER.INVALID_EMAIL_OR_PSWD,
};
