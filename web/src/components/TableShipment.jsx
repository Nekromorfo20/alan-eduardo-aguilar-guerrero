
const TableShipment = ({ title, carrier, service, serviceDescription, deliveryEstimate, deliveryDateDate, deliveryDateTime, quantity, basePrice, totalPrice, currency}) => {
  return (
    <>
        <h5>{title}</h5>
        <table className="table mt-4 text-start">
            <tbody>
                <tr>
                    <th>Empresa transportista</th>
                    <td>{carrier}</td>
                </tr>
                <tr>
                    <th>Tipo de servicio:</th>
                    <td>{service}</td>
                </tr>
                <tr>
                    <th>Descripción del servicio:</th>
                    <td>{serviceDescription}</td>
                </tr>
                <tr>
                    <th>Llegada estimada:</th>
                    <td>{deliveryEstimate}</td>
                </tr>
                <tr>
                    <th>Fecha de llegada estimada:</th>
                    <td>{deliveryDateDate}</td>
                </tr>
                <tr>
                    <th>Hora de llegada estimada:</th>
                    <td>{deliveryDateTime}</td>
                </tr>
                <tr>
                    <th>Cantidad enviada:</th>
                    <td>{quantity}</td>
                </tr>
                <tr>
                    <th>Precio base estimado:</th>
                    <td>{`$${basePrice} ${currency}`}</td>
                </tr>
                <tr>
                    <th>Precio total estimado:</th>
                    <td>{`$${totalPrice} ${currency}`}</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default TableShipment