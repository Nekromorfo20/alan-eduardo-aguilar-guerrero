import { Outlet } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header"

const Layout = () => {

  return (
    <>
        <Header />
        <main className="container m-5">
            <Outlet />
        </main>
    </>
  )
}

export default Layout