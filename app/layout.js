import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageWrapper from "@/components/PageWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Mozek HealthTech - Intelligent Healthcare Wearables",
  description:
    "Mozek HealthTech builds AI-powered wearable medical devices for seizure detection, fall detection, and elderly care. Introducing the G1 Band.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
