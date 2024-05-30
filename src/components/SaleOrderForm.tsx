import { useForm, Controller } from "react-hook-form";
import { Button, Input, FormLabel, Box, Select as ChakraSelect, useToast, Flex, useColorMode } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createSaleOrder, generateCustomerId } from "../api/saleOrders";
import Multiselect from 'multiselect-react-dropdown';
import "../style/SaleOrderForm.css";
import { productSchema } from "../data/productData";


const SaleOrderForm = ({ defaultValues, onClose, mode, onSubmit }: { defaultValues?: any; onClose: () => void; mode: "view" | "edit" | "new"; onSubmit: (data: any) => void }) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({ defaultValues });
    const queryClient = useQueryClient();
    const toast = useToast();
    const { colorMode } = useColorMode();


    useEffect(() => {
        if (defaultValues) {

            const productNames = defaultValues.items.map((item: any) => item.skuData.productName);

            setValue("product_name", productNames || '');
            setValue("customer_name", defaultValues.customer_profile.name || '');
            setValue("selling_rate", defaultValues.items[0]?.price || '');
            setValue("quantity", defaultValues.items[0]?.quantity || '');
            setValue("sku_id", defaultValues.items[0]?.sku_id || '');
            setValue("sku_selling_rate", defaultValues.items[0]?.skuData.selling_price || '');
            setValue("total_items", defaultValues.items[0]?.quantity || '');
            setValue("invoice_no", defaultValues.invoice_no || '');
            setValue("invoice_date", defaultValues.invoice_date ? new Date(defaultValues.invoice_date) : null);
            setValue("paid", defaultValues.paid ? "true" : "false");
        }
    }, [defaultValues, setValue]);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            if (mode === "edit") {
                // return await updateSaleOrder(data);
            } else if (mode === "new") {
                console.log("new", data);
                return await createSaleOrder(data);
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["saleOrders"] });
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

    const onSubmits = (data: any) => {
        const customer_id = generateCustomerId();
        data = { ...data, customer_id };
        onSubmit(data);
        mutation.mutate(data);
        onClose();
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmits)}>
            {mode === "new" &&
                <Controller
                name="product_name"
                control={control}
                render={({ field }) => (
                    <Multiselect
                        {...field}
                        options={products}
                        closeOnSelect={false}
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
                    />
                )}
                />}
            {errors.products && <span>{errors.products.message as string}</span>}

            <FormLabel>Customer name</FormLabel>
            <Controller
                name="customer_name"
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

            <FormLabel>SKU id (unit Kg)</FormLabel>
            <Controller
                name="sku_id"
                control={control}
                rules={{ required: "SKU id is required" }}
                render={({ field }) => <Input {...field} isReadOnly={mode === "view"} />}
            />
            {errors.sku_id && <span>{errors.sku_id.message as string}</span>}

            <Flex direction="row" justify={"space-between"} mt={4}>
                <Box >
                    <FormLabel>Selling rate</FormLabel>
                    <Controller
                        name="selling_rate"
                        control={control}
                        rules={{ required: "Selling rate is required" }}
                        render={({ field }) => <Input {...field} isReadOnly={mode === "view"} />}
                    />
                    {errors.sku_selling_rate && <span>{errors.sku_selling_rate.message as string}</span>}
                </Box>
                <Box>
                    <FormLabel>Quantity</FormLabel>
                    <Controller
                        name="quantity"
                        control={control}
                        rules={{ required: "Total items is required" }}
                        render={({ field }) => <Input {...field} isReadOnly={mode === "view"} />}
                    />
                    {errors.total_items && <span>{errors.total_items.message as string}</span>}
                </Box>
            </Flex>

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
