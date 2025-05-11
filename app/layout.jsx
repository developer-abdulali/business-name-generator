import { Toaster } from "@/components/ui/sonner";
import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import { BusinessNameContext } from "@/context/BusinessNameContext";
import Navbar from "@/components/Navbar";

const afacad = Afacad_Flux({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "AI Business Name Generator | Unique Brand Name Ideas Instantly",
  description:
    "Generate creative, memorable, and brand-ready business names powered by AI. Filter by style, customize your input, and check domain availability in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${afacad.className}`}>
        <BusinessNameContext>
          <Navbar />
          <Toaster />
          {children}
        </BusinessNameContext>
      </body>
    </html>
  );
}
