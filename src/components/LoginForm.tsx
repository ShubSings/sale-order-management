import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Avatar,
    Flex,
    Heading,
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    chakra
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

type LoginFormInputs = {
    username: string;
    password: string;
};

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm: React.FC = () => {
    const { handleSubmit, control } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated) {
            navigate("/home");
        }
        else {
            navigate("/");
        }

    }, [navigate]);

    const onSubmit = (data: LoginFormInputs) => {
        const dummyUsername = "admin";
        const dummyPassword = "123";

        if (data.username === dummyUsername && data.password === dummyPassword) {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/home");
            toast({
                position: "top-left",
                title: "Login successful.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } else {
            toast({
                position: "top-left",
                title: "Invalid username or password.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            h="90vh"
        >
            <Stack
                spacing={4}
                w="md"
                p={5}
                justifyContent={"center"}
                alignItems={"center"}
                boxShadow="md"
            >
                <Avatar />
                <Heading>Login</Heading>
                <Box m={4} w="100%">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl id="username" mb={4}>
                            <FormLabel>Username</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <CFaUserAlt />
                                </InputLeftElement>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Username is required" }}
                                    render={({ field }) => (
                                        <Input {...field} autoComplete="username" pl="10" />
                                    )}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl id="password" mb={4}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <CFaLock />
                                </InputLeftElement>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) => (
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            autoComplete="current-password"
                                            pl="10"
                                        />
                                    )}
                                />
                                <InputRightElement>
                                    <Button
                                        size="sm"
                                        onClick={handleShowClick}
                                        variant="ghost"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Button type="submit" colorScheme="teal" width="full">
                            Login
                        </Button>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginForm;
