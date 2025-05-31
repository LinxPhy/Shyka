import type { Metadata } from "next";
import { Quicksand, Bungee } from "next/font/google";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";
import { auth } from "./auth";
import { ContextProvider } from "./components/contextProvider";
import ReactQueryProvider from "./components/reactQueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shyka | AI Chatbots",
  description: "",
};

const quicksand = Quicksand({ subsets: ["latin"], display: "swap", weight: "400", variable: '--font-quicksand' });
const bungee = Bungee({ subsets: ["latin"], display: "swap", weight: "400", variable: '--font-bungee' });

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={` ${bungee.variable} ${quicksand.variable}`}>
        <ContextProvider auth={session}>
          <ReactQueryProvider>
            <Header />
            {children}
            <Footer />
          </ReactQueryProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
