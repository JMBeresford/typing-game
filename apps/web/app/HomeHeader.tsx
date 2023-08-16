"use client";

import { useState } from "react";
import { Header, Nav } from "ui";
import { AuthContext, AuthModalContext, AuthModals } from "./AuthModals";

function NavSignedIn() {
  return (
    <Nav>
      <Nav.Item itemType="link" href="/profile">
        My Profile
      </Nav.Item>
      <Nav.Item itemType="button">Sign Out</Nav.Item>
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

export function HomeHeader() {
  const user = false;

  return (
    <Header>
      <Header.Title>Typing Game</Header.Title>

      {user ? <NavSignedIn /> : <NavSignedOut />}
    </Header>
  );
}
