
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import SaleOrderForm from "./SaleOrderForm";

const SaleOrderModal = ({ isOpen, onClose, order }: { isOpen: boolean; onClose: () => void; order?: any }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{order ? "Edit Sale Order" : "New Sale Order"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SaleOrderForm defaultValues={order} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SaleOrderModal;
