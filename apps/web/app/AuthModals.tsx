import {
  FormEvent,
  Fragment,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Button, ButtonGroup, Modal } from "ui";
import styles from "./AuthModals.module.scss";
import { useMemoComparison } from "@/hooks/useMemoComparison";
import { useRouter } from "next/navigation";

export type AuthContext = "signUp" | "signIn" | null;
export type AuthModalContext = {
  currentContext: AuthContext;
  setCurrentContext: (context: AuthContext) => void;
};

export const AuthModalContext = createContext<AuthModalContext>({
  currentContext: null,
  setCurrentContext: () => {},
});
export const useAuthModalContext = () => useContext(AuthModalContext);

export const Input = ["email", "password", "confirmPassword"] as const;
export type Input = typeof Input[number];
const InputDisplayNames: Record<Input, string> = {
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
};
const InputHtmlTypes: Record<Input, HTMLInputElement["type"]> = {
  email: "email",
  password: "password",
  confirmPassword: "password",
};

function SignUpModalContent() {
  const { setCurrentContext } = useAuthModalContext();
  const [errors, setErrors] = useState<Record<Input, string | null>>({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      try {
        const response = await fetch(event.currentTarget.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          window.alert("Account created successfully! Check your email for verification.");
          router.refresh();
        } else {
          try {
            const data = await response.json();
            if (data.errors) {
              setErrors(data.errors);
            }
          } catch (error) {
            throw error;
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [router],
  );

  return (
    <>
      <Modal.Header>Sign Up</Modal.Header>

      <Modal.TextContent>
        <p>Sign up for an account to continue</p>

        <form action="api/auth/signup" onSubmit={handleSubmit} className={styles.form}>
          {Input.map(input => (
            <Fragment key={input}>
              <label htmlFor={input}>{InputDisplayNames[input]}</label>
              {errors[input] !== null && <p className={styles.error}>{errors[input]}</p>}
              <input
                type={InputHtmlTypes[input]}
                id={input}
                name={input}
                onChange={() => setErrors(prev => ({ ...prev, [input]: null }))}
              />
            </Fragment>
          ))}

          <ButtonGroup>
            <Button type="submit">Sign Up</Button>
            <Button type="button" disabled>
              Forgot Password
            </Button>
          </ButtonGroup>
        </form>
      </Modal.TextContent>

      <Modal.Footer>
        <Button size="small" onClick={() => setCurrentContext("signIn")}>
          Already have an account?
        </Button>
      </Modal.Footer>
    </>
  );
}

function SignInModalContent() {
  const { setCurrentContext } = useAuthModalContext();
  const inputs = ["email", "password"] as const;
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      try {
        const response = await fetch(event.currentTarget.action, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          router.refresh();
        }

        if (response.status === 400) {
          try {
            const data = await response.json();
            if (data.error) {
              setError(data.error);
            }
          } catch (error) {
            throw error;
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [router],
  );

  return (
    <>
      <Modal.Header>Sign In</Modal.Header>

      <Modal.TextContent>
        <p>Sign in to your account to continue</p>
        {error !== null && <p className={styles.error}>{error}</p>}
        <form action="/api/auth/signin" onSubmit={handleSubmit} className={styles.form}>
          {inputs.map(input => (
            <Fragment key={input}>
              <label htmlFor={input}>{InputDisplayNames[input]}</label>
              <input
                type={InputHtmlTypes[input]}
                id={input}
                name={input}
                onChange={() => setError(null)}
              />
            </Fragment>
          ))}

          <ButtonGroup>
            <Button type="submit">Sign In</Button>
            <Button type="button" disabled>
              Forgot Password
            </Button>
          </ButtonGroup>
        </form>
      </Modal.TextContent>

      <Modal.Footer>
        <Button size="small" onClick={() => setCurrentContext("signUp")}>
          Don&apos;t have an account?
        </Button>
      </Modal.Footer>
    </>
  );
}

const ModalContent: Record<NonNullable<AuthContext>, ReactNode> = {
  signIn: <SignInModalContent />,
  signUp: <SignUpModalContent />,
};

export function AuthModals() {
  const { currentContext, setCurrentContext } = useAuthModalContext();

  // keep track of previous non-null context so that we can render the previous modal while
  // fading out the modal
  const prevContext: NonNullable<AuthContext> = useMemoComparison(
    () => currentContext!,
    [currentContext],
    (a, b) => b != null && a !== b,
  );

  return (
    <Modal
      open={currentContext !== null}
      onClose={() => setCurrentContext(null)}
      backdropClickCloses
    >
      {currentContext ? ModalContent[currentContext] : ModalContent[prevContext]}
    </Modal>
  );
}
