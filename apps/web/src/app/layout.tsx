import type { Metadata } from "next";
import './index.scss'
import Header from "../components/header/index"
import Footer from "../components/footer/index"
import { AuthProvider } from '@/context/AuthContext'


export const metadata: Metadata = {
  title: "CMMS",
  description: "System CMMS dla twojej firmy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={'x'}>
        <AuthProvider>
          <Header/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
