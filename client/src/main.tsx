import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ProductsContextProvider } from "./context/ProductContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </StrictMode>
)
