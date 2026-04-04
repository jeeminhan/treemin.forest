import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SeasonSetter } from "@/components/theme/season-setter";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jeemin Han",
  description: "Builder, learner, puzzle-solver. Portfolio of Jeemin Han.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceMono.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SeasonSetter />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
