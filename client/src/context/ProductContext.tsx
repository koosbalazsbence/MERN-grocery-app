import { createContext, useReducer, ReactNode, Dispatch } from "react"
import { productsReducer, State, Action } from "./productsReducer.ts" // Import from the new file

// Create the context with proper types
interface ProductsContextType extends State {
  dispatch: Dispatch<Action>
}

// Initial context value
const initialState: ProductsContextType = {
  products: null,
  dispatch: () => undefined, // placeholder dispatch, will be replaced by the real one in the provider
}

export const ProductContext = createContext<ProductsContextType>(initialState)

// Context provider with typing for children
export const ProductsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(productsReducer, { products: null })

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  )
}
