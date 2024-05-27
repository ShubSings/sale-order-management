import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import SaleOrderTable from "../components/SaleOrderTable";
import SaleOrderModal from "../components/SaleOrderModal";

const fetchSaleOrders = async () => {
    // Mimic API call
    return [
        {
            customer_id: 11908,
            items: [{ sku_id: 220, price: 12, quantity: 12 }],
            paid: false,
            invoice_no: "Invoice - 1212121",
            invoice_date: "2024-05-07",
        },
    ];
};

const ActiveSaleOrders = () => {
    const { data = [], refetch } = useQuery({
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
        <Box p={4}>
            <Button onClick={handleNewOrder} mb={4}>+ Sale Order</Button>
            <SaleOrderTable orders={data} onEdit={handleEditOrder} />
            <SaleOrderModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} order={editingOrder} />
        </Box>
    );
};

export default ActiveSaleOrders;
