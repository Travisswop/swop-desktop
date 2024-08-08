import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
// import { XMTPProvider } from "@/context/xmtpContext";

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
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" className={popins.className}>
      <body>
        <main className="">
          <ToastContainer position="top-center" />
          <Web3ModalProvider initialState={initialState}>
            <SideBarToggleProvider>
              <LayoutComponent>
                <div className="flex flex-col min-h-screen">
                  <TopBar />
                  {children}
                </div>
              </LayoutComponent>
            </SideBarToggleProvider>
          </Web3ModalProvider>
        </main>
      </body>
    </html>
  );
}
