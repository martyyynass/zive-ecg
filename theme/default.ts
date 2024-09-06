import { extendTheme } from "@chakra-ui/react";

import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const theme = extendTheme({
  fonts: {
    heading: font.style.fontFamily,
    body: font.style.fontFamily,
  },
});
