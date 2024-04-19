import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'

const ListProducts = ({ products }) => {
    const goTo = useNavigate()

    const showSwal = (product) => {
        const image = product.id < 5 ? `/${product.id}.png` : "/4.png"

        Swal.fire({
            html: `
                <table class="table mt-4 text-start">
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
            imageUrl: image,
            imageWidth: 200,
            imageAlt: "Imagen pato",
            showCancelButton: true,
            confirmButtonText: "Comprar",
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
                            <div className="card-body text-center">
                                <h1 className="card-title">{product.name}</h1>
                                <img src={product.id < 5 ? `/${product.id}.png` : `/1.png`}  style={{ width: 150 }} alt="Imagen pato" />
                                <p className="card-text">{product.description}</p>
                                <button
                                    type="button"
                                    className="btn btn-primary"
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

export default ListProducts