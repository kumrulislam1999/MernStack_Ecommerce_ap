import React from "react";
import Header from "./../Header/Header";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

/* ===== Start Imported Toastify ===== */
import { Toaster } from "react-hot-toast";
/* ===== Start Imported Toastify ===== */

export default function Layout({
  children,
  title,
  description,
  keywords,
  author,
}) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce App - Shop now",
  description: " Mern Stact Project 2024",
  keywords: " mern, react, node, mongodb",
  author: "KIRSTeaching",
};
