import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

const DashboardView = lazy(() => import("./views/DashboardView"))
const ShippingView = lazy(() => import("./views/ShippingView"))

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

              <Route path="/" index element={
                  <Suspense fallback="Cargando...">
                      <DashboardView />
                  </Suspense>
              } />

              <Route path="/shipping/:id" element={
                <Suspense fallback="Cargando...">
                    <ShippingView />
                </Suspense>
              } />

           </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter