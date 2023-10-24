/// <reference types="vite/client" />

import { CreateStandAloneToastParam, UseToastOptions } from "@chakra-ui/react";

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
interface RouteError {
  message?: string;
  statusText?: string;
}

interface RouteIdToPathMapper {
  [key: string]: string | undefined;
}

interface Toster {
  [key: string]:
    | UseToastOptions
    | ((...args: string[]) => UseToastOptions)
}
