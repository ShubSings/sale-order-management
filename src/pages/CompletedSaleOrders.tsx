import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderModal from "../components/SaleOrderModal";
import { Link } from "react-router-dom";
import { fetchAndCombineData } from "../api/saleOrders";

const CompletedSaleOrders = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState<any>(null);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["completedSaleOrders"],
        queryFn: fetchAndCombineData,
    });

    const completedOrders = orders.filter(order => order.paid);

    const handleViewOrder = (order: any) => {
        setViewingOrder(order);
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
            </Flex>
            <Box width="100%" px="20px">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                        <SaleOrderTable orders={completedOrders} onEdit={handleViewOrder} readOnly={true} />
                )}
            </Box>
            <SaleOrderModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                order={viewingOrder}
            // readOnly={true}
                mode="edit"
            />
        </Flex>
    );
};

export default CompletedSaleOrders;
