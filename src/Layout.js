// <Outlet /> => 網頁主要內容，會因為不同的URL，而改變它對應的內容(component)
import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/about">關於這個網站</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
