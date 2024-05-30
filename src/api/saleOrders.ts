import { fetchSaleOrderFormSchema, addSaleOrder } from "../data/saleOrderData";
import { customerSchema } from "../data/customerData";
import { productSchema } from "../data/productData";

// Function to generate random 5-digit customer ID
export const generateCustomerId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const createSaleOrder = async (newOrderData: any) => {
  const transformedOrder = {
    customer_id: generateCustomerId(),
    items: newOrderData.products.map((product: any) => ({
      sku_id: product.sku[0].id,
      price: newOrderData.selling_rate,
      quantity: newOrderData.quantity,
    })),
    paid: newOrderData.paid === "true",
    invoice_no: newOrderData.invoice_no,
    invoice_date: new Date(newOrderData.invoice_date).toLocaleDateString(
      "en-US"
    ),
  };

  console.log("transformedOrder", transformedOrder);
  addSaleOrder(transformedOrder);

  return transformedOrder;
};

export const fetchAndCombineData = async () => {
  const [saleOrders, customers, products] = await Promise.all([
    fetchSaleOrderFormSchema(),
    customerSchema(),
    productSchema(),
  ]);

  // Map customers by their ID for easy lookup
  const customerMap = new Map();
  customers.forEach((customer) => {
    customerMap.set(customer.customer_profile.id, customer.customer_profile);
  });

  // Map SKUs by their ID for easy lookup
  const skuMap = new Map();
  products.forEach((product) => {
    product.sku.forEach((sku) => {
      skuMap.set(sku.id, { ...sku, productName: product.name });
    });
  });

  // Combine sale orders with corresponding customer and SKU data
  const combinedData = saleOrders.map((order) => {
    const customerProfile = customerMap.get(order.customer_id);
    const itemsWithSku = order.items.map((item) => {
      const skuData = skuMap.get(item.sku_id);
      return {
        ...item,
        skuData,
      };
    });
    return {
      ...order,
      customer_profile: customerProfile,
      items: itemsWithSku,
    };
  });

  console.log("cmoeDat", combinedData);
  return combinedData;
};

export const loadSaleOrders = async () => {
  const orders = await fetchSaleOrderFormSchema();
  return orders;
};

// Load sale orders when this file is executed
loadSaleOrders();
