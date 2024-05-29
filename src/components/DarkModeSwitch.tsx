import { useColorMode, Switch, Flex, Text } from "@chakra-ui/react";

const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex justify="flex-end" alignItems="center">
            <Flex direction="column" alignItems="center">
                <Text mt={1} fontSize="sm">{colorMode === "dark" ? "Light Mode" : "Dark Mode"}</Text>
                <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
            </Flex>
        </Flex>
    );
};

export default DarkModeSwitch;
