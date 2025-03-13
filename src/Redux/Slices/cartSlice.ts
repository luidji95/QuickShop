import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default cartSlice.reducer;
