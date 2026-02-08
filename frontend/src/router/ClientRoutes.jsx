import { Routes, Route } from "react-router-dom";
import UserOrders from "../pages/client/UserOrders";
import ClientLayout from "../components/layouts/ClientLayout";
import ProtectedRoute from "./ProtectedRoutes";
import CartPage from "../pages/client/CartPage";
import ChooseAddressPage from "../pages/client/ChooseAddressPage";
import CheckoutPage from "../pages/client/CheckoutPage";
import OrderDetails from "../pages/client/OrderDetails";


export default function ClientRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="client">
                        <ClientLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<UserOrders />} />
                <Route path="orders" element={<UserOrders />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="choose-address" element={<ChooseAddressPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="orders/:id" element={<OrderDetails />} />

            </Route>
        </Routes>
    );
}
