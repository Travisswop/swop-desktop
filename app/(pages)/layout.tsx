import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "./contexts/sideBarToggleContext";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="">
          <SideBarToggleProvider>
            <LayoutComponent> {children}</LayoutComponent>
          </SideBarToggleProvider>
        </main>
      </body>
    </html>
  );
}
