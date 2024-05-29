import { useForm, Controller } from "react-hook-form";
import { Button, Input, FormLabel, Box, Select as ChakraSelect, useToast, Flex } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { productSchema } from "../api/saleOrders";
import Multiselect from 'multiselect-react-dropdown';

const SaleOrderForm = ({ defaultValues, onClose }: { defaultValues?: any; onClose: () => void }) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({ defaultValues });
    const queryClient = useQueryClient();
    const toast = useToast();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saleOrders"] });
            toast({
                title: "Sale order created.",
                description: "Your sale order has been successfully created.",
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
        console.log("data", data)
        mutation.mutate(data);
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
                        onSelect={(selectedList: any) => {
                            setValue("products", selectedList);
                        }}
                    />
                )}
            />
            {errors.products && <span>{errors.products.message as string}</span>}

            <FormLabel>Customer ID</FormLabel>
            <Controller
                name="customer_id"
                control={control}
                rules={{ required: "Customer ID is required" }}
                render={({ field }) => <Input {...field} />}
            />
            {errors.customer_id && <span>{errors.customer_id.message as string}</span>}

            <FormLabel>Invoice No</FormLabel>
            <Controller
                name="invoice_no"
                control={control}
                rules={{ required: "Invoice No is required" }}
                render={({ field }) => <Input {...field} />}
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
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                    />
                )}
            />
            {errors.invoice_date && <span>{errors.invoice_date.message as string}</span>}

            <FormLabel>Paid</FormLabel>
            <Controller
                name="paid"
                control={control}
                render={({ field }) => (
                    <ChakraSelect {...field}>
                        <option value="">Select an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </ChakraSelect>
                )}
            />

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
        </Box>
    );
};

export default SaleOrderForm;
