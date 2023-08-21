import { AuthResponse } from "@supabase/supabase-js";
import { API_PATH } from "app/api/urls";

export enum SignUpInput {
  email = "email",
  password = "password",
  confirmPassword = "confirmPassword",
}

export enum SignInInput {
  email = "email",
  password = "password",
}

export type Input = SignUpInput | SignInInput;
export type ValidationErrors = Record<Input, string | null>;

type SignUpStatus = {
  validationErrors: ValidationErrors | null;
  error: Partial<AuthResponse["error"]>;
  data: AuthResponse["data"] | null;
};

type SignInStatus = {
  error: Partial<AuthResponse["error"]>;
};

export async function handleSignUp(formData: FormData): Promise<SignUpStatus> {
  const res: SignUpStatus = { validationErrors: null, error: null, data: null };
  const authResponse = await fetch(`${API_PATH}/auth/signup`, {
    method: "POST",
    body: formData,
  });

  try {
    const data = await authResponse.json();
    res.data = data.data ?? null;
    res.error = data.error ?? null;
    res.validationErrors = data.validationErrors ?? null;
  } catch (error) {
    res.error = { message: `${error}`, status: 500 };
  }

  return res;
}

export async function handleSignIn(formData: FormData): Promise<SignInStatus> {
  const authResponse = await fetch(`${API_PATH}/auth/signin`, {
    method: "POST",
    body: formData,
  });

  try {
    const data = await authResponse.json();
    return { error: data.error ?? null };
  } catch (error) {
    return { error: { message: `${error}`, status: 500 } };
  }
}
