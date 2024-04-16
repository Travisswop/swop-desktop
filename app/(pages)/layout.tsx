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
        <main className="">
          <LayoutComponent>{children}</LayoutComponent>
        </main>
      </body>
    </html>
  );
}
