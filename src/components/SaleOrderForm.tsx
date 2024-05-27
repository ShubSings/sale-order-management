// src/components/SaleOrderForm.tsx
import { useForm, Controller } from "react-hook-form";
import { Button, Input, FormLabel, Box, Select } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SaleOrderForm = ({ defaultValues, onClose }: { defaultValues?: any; onClose: () => void }) => {
    const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            // Mimic API call
            await new Promise(resolve => setTimeout(resolve, 500));
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["saleOrders"] });
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
        onClose();
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                render={({ field }) => <DatePicker {...field} selected={field.value} />}
            />
            {errors.invoice_date && <span>{errors.invoice_date.message as string}</span>}

            <FormLabel>Paid</FormLabel>
            <Controller
                name="paid"
                control={control}
                render={({ field }) => (
                    <Select {...field}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Select>
                )}
            />

            <Button mt={4} type="submit">Submit</Button>
        </Box>
    );
};

export default SaleOrderForm;
