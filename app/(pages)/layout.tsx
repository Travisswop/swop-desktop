import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
// import { XMTPProvider } from "@/context/xmtpContext";
import AppWalletProvider from "@/components/AppWalletProvider";
import CheckIsSelectMicrositeAvailable from "@/components/CheckIsSelectMicrositeAvailable";
import { auth } from "@/auth";
import isUserAuthenticate from "@/util/isUserAuthenticate";

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
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <Web3ModalProvider initialState={initialState}>
            <SideBarToggleProvider>
              <AppWalletProvider>
                <LayoutComponent>
                  {/* <CheckIsSelectMicrositeAvailable> */}
                  <div className="flex flex-col min-h-screen">
                    <TopBar />
                    {children}
                  </div>
                  {/* </CheckIsSelectMicrositeAvailable> */}
                </LayoutComponent>
              </AppWalletProvider>
            </SideBarToggleProvider>
          </Web3ModalProvider>
        </main>
      </body>
    </html>
  );
}
