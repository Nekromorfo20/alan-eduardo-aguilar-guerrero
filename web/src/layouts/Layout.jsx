import { Outlet } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import 'sweetalert2/src/sweetalert2.scss'
import Header from "../components/Header"

const Layout = () => {

  return (
    <>
        <Header />
        <main className="m-5">
            <Outlet />
        </main>
    </>
  )
}

export default Layout