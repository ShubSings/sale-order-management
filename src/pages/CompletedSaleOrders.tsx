// src/pages/CompletedSaleOrders.tsx
import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import SaleOrderTable from "../components/SaleOrderTable";

const fetchCompletedSaleOrders = async () => {
    // Mimic API call
    return [
        {
            customer_id: 11908,
            items: [{ sku_id: 220, price: 12, quantity: 12 }],
            paid: true,
            invoice_no: "Invoice - 1212122",
            invoice_date: "2024-05-06",
        },
    ];
};

const CompletedSaleOrders = () => {
    const { data = [] } = useQuery({
        queryKey: ["completedSaleOrders"],
        queryFn: fetchCompletedSaleOrders,
    });

    return (
        <Box p={4}>
            <SaleOrderTable orders={data} onEdit={() => { }} />
        </Box>
    );
};

export default CompletedSaleOrders;
