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
import { Input, SignInInput, SignUpInput, handleSignIn, handleSignUp } from "./utils/auth";

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
  const router = useRouter();
  const [errors, setErrors] = useState<Record<Input, string | null>>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const status = await handleSignUp(formData);

      if (status.validationErrors) {
        setErrors(status.validationErrors);
        return;
      }

      if (status.error) {
        window.alert(`Something went wrong during sign-up: ${status.error}`);
        return;
      }

      router.push("/?auth=confirmEmail");
      setCurrentContext(null);
      router.refresh();
    },
    [router, setCurrentContext],
  );

  return (
    <>
      <Modal.Header>Sign Up</Modal.Header>

      <Modal.TextContent>
        <p>Sign up for an account to continue</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.values(SignUpInput).map(input => (
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const authStatus = await handleSignIn(formData);

      if (authStatus.error) {
        setError(authStatus.error.message ?? "Something went wrong, please try again later.");
        return;
      }

      router.push("/");
      router.refresh();
    },
    [router],
  );

  return (
    <>
      <Modal.Header>Sign In</Modal.Header>

      <Modal.TextContent>
        <p>Sign in to your account to continue</p>
        {error !== null && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.values(SignInInput).map(input => (
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
