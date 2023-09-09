import { ScenePortal } from "@/components/ScenePortal";
import { SceneRoot } from "@/components/SceneRoot";
import { Suspense } from "react";
import "./SharedRootLayout.scss";
import { Starfield } from "../Renderables/Starfield";
import { ClientUtils } from "./ClientUtils";

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
          <Starfield />
        </ScenePortal>

        <ClientUtils />
      </body>
    </html>
  );
}
