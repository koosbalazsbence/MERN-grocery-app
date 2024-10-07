// Define the shape of the workout and state
export interface Product {
  _id: string
  createdAt: string
  image: string
  title: string
  price: number
  description: string
  category: string
}

export interface State {
  products: Product[] | null
}

export type Action =
  | { type: "SET_PRDOUCTS"; payload: Product[] }
  | { type: "CREATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: Product }

// Workouts reducer function
export const productsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRDOUCTS":
      return {
        products: action.payload,
      }
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...(state.products || [])],
      }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products:
          state.products === null
            ? null
            : state.products.filter(
                (product) => product._id !== action.payload._id
              ),
      }
    default:
      return state
  }
}
