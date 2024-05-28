import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (process.env.NODE_ENV === "development") {
  //   const session = await auth();
  //   if (!session?.user) {
  //     return redirect("/signin");
  //   }
  // }
  return (
    <html lang="en">
      <body>
        <main className="">
          <ToastContainer position="top-center" />
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
