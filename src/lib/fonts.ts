import {
  Poppins,
  Roboto,
  Roboto_Serif,
  Roboto_Slab,
  IBM_Plex_Sans,
} from "next/font/google";

export const robotoSerif = Roboto_Serif({
  weight: ["400"],
  subsets: ["latin"],
});
export const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const robotoSlab = Roboto_Slab({
  weight: ["400"],
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const IbmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
