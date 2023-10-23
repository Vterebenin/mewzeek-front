import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface TheInputProps {
  className?: string;
  type?: string;
  onChange: ChangeEventHandler;
  value: string | number;
  isInvalid?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string | ValidationErrorItem[];
  name?: string;
}

function TheInput({
  type,
  onChange,
  value,
  isInvalid,
  label,
  placeholder,
  helperText,
  errorText,
  name,
  ...args
}: TheInputProps) {
  const errors = Array.isArray(errorText) ? (
    <ul>
      {errorText.map((item) => (
        <li>{item.message}</li>
      ))}
    </ul>
  ) : (
    errorText
  );
  return (
    <FormControl isInvalid={isInvalid} {...args}>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {!isInvalid ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{errors}</FormErrorMessage>
      )}
    </FormControl>
  );
}

export default TheInput;
