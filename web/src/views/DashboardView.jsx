import { useState, useEffect } from 'react'
import { getProductsService } from "../services"
import ListProducts from "../components/ListProducts"

const DashboardView = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const token = `${import.meta.env.VITE_API_TOKEN}`
        const result = await getProductsService(null, token)
        setProducts(result?.data?.data)
    }

    // Cargar productos iniciales
    useEffect(() => {
        getProducts()
    }, [])

  return (
    <div>
        <h1>Lista de productos</h1>
        <hr className="hr mb-5" />
        <ListProducts
            products={products}
        />
        
    </div>
  )
}

export default DashboardView