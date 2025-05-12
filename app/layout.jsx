import { Afacad } from "next/font/google"; // Correct font import
import "./globals.css";
import { BusinessNameContext } from "@/context/BusinessNameContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "AI Business Name Generator | Unique Brand Name Ideas Instantly",
  description:
    "Generate creative, memorable, and brand-ready business names powered by AI. Filter by style, customize your input, and check domain availability in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={afacad.className}>
        <BusinessNameContext>
          <Navbar />
          <Toaster />
          {children}
        </BusinessNameContext>
      </body>
    </html>
  );
}
