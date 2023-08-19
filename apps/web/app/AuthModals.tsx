import { ReactNode, createContext, useContext } from "react";
import { Button, Modal } from "ui";
import styles from "./AuthModals.module.scss";
import { useMemoComparison } from "@/hooks/useMemoComparison";

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

function SignUpModalContent() {
  const { setCurrentContext } = useAuthModalContext();

  return (
    <>
      <Modal.Header>Sign Up</Modal.Header>

      <Modal.TextContent>
        <p>Sign up for an account to continue</p>

        <form action="/api/auth/signup" method="post" className={styles.form}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />

          <div className={styles.buttonGroup}>
            <Button type="submit">Sign Up</Button>
            <Button type="button" disabled>
              Forgot Password
            </Button>
          </div>
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

  return (
    <>
      <Modal.Header>Sign In</Modal.Header>

      <Modal.TextContent>
        <p>Sign in to your account to continue</p>

        <form action="/api/auth/signin" method="post" className={styles.form}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />

          <div className={styles.buttonGroup}>
            <Button type="submit">Sign In</Button>
            <Button type="button" disabled>
              Forgot Password
            </Button>
          </div>
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
