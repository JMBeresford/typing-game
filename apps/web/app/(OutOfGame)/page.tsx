import { Button } from "ui";
import styles from "./page.module.scss";

export default async function Page() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.mainMenu}>
          <Button>
            <Button.Link href="/game">Play Game</Button.Link>
          </Button>
          <Button disabled>
            <Button.Link href="/settings">Settings</Button.Link>
          </Button>
        </main>
      </div>
    </>
  );
}
