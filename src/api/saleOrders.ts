// api/saleOrders.ts

// Function to fetch sale orders
export const customerSchema = async () => {
  // Mimic API call
  return [
    {
      id: 9,
      customer: 11908,
      customer_profile: {
        id: 11908,
        name: "Ram",
        color: [182, 73, 99],
        email: "5QfZ7@example.com",
        pincode: "Mumbai",
        location_name: "Mumbai, Maharastra, India",
        type: "C",
        profile_pic: null,
        gst: "",
      },
    },
    {
      id: 10,
      customer: 12908,
      customer_profile: {
        id: 12908,
        name: "Kam",
        color: [450, 66, 55],
        email: "gae@example.com",
        pincode: "Lanka",
        location_name: "Lanka, shri, India",
        type: "C",
        profile_pic: null,
        gst: "",
      },
    },
  ];
};

// Function to fetch products
export const productSchema = async () => {
  // Mimic API call
  return [
    {
      id: 209,
      display_id: 8,
      owner: 1079,
      name: "Product11",
      category: "The god of War",
      characteristics: "New Product Characteristics",
      features: "",
      brand: "New Product Brand",
      sku: [
        {
          id: 248,
          selling_price: 54,
          max_retail_price: 44,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 247,
          selling_price: 32,
          max_retail_price: 32,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 246,
          selling_price: 23,
          max_retail_price: 21,
          amount: 22,
          unit: "kg",
          quantity_in_inventory: 1,
          product: 209,
        },
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z",
    },
    {
      id: 210,
      display_id: 8,
      owner: 1079,
      name: "Product22",
      category: "The MW",
      characteristics: "New Product Characteristics",
      features: "",
      brand: "New Product Brand",
      sku: [
        {
          id: 348,
          selling_price: 54,
          max_retail_price: 44,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 347,
          selling_price: 32,
          max_retail_price: 32,
          amount: 33,
          unit: "kg",
          quantity_in_inventory: 0,
          product: 209,
        },
        {
          id: 346,
          selling_price: 23,
          max_retail_price: 21,
          amount: 22,
          unit: "kg",
          quantity_in_inventory: 1,
          product: 209,
        },
      ],
      updated_on: "2024-04-20T12:46:41.995873Z",
      adding_date: "2024-04-20T12:46:41.995828Z",
    },
  ];
};

// Function to fetch sale order form schema
export const fetchSaleOrderFormSchema = async () => {
  // Mimic API call
  return [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 246,
          price: 12,
          quantity: 12,
        },
      ],
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "7/5/2024",
    },
    {
      customer_id: 12908,
      items: [
        {
          sku_id: 247,
          price: 32,
          quantity: 2,
        },
      ],
      paid: true,
      invoice_no: "Invoice - 1212121",
      invoice_date: "12/12/2024",
    },
  ];
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


let saleOrders: any[] = [];

const loadSaleOrders = async () => {
  saleOrders = await fetchSaleOrderFormSchema();
};

export const updateSaleOrder = async (updatedOrder: { customer_id: any }) => {
  console.log("saleOrders", saleOrders);
  saleOrders = saleOrders.map((order) =>
    order.customer_id === updatedOrder.customer_id ? updatedOrder : order
  );
  console.log("updatedOrder", updatedOrder);
  return updatedOrder;
};

loadSaleOrders();


// Update sale order function in api/saleOrders.ts




