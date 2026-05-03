import Home from "../home/Home";
import DetailPage from "../detailPage/DetailPage";
import SideNav from "../layouts/SideNav";
import { Route, Routes, BrowserRouter } from "react-router";
import { useClickActionStore } from "../redux/ClickActionRedux";
import { useEffect } from "react";

const InvoiceApp = () => {
  const theme = useClickActionStore((state) => state.toggleTheme);

  useEffect(() => {
    theme
      ? (document.body.style.backgroundColor = "#141625")
      : (document.body.style.backgroundColor = "#F8F8FB");
  }, [theme]);
  return (
    <BrowserRouter>
      <main
        className={`${theme ? "dark" : ""} max-[1024px]:block max-[1024px]:mb-0 mb-30 bg-1100 dark:bg-1200 box-border relative max-h-screen flex justify-center items-center`}
      >
        <SideNav />
        <div className="w-25 max-[1024px]:hidden"></div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="detail" element={<DetailPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default InvoiceApp;
