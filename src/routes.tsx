import React, { ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import CompletedSaleOrders from "./pages/CompletedSaleOrders";
import LoginForm from "./components/LoginForm";
import useAuth from "./hooks/useAuth";
import Home from "./components/Home";


interface ProtectedRouteProps {
    component: ComponentType<any>;
}

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
                path="/home"
                element={<ProtectedRoute component={Home} />}
            />

            <Route
                path="/completed-sale-orders"
                element={<ProtectedRoute component={CompletedSaleOrders} />}
            />
            <Route path="*" element={<LoginForm />} />
        </Routes>
    );
};

// Wrapper component for protected routes
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    useAuth();
    return <Component />;
};

// export default ProtectedRoute;

export default AppRoutes;
