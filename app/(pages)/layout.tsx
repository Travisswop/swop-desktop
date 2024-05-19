import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";

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
            <LayoutComponent>
              <TopBar />
              {children}
            </LayoutComponent>
          </SideBarToggleProvider>
        </main>
      </body>
    </html>
  );
}
