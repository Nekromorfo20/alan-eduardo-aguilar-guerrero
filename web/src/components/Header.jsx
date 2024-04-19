import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className='p-3 bg-primary text-white d-flex justify-content-between align-items-center'>
      <div>
        <Link to={"/"}>
          <img src="logo-tendencys.svg" width={300} height="auto" />
        </Link>
      </div>
      <div className='text-center'>
        <img src="imagen-perfil.jpeg" style={{ borderRadius: "50%" }}  width={100} height="auto" />
          <h4>Alan Eduardo Aguilar Guerrero</h4>
      </div>
    </header>
  )
}

export default Header