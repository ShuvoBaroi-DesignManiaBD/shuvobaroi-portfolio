import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import ReduxStoreProvider from "@/lib/ReduxStoreProvider";
import { getSiteInfo } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {};

function injectSiteInfo() {
  try{
    getSiteInfo().then((data) => {
      const siteInfo = data;
      metadata.title = siteInfo.title;
      metadata.description = siteInfo.description;
    });
  }catch(e){
    console.log(e)
  }
}

injectSiteInfo();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/jsm-logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ReduxStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
