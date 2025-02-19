import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"

type Pizza = {
   id: string
   title: string
   price: number
   imageUrl: string
   sizes: number[]
   types: number[]
}

export enum Status {
   LOADING = "loading",
   SUCCESS = "success",
   ERROR = "error",
}

interface PizzaSliceState {
   items: Pizza[]
   status: Status
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, // loading | success | error
}

export type SearchPizzaParams = {
   sortBy: string
   order: string
   category: string
   currentPage: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
   "pizza/fetchPizzasStatus",
   async (params) => {
      const { sortBy, order, category, currentPage } = params
      const { data } = await axios.get<Pizza[]>(
         `https://6764787b52b2a7619f5cae9d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
      )
      return data
   }
)

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
         })
         .addCase(
            fetchPizzas.fulfilled,
            (state, action: PayloadAction<Pizza[]>) => {
               state.items = action.payload
               state.status = Status.SUCCESS
            }
         )
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
         })
   },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
