import "./globals.css";

export const metadata = {
  title: "FG Newswire",
  description: "FG Newswire Pr Website",
};

export default function RootLayout({ children }) {

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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
