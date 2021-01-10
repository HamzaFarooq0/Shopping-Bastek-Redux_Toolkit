import { createSlice, configureStore } from "@reduxjs/toolkit"
import { ProductItem } from "../types/global";
import { INITIAL_STATE } from "./state";

const basketSlice = createSlice({
  name: "basket",
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) => {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return {
          ...item,
          quantity: item.quantity + 1,
          added: true
        }
      })
    },
    remove: (state, action) => {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        if (item.quantity <= 0){
          return {
            ...item,
            added: false
          }
        }
       
        return {
          ...item,
          quantity: item.quantity - 1
        }
      })
    }
  }
})

const store = configureStore({ reducer: basketSlice.reducer })

export const { add, remove } = basketSlice.actions;
export const products = (state: ProductItem[] )=> state;

export { basketSlice, store }
