import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Zive dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Flex
            w="full"
            px={{ base: 5, lg: 10 }}
            justifyContent="center"
            margin="0 auto"
          >
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
