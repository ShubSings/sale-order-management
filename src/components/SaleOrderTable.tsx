// src/components/SaleOrderTable.tsx
import { Table, Tbody, Td, Th, Thead, Tr, IconButton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import SaleOrderModal from "./SaleOrderModal";

const SaleOrderTable = ({ orders, onEdit }: { orders: any[], onEdit: (order: any) => void }) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Customer ID</Th>
                    <Th>Invoice No</Th>
                    <Th>Invoice Date</Th>
                    <Th>Paid</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orders.map(order => (
                    <Tr key={order.invoice_no}>
                        <Td>{order.customer_id}</Td>
                        <Td>{order.invoice_no}</Td>
                        <Td>{order.invoice_date}</Td>
                        <Td>{order.paid ? "Yes" : "No"}</Td>
                        <Td>
                            <IconButton
                                icon={<EditIcon />}
                                onClick={() => onEdit(order)} aria-label={"Edit"} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default SaleOrderTable;
