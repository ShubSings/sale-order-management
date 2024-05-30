import { useForm, Controller } from "react-hook-form";
import { Button, Input, FormLabel, Box, Select as ChakraSelect, useToast, Flex, useColorMode } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { productSchema, updateSaleOrder } from "../api/saleOrders";
import Multiselect from 'multiselect-react-dropdown';
import "../style/SaleOrderForm.css";

const SaleOrderForm = ({ defaultValues, onClose, mode }: { defaultValues?: any; onClose: () => void; mode: "view" | "edit" | "new" }) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({ defaultValues });
    const queryClient = useQueryClient();
    const toast = useToast();
    const { colorMode } = useColorMode();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const updatedOrder = await updateSaleOrder(data);
            console.log("updatedOrder", updatedOrder);
            return updatedOrder;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["saleOrders"] });
            toast({
                title: "Sale order updated.",
                description: "Your sale order has been successfully updated.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        },
    });

    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await productSchema();
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    const onSubmit = (data: any) => {
        if (mode === "edit") {
            console.log("sub", data);
            mutation.mutate(data);
        }
        onClose();
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Products</FormLabel>
            <Controller
                name="products"
                control={control}
                render={({ field }) => (
                    <Multiselect
                        {...field}
                        options={products}
                        displayValue="name"
                        className={`custom-multiselect ${colorMode === "dark" ? "custom-multiselect-dark" : "custom-multiselect-light"}`}
                        onSelect={(selectedList: any) => {
                            setValue("products", selectedList);
                        }}
                        style={{
                            multiselectContainer: {
                                color: colorMode === "dark" ? "#e2e8f0" : "#333",
                            },
                            optionContainer: {
                                backgroundColor: colorMode === "dark" ? "#2d3748" : "#fff",
                                color: colorMode === "dark" ? "#e2e8f0" : "#333",
                            },
                        }}
                        disable={mode === "view"}
                    />
                )}
            />
            {errors.products && <span>{errors.products.message as string}</span>}

            <FormLabel>Customer ID</FormLabel>
            <Controller
                name="customer_id"
                control={control}
                rules={{ required: "Customer ID is required" }}
                render={({ field }) => <Input {...field} isReadOnly={mode === "view"} />}
            />
            {errors.customer_id && <span>{errors.customer_id.message as string}</span>}

            <FormLabel>Invoice No</FormLabel>
            <Controller
                name="invoice_no"
                control={control}
                rules={{ required: "Invoice No is required" }}
                render={({ field }) => <Input {...field} isReadOnly={mode === "view"} />}
            />
            {errors.invoice_no && <span>{errors.invoice_no.message as string}</span>}

            <FormLabel>Invoice Date</FormLabel>
            <Controller
                name="invoice_date"
                control={control}
                rules={{ required: "Invoice Date is required" }}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        placeholderText="Select Date"
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className={`custom-datepicker ${colorMode === "dark" ? "custom-datepicker-dark" : "custom-datepicker-light"}`}
                        readOnly={mode === "view"}
                    />
                )}
            />
            {errors.invoice_date && <span>{errors.invoice_date.message as string}</span>}

            <FormLabel>Paid</FormLabel>
            <Controller
                name="paid"
                control={control}
                render={({ field }) => (
                    <ChakraSelect {...field} isReadOnly={mode === "view"}>
                        <option value="">Select an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </ChakraSelect>
                )}
            />
            {(mode === "edit" || mode === "new") && (
                <Flex justifyContent="flex-end">
                    <Button
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{ bg: "teal.300" }}
                        mt={4}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Flex>
            )}

        </Box>
    );
};

export default SaleOrderForm;
