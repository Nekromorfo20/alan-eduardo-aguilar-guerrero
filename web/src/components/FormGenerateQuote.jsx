import { Link } from "react-router-dom"
import { states } from "../data/StatesData"

const FormGenerateQuote = ({ quote, handleChangeForm, handleSubmitQuote }) => {
  return (
    <>
        <h2>GENERAR COTIZACIÓN:</h2>
        <hr className="hr mb-5" />

        <form
            onSubmit={handleSubmitQuote}
        >
            <h2>DATOS ORIGEN DEL ENVIO</h2>
            <div className="mb-3">
                <label htmlFor="originName" className="form-label">Nombre usuario:</label>
                <input id="originName" name="originName" type="text" className="form-control" placeholder="Ingrese nombre del usuario" value={quote.originName} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originCompany" className="form-label">Compañia:</label>
                <input id="originCompany" name="originCompany" type="text" className="form-control" placeholder="Ingrese nombre de la compañia"  value={quote.originCompany} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originEmail" className="form-label">Correo electronico:</label>
                <input id="originEmail" name="originEmail" type="email" className="form-control" placeholder="Ingrese correo electronico del usuario" value={quote.originEmail} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originPhone" className="form-label">Teléfono:</label>
                <input id="originPhone" name="originPhone" type="text" className="form-control" placeholder="Ingrese número telefonico del usuario" value={quote.originPhone} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originStreet" className="form-label">Calle:</label>
                <input id="originStreet" name="originStreet" type="text" className="form-control" placeholder="Ingrese la calle origen del envio" value={quote.originStreet} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originNumber" className="form-label">Número:</label>
                <input id="originNumber" name="originNumber" type="text" className="form-control" placeholder="Ingrese el número de calle origen del envio" value={quote.originNumber} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originDistrict" className="form-label">Distrito:</label>
                <input id="originDistrict" name="originDistrict" type="text" className="form-control" placeholder="Ingrese el distrito origen del envio" value={quote.originDistrict} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originCity" className="form-label">Ciudad:</label>
                <input id="originCity" name="originCity" type="text" className="form-control" placeholder="Ingrese la ciudad origen del envio" value={quote.originCity} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originState" className="form-label">Estado:</label>
                <select
                    id="originState"
                    className="form-select"
                    value={quote.originState}
                    onChange={handleChangeForm}
                >
                    {states.map(state => (
                        <option
                            key={state.code_2_digits}
                            value={state.code_2_digits}
                        >{state.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="originCountry" className="form-label">Pais:</label>
                <select
                    id="originCountry"
                    className="form-select"
                    value={quote.originCountry}
                    onChange={handleChangeForm}
                >
                    <option value="MX">México</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="originPostalCode" className="form-label">Código Postal:</label>
                <input id="originPostalCode" name="originPostalCode" type="text" className="form-control" placeholder="Ingrese el código postal origen del envio" value={quote.originPostalCode} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="originReference" className="form-label">Referencia:</label>
                <input id="originReference" name="originReference" type="text" className="form-control" placeholder="Ingrese alguna referencia del envio" value={quote.originReference} onChange={handleChangeForm} />
            </div>

            <h2>DATOS DESTINO DEL ENVIO</h2>
            <div className="mb-3">
                <label htmlFor="destinyName" className="form-label">Nombre usuario:</label>
                <input id="destinyName" name="destinyName" type="text" className="form-control" placeholder="Ingrese nombre del usuario" value={quote.destinyName} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyCompany" className="form-label">Compañia:</label>
                <input id="destinyCompany" name="destinyCompany" type="text" className="form-control" placeholder="Ingrese nombre de la compañia" value={quote.destinyCompany} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyEmail" className="form-label">Correo electronico:</label>
                <input id="destinyEmail" name="destinyEmail" type="email" className="form-control" placeholder="Ingrese correo electronico del usuario" value={quote.destinyEmail} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyPhone" className="form-label">Teléfono:</label>
                <input id="destinyPhone" name="destinyPhone" type="text" className="form-control" placeholder="Ingrese número telefonico del usuario" value={quote.destinyPhone} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyStreet" className="form-label">Calle:</label>
                <input id="destinyStreet" name="destinyStreet" type="text" className="form-control" placeholder="Ingrese la calle destino del envio" value={quote.destinyStreet} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyNumber" className="form-label">Número:</label>
                <input id="destinyNumber" name="destinyNumber" type="text" className="form-control" placeholder="Ingrese el número de calle destino del envio" value={quote.destinyNumber} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyDistrict" className="form-label">Distrito:</label>
                <input id="destinyDistrict" name="destinyDistrict" type="text" className="form-control" placeholder="Ingrese el distrito destino del envio" value={quote.destinyDistrict} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyCity" className="form-label">Ciudad:</label>
                <input id="destinyCity" name="destinyCity" type="text" className="form-control" placeholder="Ingrese la ciudad destino del envio" value={quote.destinyCity} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyState" className="form-label">Estado:</label>
                <select
                    id="destinyState"
                    className="form-select"
                    value={quote.destinyState}
                    onChange={handleChangeForm}
                >
                    {states.map(state => (
                        <option
                            key={state.code_2_digits}
                            value={state.code_2_digits}
                        >{state.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="destinyCountry" className="form-label">Pais:</label>
                <select
                    id="destinyCountry"
                    className="form-select"
                    value={quote.destinyCountry}
                    onChange={handleChangeForm}
                >
                    <option value="MX">México</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="destinyPostalCode" className="form-label">Código Postal:</label>
                <input id="destinyPostalCode" name="destinyPostalCode" type="text" className="form-control" placeholder="Ingrese el código postal destino del envio" value={quote.destinyPostalCode} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="destinyReference" className="form-label">Referencia:</label>
                <input id="destinyReference" name="destinyReference" type="text" className="form-control" placeholder="Ingrese alguna referencia del envio" value={quote.destinyReference} onChange={handleChangeForm} />
            </div>

            <h2>INFORMACIÓN DEL PAQUETE</h2>
            <div className="mb-3">
                <label htmlFor="packageContent" className="form-label">Contenido:</label>
                <input id="packageContent" name="packageContent" type="text" className="form-control" placeholder="Contenido del paquete por enviar" value={quote.packageContent} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="packageAmount" className="form-label">Monto:</label>
                <input id="packageAmount" name="packageAmount" type="number" className="form-control" placeholder="Cantidad de unidades por enviar" value={quote.packageAmount} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="packageType" className="form-label">Tipo de paquete:</label>
                <select
                    id="packageType"
                    className="form-select"
                    value={quote.packageType}
                    onChange={handleChangeForm}
                >
                    <option value="box">Caja</option>
                    <option value="envelope">Sobre</option>
                    <option value="pallet">Palé</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="packageWeiht" className="form-label">Peso de paquete (Kg):</label>
                <input id="packageWeiht" name="packageWeiht" type="number" className="form-control" placeholder="Peso del paquete" value={quote.packageWeiht} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="packageLength" className="form-label">Largo del paquete (cm):</label>
                <input id="packageLength" name="packageLength" type="number" className="form-control" placeholder="Largura del paquete" value={quote.packageLength} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="packageWidth" className="form-label">Ancho del paquete (cm):</label>
                <input id="packageWidth" name="packageWidth" type="number" className="form-control" placeholder="Anchura del paquete" value={quote.packageWidth} onChange={handleChangeForm} />
            </div>
            <div className="mb-3">
                <label htmlFor="packageHeight" className="form-label">Alto del paquete (cm):</label>
                <input id="packageHeight" name="packageHeight" type="number" className="form-control" placeholder="Altura del paquete" value={quote.packageHeight} onChange={handleChangeForm} />
            </div>

            <h2>INFORMACIÓN DEL TRANSPORTADOR</h2>
            <div className="mb-3">
                <label htmlFor="shipmentCarrier" className="form-label">Empresa transportadora:</label>
                <select
                    id="shipmentCarrier"
                    className="form-select"
                    value={quote.shipmentCarrier}
                    onChange={handleChangeForm}
                >
                    <option value="dhl">DHL</option>
                    <option value="estafeta">Estafeta</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="shipmentService" className="form-label">Tipo de servicio de transporte:</label>
                <select
                    id="shipmentService"
                    className="form-select"
                    value={quote.shipmentService}
                    onChange={handleChangeForm}
                >
                    <option value="express">Express</option>
                    <option value="ground">Ground</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor='shipmentComments' className="form-label">Comentarios del envio:</label>
                <textarea className="form-control" id="shipmentComments" name="shipmentComments" rows="3" placeholder="Comentarios del envio" value={quote.shipmentComments} onChange={handleChangeForm} />
            </div>

            <div className="d-flex justify-content-between">
                <Link className="btn btn-secondary" to="/">Regresar</Link>
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Generar cotización"
                />
            </div>
        </form>
    </>
  )
}

export default FormGenerateQuote