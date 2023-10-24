import http from "@/api/http";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import TheInput from "@/components/common/TheInput";
import TheButton from "@/components/common/TheButton";
import { Form } from "react-router-dom";
import { TOSTER } from "@/const/general";

interface RegistrationForm {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
}
const DEFAULT_FORM = {
  email: "",
  password: "",
  name: "",
  passwordConfirmation: "",
};
function Registration() {
  const [errors, setErrors] = useState<ValidationErrorObject>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegistrationForm>({ ...DEFAULT_FORM });
  const toast = useToast();
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    const newErrors = { ...errors };
    delete newErrors[name];
    setErrors(newErrors);
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({});
    const { email, password, passwordConfirmation, name } = form;
    try {
      setLoading(true);
      await http.post("auth/register", {
        email,
        password,
        passwordConfirmation,
        name,
      });
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof AxiosError) {
        const data: ErrorData = e?.response?.data;
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          toast(TOSTER.CONFLICT_REGISTRATION);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center">
      <Form
        onSubmit={(e: React.SyntheticEvent) => onSubmit(e)}
        className="flex gap-4 flex-col max-w-[500px] w-full"
      >
        <TheInput
          className="flex gap-1 flex-col"
          name="email"
          value={form.email}
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          label="Email"
          isInvalid={!!errors.email}
          errorText={errors.email}
        />
        <TheInput
          className="flex gap-1 flex-col"
          name="name"
          placeholder="Name"
          label="Name"
          value={form.name}
          onChange={(e) => handleChange(e)}
          isInvalid={!!errors.name}
          errorText={errors.name}
        />
        <TheInput
          className="flex gap-1 flex-col"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange(e)}
          isInvalid={!!errors.password}
          errorText={errors.password}
        />
        <TheInput
          className="flex gap-1 flex-col"
          name="passwordConfirmation"
          label="Password confirmation"
          placeholder="Password confirmation"
          type="password"
          value={form.passwordConfirmation}
          onChange={(e) => handleChange(e)}
          isInvalid={!!errors.password}
          errorText={errors.password}
        />
        <TheButton isLoading={loading} loadingText="Submitting" type="submit">
          Submit
        </TheButton>
      </Form>
    </div>
  );
}

export default Registration;
