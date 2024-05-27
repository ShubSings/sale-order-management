export const fetchActiveSaleOrders = async () => {
  const response = await fetch("/api/active-sale-orders");
  return response.json();
};

export const fetchCompletedSaleOrders = async () => {
  const response = await fetch("/api/completed-sale-orders");
  return response.json();
};

export const createSaleOrder = async (order: any) => {
  const response = await fetch("/api/sale-orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

export const updateSaleOrder = async (id: any, order: any) => {
  const response = await fetch(`/api/sale-orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return response.json();
};
