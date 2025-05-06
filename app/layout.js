import "./globals.css";

export const metadata = {
  title: "Event Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
