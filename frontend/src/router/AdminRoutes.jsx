import { Routes, Route } from "react-router-dom";


import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import ProductList from "../pages/admin/products/ProductList";
import ProductAdd from "../pages/admin/products/ProductAdd";
import ProductEdit from "../pages/admin/products/ProductEdit";
import UserList from "../pages/admin/users/UserList";
import UserAdd from "../pages/admin/users/UserAdd";
import UserEdit from "../pages/admin/users/UserEdit";
import AdminLayout from "../components/layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoutes";
import CategoryList from "../pages/admin/categories/CategoryList";
import CategoryAdd from "../pages/admin/categories/CategoryAdd";
import CategoryEdit from "../pages/admin/categories/CategoryEdit";


export default function AdminRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
               <Route path="categories" element={<CategoryList />} />
                <Route path="categories/add" element={<CategoryAdd />} />
                <Route path="categories/:id/edit" element={<CategoryEdit />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/add" element={<ProductAdd />} />
                <Route path="products/:id/edit" element={<ProductEdit />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/add" element={<UserAdd />} />
                <Route path="users/:id/edit" element={<UserEdit />} />
            </Route>
        </Routes>
    );
}


