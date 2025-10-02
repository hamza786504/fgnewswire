import AnnouncementBar from "./Componenets/Announcementbar";
import Footer from "./Componenets/Footer";
import Header from "./Componenets/Header";
import ServicesSection from "./Componenets/Services";
import "../globals.css";
import WOWInit from "../wow-init";


export const metadata = {
  title: "FG Newswire",
  description: "FG Newswire Pr Website",
};

export default function PagesLayout({ children }) {

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
      <body
        className={`overflow-x-hidden antialiased`}
      >
        {/* <WOWInit /> */}
        <AnnouncementBar />
        <Header />
        {children}
        <ServicesSection />
        <Footer />
      </body>
    </html>
  );
}
