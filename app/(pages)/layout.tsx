import SideBar from "@/components/SideBar";
import "../../app/globals.css";
import TopBar from "@/components/TopBar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex">
          <section className="flex-[1.5]  px-4">
            <SideBar />
          </section>
          <section className="flex-[10.5] bg-amber-500">
            <TopBar />
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
