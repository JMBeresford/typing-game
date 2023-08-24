import { SharedRootLayout } from "@/components/SharedRootLayout";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return <SharedRootLayout>{children}</SharedRootLayout>;
}
