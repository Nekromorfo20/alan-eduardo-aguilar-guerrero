
const TableOrderCompleted = ({ title, carrier, service, trackingNumber, trackUrl, label, totalPrice}) => {
    return (
      <>
        <h5>{title}</h5>
        <table className="table mt-4 text-start">
            <tbody>
                <tr>
                    <th>Empresa transportista:</th>
                    <td>{carrier}</td>
                </tr>
                <tr>
                    <th>Servicio:</th>
                    <td>{service}</td>
                </tr>
                <tr>
                    <th>Número de rastreo:</th>
                    <td>{trackingNumber}</td>
                </tr>
                <tr>
                    <th>URL de rastreo:</th>
                    <td><a target="_blank" href={trackUrl}>{trackUrl}</a></td>
                </tr>
                <tr>
                    <th>Etiqueta generada:</th>
                    <td><a target="_blank" href={label}>{label}</a></td>
                </tr>
                <tr>
                    <th>Precio total:</th>
                    <td>{totalPrice}</td>
                </tr>
            </tbody>
        </table>
      </>
    )
  }
  
export default TableOrderCompleted