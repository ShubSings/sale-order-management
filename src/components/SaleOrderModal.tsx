import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import SaleOrderForm from "./SaleOrderForm";

const SaleOrderModal = ({ isOpen, onClose, order, mode }: { isOpen: boolean; onClose: () => void; order?: any; mode: "view" | "edit" | "new" }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{order ? (mode === "view" ? "View Sale Order" : "Edit Sale Order") : "New Sale Order"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SaleOrderForm defaultValues={order} onClose={onClose} mode={mode} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SaleOrderModal;
