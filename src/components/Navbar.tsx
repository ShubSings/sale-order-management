// Navbar.tsx
import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/");
    };

    return (
        <Flex justify="space-between" p={1} alignItems="center" boxShadow="md">
            <Link to="/home">
                {isAuthenticated && (<Button mr={2} colorScheme="teal">Home</Button>)}
            </Link>
            <DarkModeSwitch />
            {isAuthenticated && (
                <Button onClick={handleLogout} colorScheme="teal">Logout</Button>
            )}
        </Flex>
    );
};

export default Navbar;
