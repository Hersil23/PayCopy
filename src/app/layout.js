import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "PayCopy - Cobra y paga fácil",
  description:
    "Comparte tus datos de pago de forma organizada. Genera un enlace de cobro y el que paga copia cada dato con un toque.",
  keywords: "pago móvil, cobrar, datos bancarios, Venezuela, Zelle, Binance",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "PayCopy - Cobra y paga fácil",
    description: "Comparte tus datos de pago de forma organizada.",
    url: "https://paycopy.app",
    siteName: "PayCopy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayCopy - Cobra y paga fácil",
    description: "Comparte tus datos de pago de forma organizada.",
  },
  metadataBase: new URL("https://paycopy.app"),
};

export const viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <div className="min-h-dvh flex flex-col">
            <main className="flex-1 w-full max-w-[480px] mx-auto px-4">
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
