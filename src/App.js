// App.js 的功能是製作出 App component => 其他所有components的容器
// 還有根據不同的URL去做相對應的Route

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
