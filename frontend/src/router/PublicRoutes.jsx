import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ProductDetailsPage from "../pages/public/ProductDetailsPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import LoginPage from "../pages/public/auth/LoginPage";
import RegisterPage from "../pages/public/auth/RegisterPage";
import ForgotPasswordPage from "../pages/public/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/public/auth/ResetPasswordPage";
import ActivateAccountPage from "../pages/public/auth/ActivateAccountPage";


export default function PublicRoutes() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="products/:id/details" element={<ProductDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activate/:token" element={<ActivateAccountPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
