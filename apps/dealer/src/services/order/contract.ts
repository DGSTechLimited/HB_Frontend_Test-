// Create Order Request
export interface ICreateOrderRequest {
  cartId: number;
  shippingMethodId?: number;
  billingOrderNo?: string;
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingCompanyName?: string;
  notes?: string;
}

// Create Order Response
export interface ICreateOrderResponse {
  success: true;
  message: string;
  data: {
    orderId: number;
    orderNumber: string;
    orderStatus: string;
    totalAmount: number;
    itemCount: number;
    orderDate: string;
  };
}

// Order Item
export interface IOrderItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    code: string;
    name: string;
    type: string;
  };
  unitPriceSnapshot: number;
  subtotal: number;
  formattedUnitPrice: string;
  formattedSubtotal: string;
}

// Order Details
export interface IOrder {
  id: number;
  orderNumber: string;
  billingOrderNo: string | null;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  formattedTotal: string;
  currency: string;
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string | null;
  };
  shippingMethod: {
    id: number;
    name: string;
  } | null;
  notes: string | null;
  items: IOrderItem[];
  itemCount: number;
  totalQuantity: number;
  statusHistory: any[];
  createdAt: string;
  updatedAt: string;
}

// Get Order Response
export interface IOrderResponse {
  success: true;
  data: IOrder;
}

// Orders List Query Params
export interface IOrdersListParams {
  status?: string;
  type?: 'recent' | 'all';
  page?: number;
  limit?: number;
}

// Orders List Response
export interface IOrdersListResponse {
  success: true;
  data: {
    orders: IOrder[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
