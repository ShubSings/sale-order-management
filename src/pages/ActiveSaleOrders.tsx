import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderModal from "../components/SaleOrderModal";
import { Link } from "react-router-dom";
import { fetchSaleOrders } from "../api/saleOrders"; // Import fetchSaleOrders from the API folder

const ActiveSaleOrders = () => {
    const { data: orders = [], refetch } = useQuery({
        queryKey: ["saleOrders"],
        queryFn: fetchSaleOrders,
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<any>(null);

    const handleNewOrder = () => {
        setEditingOrder(null);
        setModalOpen(true);
    };

    const handleEditOrder = (order: any) => {
        setEditingOrder(order);
        setModalOpen(true);
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
                <SaleOrderTable orders={orders} onEdit={handleEditOrder} />
            </Box>
            <SaleOrderModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                order={editingOrder}
            />
        </Flex>
    );
};

export default ActiveSaleOrders;
