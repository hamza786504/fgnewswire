import "../../globals.css";
import { SidebarProvider } from "../context/SidebarContext";
import WhatsappIcon from "../Components/WhatsappIcon";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
          defer
        ></script>
      </head>
      <body className={`antialiased`}>
        <SidebarProvider>
          <div className="bg-white h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="mt-3 rounded-l-4xl flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
                <Footer />
              </main>
            </div>
          </div>
          <WhatsappIcon />
        </SidebarProvider>
      </body>
    </html>
  );
}
