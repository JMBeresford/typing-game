"use client";

import { useState } from "react";
import { Header, Nav } from "ui";
import { AuthContext, AuthModalContext, AuthModals } from "./_modals/AuthModals";
import { API_PATH } from "../api/urls";
import styles from "./HomeHeader.module.scss";
import Link from "next/link";
import { Tables } from "@/lib/tables.types";

function NavSignedIn({ profile }: { profile: Tables<"profiles"> }) {
  return (
    <Nav>
      <Nav.Item itemType="link" href={`/profile/${profile.username ?? profile.id}`}>
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
      <Nav>
        <Nav.Item itemType="button" onClick={() => setModalContext("signIn")}>
          Sign In
        </Nav.Item>
        <Nav.Item itemType="button" onClick={() => setModalContext("signUp")}>
          Sign Up
        </Nav.Item>
      </Nav>

      <AuthModals />
    </AuthModalContext.Provider>
  );
}

export function HomeHeader(props: { profile: Tables<"profiles"> | null }) {
  const { profile } = props;

  return (
    <Header className={styles.header}>
      <Header.Title>
        <Link href="/">Typing Game</Link>
      </Header.Title>

      {profile ? <NavSignedIn profile={profile} /> : <NavSignedOut />}
    </Header>
  );
}
