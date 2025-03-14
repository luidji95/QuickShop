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

      if (!item || !item.id) return; // Sprečavamo dodavanje nevalidnih podataka

      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalPrice += item.price;
      state.totalItems += 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
