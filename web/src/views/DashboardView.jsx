import { useState, useEffect } from 'react'
import { getProductsService, getSessionTokenService } from "../services"
import ListProducts from "../components/ListProducts"

const DashboardView = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getInitialData = async () => {
            const resultToken = await getSessionTokenService()
            const { name, phone, img_profile, token} = resultToken?.data?.data
            const user = {
                name,
                phone,
                img_profile
            }
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user", JSON.stringify(user))
            
            const resultProducts = await getProductsService(null, token)
            setProducts(resultProducts?.data?.data)
        }

        getInitialData()
    }, [])

  return (
    <div className='container'>
        <h1>Lista de productos</h1>
        <hr className="hr mb-5" />
        <ListProducts
            products={products}
        />
        
    </div>
  )
}

export default DashboardView