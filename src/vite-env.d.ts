/// <reference types="vite/client" />

interface ValidationErrorItem {
  code: string;
  message: string;
  params: {
    value: string;
  };
}
interface ValidationErrorObject {
  [key: string]: Array<ValidationErrorItem>;
}
interface ErrorData {
  message?: string;
  status: string;
  errors?: ValidationErrorObject;
}
