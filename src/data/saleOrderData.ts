let saleOrders: any[] = [];

export const fetchSaleOrderFormSchema = async () => {
  // Mimic API call
  return [
    {
      customer_id: 11908,
      customer_name: "kratos",
      items: [
        {
          sku_id: 246,
          price: 12,
          quantity: 12,
        },
      ],
      selling_rate: 14,
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "7/5/2024",
    },
    {
      customer_id: 12908,
      customer_name: "time",
      items: [
        {
          sku_id: 247,
          price: 32,
          quantity: 2,
        },
      ],
      selling_rate: 12,
      paid: true,
      invoice_no: "Invoice - 1212121",
      invoice_date: "12/12/2024",
    },
  ];
};

export const addSaleOrder = (order: any) => {
  saleOrders.push(order);
};

export const getSaleOrders = () => {
  return saleOrders;
};
