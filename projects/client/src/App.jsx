import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./api";
import { login } from "./redux/features/authSlice";
import GuestRoute from "./components/GuestRoute";
import Register from "./pages/Register";
import RegisterVerification from "./pages/RegisterVerification";
import { Box, Spinner, Text } from "@chakra-ui/react";
import Navbar from "./components/HomePage/Navbar/Navbar";
import Footer from "./components/HomePage/Footer/Footer";
import HomePage from "./pages/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "./AdminDashboard.css";
import SideNavBar from "./components/SideNavBar";
import WarehouseManagement from "./pages/admin/AdminWarehouseManagement";
import ChangePassword from "./pages/profile/ChangePassword";
import Profile from "./pages/profile/Profile";
import AdminRoute from "./components/admin/AdminRoute";
import AddressList from "./pages/profile/AddressList";
import Product from "./pages/product/Product";
import ProductDetail from "./pages/product/ProductDetail";
import { attach } from "./redux/features/resetSlice";
import ResetPasswordConfirmation from "./pages/ResetPasswordConfirmation";
import RequestResetPassword from "./pages/RequestResetPassword";
import ManageUserData from "./pages/admin/ManageUserData";
import ManageAdminData from "./pages/admin/ManageAdminData";
import AdminCategory from "./pages/admin/AdminCategory/AdminCategory";
import NotFound from "./components/404Page";
import Cart from "./pages/Cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProductData from "./pages/admin/AdminProductData";
import AdminProductDataDetail from "./pages/admin/AdminProductDataDetail";
import Shipment from "./pages/shipment/Shipment";
import UpdateStock from "./pages/admin/UpdateStock";
import WarehouseStock from "./components/admin/WarehouseStock";
import Checkout from "./pages/order/Checkout";
import ShippingComponent2 from "./components/product/ShippingComponent2";
import AdminStockChangesReport from "./pages/admin/AdminStockChangesReport";
import AdminOrder from "./pages/admin/AdminOrder";
import PaymentProof from "./pages/PaymentProof";
import AdminMutationStock from "./pages/admin/AdminMutationStock";
import AdminOrderHistory from "./pages/admin/AdminOrderHistory";
import TransactionList from "./pages/TransactionList/TransactionList";
import PaymentList from "./pages/TransactionList/WaitingForPayment/PaymentList";
import AdminSalesReport from "./pages/admin/AdminSalesReport";
import ProductSlide from "./components/product/ProductSlide";

function App() {
  const [message, setMessage] = useState("");
  const authSelector = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);

  const [authCheck, setAuthCheck] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token");

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/auth/refresh-token");

      dispatch(login(response.data.data));

      localStorage.setItem("auth_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    } finally {
      setAuthCheck(true);
    }
  };

  const userResetData = async () => {
    try {
      const reset_token = localStorage.getItem("reset_token");

      if (!reset_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/auth/refresh-token");

      dispatch(attach(response.data.data));

      localStorage.setItem("reset_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    } finally {
      setAuthCheck(true);
    }
  };

  useEffect(() => {
    keepUserLoggedIn();
    userResetData();
  }, []);

  if (!authCheck) {
    return (
      <Box textAlign={"center"}>
        <Box mt={"240px"}>
          <Text p="4" fontWeight={"light"} fontSize="4xl">
            <Text
              fontSize={"30px"}
              fontWeight="bold"
              color={"#0095DA"}
              display="inline"
            >
              Shop
            </Text>
            <Text
              pl={"0"}
              fontSize={"30px"}
              fontWeight="bold"
              color={"#F7931E"}
              display="inline"
            >
              edia
            </Text>
          </Text>
          <Spinner
            thickness="5px"
            speed="0.9s"
            emptyColor="#F7931E"
            color="#0095DA"
            size="xl"
          />
          <Text mt="70px" fontWeight={"semibold"} fontSize="15px">
            Feel the convenience of transactions on Shopedia
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {authSelector.RoleId === 3 || authSelector.RoleId === 2 ? (
        <SideNavBar />
      ) : null}

      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/register/verification" ||
      location.pathname === "/reset-password-confirmation" ||
      location.pathname === "/request-reset-password" ||
      location.pathname === "/cart/shipment" ||
      authSelector.RoleId === 3 ||
      authSelector.RoleId === 2 ? null : (
        <Box>
          <Navbar />
        </Box>
      )}

      <Routes>
        <Route path="/slider" element={<ProductSlide />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password-confirmation"
          element={<ResetPasswordConfirmation />}
        />

        <Route
          path="/admin/manage-admin-data"
          element={
            <AdminRoute>
              <ManageAdminData />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-user-data"
          element={
            <AdminRoute>
              <ManageUserData />
            </AdminRoute>
          }
        />
        <Route
          path={authSelector.RoleId === 3 ? "/admin/update-stock" : null}
          element={
            <AdminRoute>
              <UpdateStock />
            </AdminRoute>
          }
        />
        <Route
          path={
            authSelector.RoleId === 2
              ? "/admin/update-stock"
              : "/admin/update-stock/:id"
          }
          element={
            <AdminRoute>
              <WarehouseStock />
            </AdminRoute>
          }
        />

        <Route
          path="/request-reset-password"
          element={
            <GuestRoute>
              <RequestResetPassword />
            </GuestRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/register/verification"
          element={<RegisterVerification />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <AdminCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/warehouse-management"
          element={
            <AdminRoute>
              <WarehouseManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order-history"
          element={
            <AdminRoute>
              <AdminOrderHistory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/sales-report"
          element={
            <AdminRoute>
              <AdminSalesReport />
            </AdminRoute>
          }
        />

        {/* Profiling Route */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/address"
          element={
            <ProtectedRoute>
              <AddressList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment"
          element={
            <ProtectedRoute>
              <Shipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment-component"
          element={
            <ProtectedRoute>
              <ShippingComponent2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart/shipment"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <AdminProductData />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/detail/:id"
          element={
            <AdminRoute>
              <AdminProductDataDetail />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/report/stock"
          element={
            <AdminRoute>
              <AdminStockChangesReport />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/stock-mutation"
          element={
            <AdminRoute>
              <AdminMutationStock />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <AdminRoute>
              <AdminOrder />
            </AdminRoute>
          }
        />
        {/* Profiling Route */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/address"
          element={
            <ProtectedRoute>
              <AddressList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment"
          element={
            <ProtectedRoute>
              <Shipment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment-component"
          element={
            <ProtectedRoute>
              <ShippingComponent2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart/shipment"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/thank-you/shopedia/:transaction_name"
          element={
            <ProtectedRoute>
              <PaymentProof />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction-list"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction/payment-list"
          element={
            <ProtectedRoute>
              <PaymentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <AdminProductData />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/detail/:id"
          element={
            <AdminRoute>
              <AdminProductDataDetail />
            </AdminRoute>
          }
        />
        {/* Product Route */}
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id/:product_name" element={<ProductDetail />} />
      </Routes>

      {location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/register/verification" ||
      location.pathname === "/reset-password-confirmation" ||
      location.pathname === "/request-reset-password" ||
      location.pathname === "/cart/shipment" ||
      authSelector.RoleId === 3 ||
      authSelector.RoleId === 2 ? null : (
        <Box>
          <Footer />
        </Box>
      )}
    </>
  );
}

export default App;
