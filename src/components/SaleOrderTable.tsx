import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

interface SaleOrderTableProps {
    orders: any[];
    onEdit: (order: any) => void;
    readOnly: boolean;
}

const SaleOrderTable: React.FC<SaleOrderTableProps> = ({ orders, onEdit, readOnly }) => {
    return (
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
                                    aria-label="Edit"
                                    variant="ghost"
                                />
                                <MenuList>
                                    {!readOnly && <MenuItem onClick={() => onEdit(order)}>Edit</MenuItem>}
                                    <MenuItem>View</MenuItem>
                                </MenuList>
                            </Menu>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default SaleOrderTable;
