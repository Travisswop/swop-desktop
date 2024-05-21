import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";
import { SideBarToggleProvider } from "../../contexts/sideBarToggleContext";
import TopBar from "@/components/TopBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
