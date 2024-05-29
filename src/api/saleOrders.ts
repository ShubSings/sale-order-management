// api/saleOrders.ts

// Function to fetch sale orders
export const fetchSaleOrders = async () => {
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
      price: 100,
      last_modified: "2024-05-24T12:46:41.995873Z",
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
      price: 200,
      last_modified: "2024-05-25T12:46:41.995873Z",
    },
  ];
};

// Function to fetch products
export const fetchProducts = async () => {
  // Mimic API call
  return [
    {
      id: 209,
      display_id: 8,
      owner: 1079,
      name: "New Product",
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
  ];
};

// Function to fetch sale order form schema
export const fetchSaleOrderForm = async () => {
  // Mimic API call
  return [
    {
      customer_id: 11908,
      items: [
        {
          sku_id: 220,
          price: 12,
          quantity: 12,
        },
      ],
      paid: false,
      invoice_no: "Invoice - 1212121",
      invoice_date: "7/5/2024",
    },
  ];
};
