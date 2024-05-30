import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import SaleOrderForm from "./SaleOrderForm";

const SaleOrderModal = ({ isOpen, onClose, order, mode, onFormSubmit }: { isOpen: boolean; onClose: () => void; order?: any; mode: "view" | "edit" | "new"; onFormSubmit: (formData: any) => void }) => {
    const handleSubmit = (formData: any) => {
        // Call the form submit handler with the submitted data
        onFormSubmit(formData);
        onClose();
    };

    return (
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{order ? (mode === "view" ? "View Sale Order" : "Edit Sale Order") : "New Sale Order"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Pass form submit handler to SaleOrderForm */}
                    <SaleOrderForm defaultValues={order} onClose={onClose} mode={mode} onSubmit={handleSubmit} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SaleOrderModal;
