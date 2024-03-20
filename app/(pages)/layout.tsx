import "../../app/globals.css";
import LayoutComponent from "@/components/LayoutComponent";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          {/* <section className="flex-[1.5] px-4">
            <SideBar />
          </section>
          <section className="flex-[10.5] bg-gray-100">
            <TopBar />
            {children}
          </section> */}
          <LayoutComponent>{children}</LayoutComponent>
        </main>
      </body>
    </html>
  );
}
