import { Table, Tbody, Td, Th, Thead, Tr, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

const SaleOrderTable = ({ orders, onEdit }: { orders: any[], onEdit: (order: any) => void }) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Customer Name</Th>
                    <Th>Price</Th>
                    <Th>Last Modified</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orders.map(order => (
                    <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.customer_profile.name}</Td>
                        <Td>{order.price}</Td>
                        <Td>{new Date(order.last_modified).toLocaleDateString()}</Td>
                        <Td>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={<FiMoreHorizontal />}
                                    aria-label="Edit"
                                    variant="ghost"
                                />
                                <MenuList>
                                    <MenuItem onClick={() => onEdit(order)}>Edit</MenuItem>
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
