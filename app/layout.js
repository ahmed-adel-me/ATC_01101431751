import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
export const metadata = {
  title: "Event Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="dark:bg-gray-900 dark:text-white bg-white text-black transition-colors duration-300 flex flex-col h-screen overflow-hidden">
          <div >
            <Navbar />
          </div>
          <div className=" flex-1 overflow-scroll">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
