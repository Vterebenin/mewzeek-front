import { Toster } from "@/vite-env";

export const BUTTON_TYPES = {
  SUBMIT: "submit",
};

export const TOSTER: Toster = {
  CONFLICT_REGISTRATION: {
    title: "Account wasn't created.",
    description: "Email already exists in the system.",
    status: "error",
    duration: 10000,
    isClosable: true,
  },
};

export const MSG_TO_TOSTER_MAPPER: Toster = {
  email_conflict: TOSTER.CONFLICT_REGISTRATION,
};
