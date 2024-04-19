import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const ListProducts = ({ products }) => {
    const goTo = useNavigate()

    const showSwal = (product) => {
        Swal.fire({
            title: "<h1>Detalle de producto</h1>",
            html: `
                <table className="table mt-4">
                    <tbody>
                        <tr>
                            <th>Nombre:</th>
                            <td>${product.name}</td>
                        </tr>
                        <tr>
                            <th>Descripción:</th>
                            <td>${product.description}</td>
                        </tr>
                        <tr>
                            <th>Nombre:</th>
                            <td>${product.name}</td>
                        </tr>
                        <tr>
                            <th>Altura:</th>
                            <td>${product.height}</td>
                        </tr>
                        <tr>
                            <th>Longitud:</th>
                            <td>${product.length}</td>
                        </tr>
                        <tr>
                            <th>Anchura:</th>
                            <td>${product.width}</td>
                        </tr>
                    </tbody>
                </table>
            `,
            imageUrl: "/pato.png",
            imageWidth: 412,
            imageHeight: 412,
            imageAlt: "Imagen pato",
            showCancelButton: true,
            confirmButtonText: "Enviar producto",
            confirmButtonColor: "#28A745",
            showCancelButton: true,
            cancelButtonColor: "#6E7881",
            cancelButtonText: "Cerrar",
          }).then((result) => {
            if (result.isConfirmed) goTo(`/shipping/${product.id}`)
          })
    }

    return (
        <div className="row mt-3">
            <div className="col">
                <div className="card-group">
                    {products.map((product) => (
                        <div
                            className="card"
                            key={product.id}
                        >
                            <img src="/pato.png" className="card-img-top" alt="Imagen pato" />
                            <div className="card-body">
                                <h1 className="card-title">{product.name}</h1>
                                <p className="card-text">{product.description}</p>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block"
                                    onClick={() => showSwal(product)}
                                >Ver detalle</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/*
<table className="table mt-4">
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Altura</th>
            <th scope="col">Longitud</th>
            <th scope="col">Anchura</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.height}</td>
            <td>${product.length}</td>
            <td>${product.width}</td>
        </tr>
    </tbody>
</table>
*/

export default ListProducts