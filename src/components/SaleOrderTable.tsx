import React, { useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import SaleOrderModal from "./SaleOrderModal";

interface SaleOrderTableProps {
    orders: any[];
    onEdit: (order: any) => void;
    readOnly: boolean;
}

const SaleOrderTable: React.FC<SaleOrderTableProps> = ({ orders, onEdit, readOnly }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [mode, setMode] = useState<"view" | "edit">("edit");

    const handleView = (order: any) => {
        setSelectedOrder(order);
        setMode("view");
        setIsModalOpen(true);
    };

    const handleEdit = (order: any) => {
        setSelectedOrder(order);
        setMode("edit");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Customer Name</Th>
                        <Th>Price</Th>
                        <Th>Invoice Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map(order => (
                        <Tr key={order.customer_id}>
                            <Td>{order.customer_id}</Td>
                            <Td>{order.customer_profile.name}</Td>
                            <Td>{order.items[0].price}</Td>
                            <Td>{new Date(order.invoice_date).toLocaleDateString()}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton
                                        as={IconButton}
                                        icon={<FiMoreHorizontal />}
                                        aria-label="Actions"
                                        variant="ghost"
                                    />
                                    <MenuList>
                                        {!readOnly && <MenuItem onClick={() => handleEdit(order)}>Edit</MenuItem>}
                                        <MenuItem onClick={() => handleView(order)}>View</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <SaleOrderModal isOpen={isModalOpen} onClose={handleCloseModal} order={selectedOrder} mode={mode} />
        </>
    );
};

export default SaleOrderTable;
