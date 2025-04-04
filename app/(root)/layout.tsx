import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "home"
  
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen flex-col">
      <Header></Header>
      <div className="flex-1 wrapper">
        {children}
      </div>
      <Toaster/>
      <Footer></Footer>
    </div>
  );
}
