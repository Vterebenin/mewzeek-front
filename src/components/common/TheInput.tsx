import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

interface TheInputProps {
  onChange: ChangeEventHandler;
  value: string | number;
  className?: string;
  type?: string;
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
        <li key={item.message}>{item.message}</li>
      ))}
    </ul>
  ) : (
    errorText
  );
  return (
    <FormControl isInvalid={isInvalid} {...args}>
      <FormLabel>{label}</FormLabel>
      <div>
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
      </div>
    </FormControl>
  );
}

export default TheInput;
