"use client";

import { useState } from "react";
import { Header, Nav } from "ui";
import { AuthContext, AuthModalContext, AuthModals } from "./_modals/AuthModals";
import { Session } from "@supabase/auth-helpers-nextjs";
import { API_PATH } from "./api/urls";

function NavSignedIn() {
  return (
    <Nav>
      <Nav.Item itemType="link" href="/profile">
        My Profile
      </Nav.Item>
      <form action={`${API_PATH}/auth/signout`} method="post">
        <Nav.Item itemType="button" type="submit">
          Sign Out
        </Nav.Item>
      </form>
    </Nav>
  );
}

function NavSignedOut() {
  const [modalContext, setModalContext] = useState<AuthContext>(null);

  return (
    <AuthModalContext.Provider
      value={{ currentContext: modalContext, setCurrentContext: setModalContext }}
    >
      <AuthModals />
      <Nav>
        <Nav.Item itemType="button" onClick={() => setModalContext("signIn")}>
          Sign In
        </Nav.Item>
        <Nav.Item itemType="button" onClick={() => setModalContext("signUp")}>
          Sign Up
        </Nav.Item>
      </Nav>
    </AuthModalContext.Provider>
  );
}

export function HomeHeader(props: { session: Session | null }) {
  const { session } = props;

  return (
    <Header>
      <Header.Title>Typing Game</Header.Title>

      {session ? <NavSignedIn /> : <NavSignedOut />}
    </Header>
  );
}
