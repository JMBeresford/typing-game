"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { Session } from "@supabase/supabase-js";
import { API_PATH } from "app/api/urls";
import { MouseEvent, useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "ui";

export function FirstLoginModal({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const profile = useUserProfile(session?.user.id);

  const firstLogin = profile?.id != undefined && profile?.username == undefined;
  if (!firstLogin) return null;

  const handleSubmit = async (event: MouseEvent, useEmail: boolean = false) => {
    event.preventDefault();
    if (!session?.user.email) return;

    const formData = new FormData();
    if (useEmail) {
      formData.set("username", session.user.email);
    } else {
      formData.set("username", username);
    }

    const response = await fetch(`${API_PATH}/profile/set-username`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setOpen(false);
      return;
    }

    try {
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Modal open={open}>
      <Modal.Header>Welcome to Typing Game!</Modal.Header>

      <Modal.TextContent>
        <p>Looks like it&apos;s your first time here, what should we call you?</p>

        <Form>
          {error !== null && <Form.Error>{error}</Form.Error>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form>
      </Modal.TextContent>

      <Modal.Footer>
        <ButtonGroup>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
          <Button type="button" priority="secondary" onClick={e => handleSubmit(e, true)}>
            Use My Email
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}
