import { ScenePortal } from "@/components/ScenePortal";
import { SceneRoot } from "@/components/SceneRoot";
import { Suspense } from "react";
import "./SharedRootLayout.scss";

export function SharedRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SceneRoot>
          <Suspense fallback={null}>
            <div id="sharedRootLayout">{children}</div>
          </Suspense>
        </SceneRoot>

        <ScenePortal>
          <color attach="background" args={[0.05, 0.05, 0.08]} />
        </ScenePortal>
      </body>
    </html>
  );
}
