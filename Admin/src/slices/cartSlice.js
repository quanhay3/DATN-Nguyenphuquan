import { createSlice } from "@reduxjs/toolkit";

const initState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.total;
    },
    addToCart: (state, action) => {
      if (state.items.some((item) => item._id === action.payload.item._id)) {
        state.items.find(
          (item) => item._id === action.payload.item._id
        ).quantity += action.payload.item.quantity;
      } else {
        state.items.push(action.payload.item);
      }
      let total = 0;
      state.items.map(
        (item) =>
          (total +=
            (item?.discount
              ? item?.price - (item?.price * item?.discount) / 100
              : item?.price) * item?.quantity)
      );
      state.totalPrice = total;
    },
    removeFromCart: (state) => {},
    updateCart: (state, action) => {},
  },
});

export const { setItems, addToCart, removeFromCart, updateCart } =
  cartReducer.actions;

export default cartReducer.reducer;
