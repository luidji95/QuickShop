import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
};

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      if (!item || !item.id) return;

      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalPrice += item.price;
      state.totalItems += 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item) {
        state.totalPrice -= item.price * item.quantity;
        state.totalItems -= item.quantity;
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
