import { lazy, Suspense } from "react";
import "./App.css";
import "./assets/css/custom.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";

import ProtectedRoute from "./routing/ProtectedRoute";

import AddCoupon from "./pages/AddCoupon/AddCoupon";
import CouponsList from "./pages/CouponsList/CouponsList";

const MasterLayout = lazy(() => import("./components/layout/MasterLayout"));
const Users = lazy(() => import("./pages/users/Users"));
const Characters = lazy(() => import("./pages/characters/Characters"));
const Orders = lazy(() => import("./pages/orders/Orders"));
const Subscription = lazy(() => import("./pages/subscription/Subscriptions"));
const ErrorComponent = lazy(() => import("./pages/errors/ErrorComponent"));
const EditCharacter = lazy(() => import("./pages/characters/EditCharacter"));
const ResetPassword = lazy(() => import("./pages/login/ResetPassword"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Route without MasterLayout */}
            <Route path="/" element={<Login />} />
            {/* Protected Routes with MasterLayout */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MasterLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="profile/edit" element={<EditProfile />} /> */}
                <Route path="users" element={<Users />} />
                <Route path="characters" element={<Characters />} />
                <Route
                  path="edit-character/:charId"
                  element={<EditCharacter />}
                />
                <Route path="orders" element={<Orders />} />
                <Route path="add-coupon" element={<AddCoupon />} />
                <Route path="coupons-list" element={<CouponsList />} />
                <Route path="subscriptions" element={<Subscription />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
            </Route>

            {/* Handle 404 or other fallback routes */}
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
