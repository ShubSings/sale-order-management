import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderModal from "../components/SaleOrderModal";
import { Link } from "react-router-dom";

// Fetch completed sale orders
const fetchCompletedSaleOrders = async () => {
    // Mimic API call
    return [
        {
            id: 11,
            customer: 21908,
            customer_profile: {
                id: 21908,
                name: "Sam",
                color: [102, 123, 99],
                email: "sam@example.com",
                pincode: "Delhi",
                location_name: "Delhi, India",
                type: "C",
                profile_pic: null,
                gst: ""
            },
            price: 300,
            last_modified: "2024-05-20T12:46:41.995873Z"
        },
        {
            id: 12,
            customer: 22908,
            customer_profile: {
                id: 22908,
                name: "Pam",
                color: [150, 106, 105],
                email: "pam@example.com",
                pincode: "Goa",
                location_name: "Goa, India",
                type: "C",
                profile_pic: null,
                gst: ""
            },
            price: 400,
            last_modified: "2024-05-21T12:46:41.995873Z"
        },
    ];
};

const CompletedSaleOrders = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [viewingOrder, setViewingOrder] = useState<any>(null);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["completedSaleOrders"],
        queryFn: fetchCompletedSaleOrders,
    });

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
                    <SaleOrderTable orders={orders} onEdit={handleViewOrder} />
                )}
            </Box>
            <SaleOrderModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                order={viewingOrder}
            // readOnly={true}
            />
        </Flex>
    );
};

export default CompletedSaleOrders;
