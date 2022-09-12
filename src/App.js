import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import NotFound from "./pages/NotFound";
import ViewCoupon from "./pages/ViewCoupon";
import EditCoupon from "./pages/EditCoupon";
import Login from "./pages/Login";
// import BottomNav from "./components/BottomNav";
import Notification from "./pages/Notification";
import UsedCoupons from "./pages/UsedCoupons";
import UnusedCoupons from "./pages/UnusedCoupons";
import ToastMessage from "./components/ToastMessage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastMessage />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/unused/:id" element={<UnusedCoupons />}></Route>
          <Route path="/used/:id" element={<UsedCoupons />}></Route>
          <Route path="/upload" element={<AddCoupon />}></Route>
          <Route path="/view/:id" element={<ViewCoupon />}></Route>
          <Route path="/edit/:id" element={<EditCoupon />}></Route>
          <Route path="/notification" element={<Notification />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* <BottomNav /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
