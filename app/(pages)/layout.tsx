import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// export const maxDuration = 60;

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={popins.className}>
      <body>
        <main className="">
          <ToastContainer position="top-center" />
          <SideBarToggleProvider>
            <LayoutComponent>
              <div className="flex flex-col min-h-screen">
                <TopBar />
                {children}
              </div>
            </LayoutComponent>
          </SideBarToggleProvider>
        </main>
      </body>
    </html>
  );
}
