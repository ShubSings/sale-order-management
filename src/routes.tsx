import React from "react";
import { Routes, Route } from "react-router-dom";
import ActiveSaleOrders from "./pages/ActiveSaleOrders";
import CompletedSaleOrders from "./pages/CompletedSaleOrders";
import LoginForm from "./components/LoginForm";
import useAuth from "./hooks/useAuth";
import Home from "./components/Home";

const AppRoutes: React.FC = () => {
    useAuth(); // This will check authentication for every route

    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/active-sale-orders" element={<ActiveSaleOrders />} />
            <Route path="/completed-sale-orders" element={<CompletedSaleOrders />} />
            <Route path="*" element={<LoginForm />} />
        </Routes>
    );
};

export default AppRoutes;
