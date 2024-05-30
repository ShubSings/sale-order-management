import { useEffect, useState } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderModal from "../components/SaleOrderModal";
import { Link } from "react-router-dom";
import { fetchAndCombineData } from "../api/saleOrders";



const ActiveSaleOrders = () => {
    const { data: orderss = [], refetch } = useQuery({
        queryKey: ["saleOrders"],
        queryFn: fetchAndCombineData,
    });
    const toast = useToast();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any>(null);
    const [submittedFormData, setSubmittedFormData] = useState(null); // New state variable to hold submitted form data
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        setOrders(orderss);
    }, [orderss]);

    const handleNewOrder = () => {
        setEditingOrder(null);
        setModalOpen(true);
    };

    const handleEditOrder = (order: any) => {
        setEditingOrder(order);
        setModalOpen(true);
    };

    const handleFormSubmit = (formData: any) => {
        // Update the state variable with submitted form data
        setOrders([...orders, formData]);
        setModalOpen(false);
        toast({
            title: "Sale order added.",
            description: "Your sale order has been successfully added.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Flex direction="column" alignItems="center" pt="40px">
            <Flex width="100%" justifyContent="space-between" px="20px" mb="20px">
                <Box>
                    <Link to="/home">
                        <Button mr={2} colorScheme="teal">
                            Active Sale Orders
                        </Button>
                    </Link>
                    <Link to="/completed-sale-orders">
                        <Button colorScheme="blue">Completed Sale Orders</Button>
                    </Link>
                </Box>
                <Box>
                    <Button colorScheme="purple" onClick={handleNewOrder}>
                        + Sale Order
                    </Button>
                </Box>
            </Flex>
            <Box width="100%" px="20px">
                <SaleOrderTable orders={orders} submittedFormData={submittedFormData} onEdit={handleEditOrder} readOnly={false} />
            </Box>
            <SaleOrderModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                order={editingOrder}
                mode="new"
                onFormSubmit={handleFormSubmit} // Pass form submit handler to modal
            />
        </Flex>
    );
};

export default ActiveSaleOrders;
