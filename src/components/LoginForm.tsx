import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
    username: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const { handleSubmit, control } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = (data: LoginFormInputs) => {
        // For this example, we'll use a dummy username and password.
        const dummyUsername = "admin";
        const dummyPassword = "123";

        if (data.username === dummyUsername && data.password === dummyPassword) {
            localStorage.setItem("isAuthenticated", "true");
            // navigate("/active-sale-orders");
            navigate("/");
            toast({
                title: "Login successful.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Invalid username or password.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="username" mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Username is required" }}
                        render={({ field }) => <Input {...field} autoComplete="username" />}
                    />
                </FormControl>

                <FormControl id="password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Password is required" }}
                        render={({ field }) => <Input type="password" {...field} autoComplete="current-password" />}
                    />
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginForm;
