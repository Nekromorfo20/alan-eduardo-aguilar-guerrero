
const TableQuote = ({ title, name, company, email, phone, street, number, district, city, state, country, postalCode, reference}) => {
  return (
    <>
        <h5>{title}</h5>
        <table className="table mt-4 text-start">
            <tbody>
                <tr>
                    <th>Nombre usuario:</th>
                    <td>{name}</td>
                </tr>
                <tr>
                    <th>Nombre compañia:</th>
                    <td>{company}</td>
                </tr>
                <tr>
                    <th>Correo electronico:</th>
                    <td>{email}</td>
                </tr>
                <tr>
                    <th>Teléfono:</th>
                    <td>{phone}</td>
                </tr>
                <tr>
                    <th>Dirección:</th>
                    <td>{`${street} ${number}, ${district}, C.P. ${postalCode}, ${city}, ${state}, ${country}`}</td>
                </tr>
                <tr>
                    <th>Referencia:</th>
                    <td>{reference}</td>
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default TableQuote