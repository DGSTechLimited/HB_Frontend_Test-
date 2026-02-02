// Cart Item
export interface ICartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    code: string;
    name: string;
    type: string;
    currentPrice: any;
    currentStock: number;
  };
  unitPrice: number;
  subtotal: number;
  formattedUnitPrice: string;
  formattedSubtotal: string;
}

// Cart Summary
export interface ICartSummary {
  itemCount: number;
  totalQuantity: number;
  subtotal: number;
  total: number;
  formattedSubtotal: string;
  formattedTotal: string;
  currency: string;
}

// Cart Response
export interface ICart {
  id: number | null;
  items: ICartItem[];
  summary: ICartSummary;
}

export interface ICartResponse {
  success: true;
  data: ICart;
}

// Cart Count Response
export interface ICartCountResponse {
  success: true;
  data: {
    count: number;
  };
}

// Add to Cart
export interface IAddToCartRequest {
  productCode: string;
  quantity: number;
}

export interface IAddToCartResponse {
  success: true;
  message: string;
  data: {
    cartItemId: number;
    quantity: number;
    added: boolean;
  };
}

// Update Cart Item
export interface IUpdateCartItemRequest {
  productCode: string;
  quantity: number;
}

export interface IUpdateCartItemResponse {
  success: true;
  message: string;
  data: {
    quantity?: number;
    removed: boolean;
  };
}

// Remove Cart Item
export interface IRemoveCartItemRequest {
  productCode: string;
}

export interface IRemoveCartItemResponse {
  success: true;
  message: string;
}
