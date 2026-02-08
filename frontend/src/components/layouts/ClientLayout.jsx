import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartButton from "../common/CartButton";
export default function ClientLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />


            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
                <CartButton />
            </main>


            <Footer />
        </div>
    );
}
