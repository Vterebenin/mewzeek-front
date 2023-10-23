import { Button, Input } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const http = axios.create({
  baseURL: "http://localhost:8000/api/",
});

function Registration() {
  const [errors, setErrors] = useState<ValidationErrorObject>({});
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({});
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      name: { value: string };
      passwordConfirmation: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    const name = target.name.value; // typechecks!
    const passwordConfirmation = target.passwordConfirmation.value; // typechecks!
    try {
      await http.post("auth/register", {
        email,
        password,
        passwordConfirmation,
        name,
      });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const data: ErrorData = e?.response?.data;
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center h-[100vh]">
      <form
        onSubmit={(e: React.SyntheticEvent) => onSubmit(e)}
        className="flex gap-4 flex-col"
      >
        <div className="flex gap-1 flex-col">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            isInvalid={!!errors.email}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            isInvalid={!!errors.name}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            isInvalid={!!errors.password}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <label htmlFor="passwordConfirmation">Password</label>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            type="password"
            isInvalid={!!errors.password}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Registration;
