import { ScenePortal } from "@/components/ScenePortal";
import { SceneRoot } from "@/components/SceneRoot";
import { Suspense } from "react";
import "./layout.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SceneRoot>
          <Suspense fallback={null}>{children}</Suspense>
        </SceneRoot>

        <ScenePortal>
          <color attach="background" args={[0.05, 0.05, 0.08]} />
        </ScenePortal>
      </body>
    </html>
  );
}
