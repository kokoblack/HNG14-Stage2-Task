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
        className={`${theme ? "dark" : ""} max-[1024px]:block bg-1100 dark:bg-1200 box-border relative`}
      >
        <SideNav />
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
