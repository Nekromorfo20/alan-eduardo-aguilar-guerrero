import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { getProductsService, shippingQuoteService, shippingGenerateService } from "../services"

const ShippingView = () => {
    const location = useLocation()
    const token = `${import.meta.env.VITE_API_TOKEN}`

    const [quoteCompleted, setquoteCompleted] = useState(false)
    const [shipmentCompleted, setShipmentCompleted] = useState(false)

    const [quote, setQuote] = useState({
      originName: "oscar mx",
      originCompany: "envia",
      originEmail: "noreply@envia.com",
      originPhone: "8116300800",
      originStreet: "av vasconcelos",
      originNumber: "1400",
      originDistrict: "mirasierra",
      originCity: "Monterrey",
      originState: "NL",
      originCountry: "MX",
      originPostalCode: "66236",
      originReference: "",

      destinyName: "oscar",
      destinyCompany: "empresa",
      destinyEmail: "noreply@envia.com",
      destinyPhone: "8116300800",
      destinyStreet: "av vasconcelos",
      destinyNumber: "1400",
      destinyDistrict: "palo blanco",
      destinyCity: "monterrey",
      destinyState: "NL",
      destinyCountry: "MX",
      destinyPostalCode: "66240",
      destinyReference: "",

      packageContent: "",
      packageAmount: 1,
      packageType: "box",
      packageWeiht: 10,
      packageLength: 0,
      packageWidth: 0,
      packageHeight: 0,

      shipmentCarrier: "dhl",
      shipmentService: "express",
      shipmentComments: "Ninguno"
    })

    const [shipment, setShipment] = useState({
      carrier: "",
      service: "",
      serviceDescription: "",
      deliveryEstimate: "",
      deliveryDateDate: "",
      deliveryDateTime: "",
      quantity: "",
      basePrice: "",
      totalPrice: "",
      currency: ""
    })

    const [resume, setResume] = useState({
      carrier: "",
      service: "",
      trackingNumber: "",
      trackUrl: "",
      label: "",
      totalPrice: 0
    })

    const loadProductInfo = async () => {
      let id = Number(location.pathname.replace(/\D/g, ""))

      const result = await getProductsService(id, token)
        if (result?.data?.statusCode == 200) {
            const res = result.data.data[0]
          setQuote({
            ...quote,
            packageContent: res.name,
            packageLength: res.length,
            packageWidth: res.width,
            packageHeight: res.height
          })

      } else {
          console.log('¡Cannot find the product with the id provided!')
          goTo("/")
      }
    }

    const handleChangeForm = (e) => {
      setQuote({
        ...quote,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmitQuote = async (e) => {
      e.preventDefault()
      const quoteInfo = {
        originName: quote.originName,
        originCompany: quote.originCompany,
        originEmail: quote.originEmail,
        originPhone: quote.originPhone,
        originStreet: quote.originStreet,
        originNumber: quote.originNumber,
        originDistrict: quote.originDistrict,
        originCity: quote.originCity,
        originState: quote.originState,
        originCountry: quote.originCountry,
        originPostalCode: quote.originPostalCode,
        originReference: quote.originReference,

        destinyName: quote.destinyName,
        destinyCompany: quote.destinyCompany,
        destinyEmail: quote.destinyEmail,
        destinyPhone: quote.destinyPhone,
        destinyStreet: quote.destinyStreet,
        destinyNumber: quote.destinyNumber,
        destinyDistrict: quote.destinyDistrict,
        destinyCity: quote.destinyCity,
        destinyState: quote.destinyState,
        destinyCountry: quote.destinyCountry,
        destinyPostalCode: quote.destinyPostalCode,
        destinyReference: quote.destinyReference,

        packageContent: quote.packageContent,
        packageAmount:quote.packageAmount,
        packageType: quote.packageType,
        packageWeiht:quote.packageWeiht,
        packageLength:quote.packageLength,
        packageWidth:quote.packageWidth,
        packageHeight:quote.packageHeight,

        shipmentCarrier: quote.shipmentCarrier,
        shipmentService: quote.shipmentService,
        shipmentComments: quote.shipmentComments
      }

      const result = await shippingQuoteService(quoteInfo)
      if (result?.data?.data) {
        const res = result?.data?.data[0]
        setquoteCompleted(true)
        setShipment({
            ...shipment,
            carrier: res.carrier,
            service: res.service,
            serviceDescription: res.serviceDescription,
            deliveryEstimate: res.deliveryEstimate,
            deliveryDateDate: res.deliveryDate.date,
            deliveryDateTime: res.deliveryDate.time,
            quantity: res.quantity,
            basePrice: res.basePrice,
            totalPrice: res.totalPrice,
            currency: res.currency
        })
      }
    }

    const handleSubmitShipment = async (e) => {
        e.preventDefault()
        const result = await shippingGenerateService(quote)
        if (result?.data?.data) {
            const res = result?.data?.data[0]
            setShipmentCompleted(true)
            setResume({
                ...resume,
                carrier: res.carrier,
                service: res.service,
                trackingNumber: res.trackingNumber,
                trackUrl: res.trackUrl,
                label: res.label,
                totalPrice: res.totalPrice
            })
      } else {
          console.log('¡Cannot find the product with the id provided!')
      }
    }

    useEffect(() => {
      loadProductInfo()
  }, [])

  return (
    <div>
        <div className="row d-flex justify-content-center align-items-center h-100">
            {quoteCompleted && shipmentCompleted ? (
                <>
                    <h5>Envio realizado</h5>
                    <table className="table mt-4">
                        <tbody>
                            <tr>
                                <th>Empresa transportista:</th>
                                <td>{resume.carrier}</td>
                            </tr>
                            <tr>
                                <th>Servicio:</th>
                                <td>{resume.service}</td>
                            </tr>
                            <tr>
                                <th>Número de rastreo:</th>
                                <td>{resume.trackingNumber}</td>
                            </tr>
                            <tr>
                                <th>URL de rastreo:</th>
                                <td><a target="_blank" href={resume.trackUrl}>{resume.trackUrl}</a></td>
                            </tr>
                            <tr>
                                <th>Etiqueta generada:</th>
                                <td><a target="_blank" href={resume.label}>{resume.label}</a></td>
                            </tr>
                            <tr>
                                <th>Precio total:</th>
                                <td>{resume.totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-secondary" to="/">Regresar</Link>
                    </div>
                </>
            ) : quoteCompleted && !shipmentCompleted ? (
                <>
                    <form
                        onSubmit={handleSubmitShipment}
                    >
                        <h5>Información de origen</h5>
                        <table className="table mt-4">
                            <tbody>
                                <tr>
                                    <th>Nombre usuario:</th>
                                    <td>{quote.originName}</td>
                                </tr>
                                <tr>
                                    <th>Nombre compañia:</th>
                                    <td>{quote.originCompany}</td>
                                </tr>
                                <tr>
                                    <th>Correo electronico:</th>
                                    <td>{quote.originEmail}</td>
                                </tr>
                                <tr>
                                    <th>Teléfono:</th>
                                    <td>{quote.originPhone}</td>
                                </tr>
                                <tr>
                                    <th>Dirección:</th>
                                    <td>{`${quote.originStreet} ${quote.originNumber}, ${quote.originDistrict}, ${quote.originCity}, ${quote.originState}, ${quote.originCountry}, ${quote.originPostalCode}`}</td>
                                </tr>
                                <tr>
                                    <th>Referencia:</th>
                                    <td>{quote.originReference}</td>
                                </tr>
                            </tbody>
                        </table>

                        <hr className="hr mb-3" />

                        <h5>Información de destino</h5>
                        <table className="table mt-4">
                            <tbody>
                                <tr>
                                    <th>Nombre usuario:</th>
                                    <td>{quote.destinyName}</td>
                                </tr>
                                <tr>
                                    <th>Nombre compañia:</th>
                                    <td>{quote.destinyCompany}</td>
                                </tr>
                                <tr>
                                    <th>Correo electronico:</th>
                                    <td>{quote.destinyEmail}</td>
                                </tr>
                                <tr>
                                    <th>Teléfono:</th>
                                    <td>{quote.destinyPhone}</td>
                                </tr>
                                <tr>
                                    <th>Dirección:</th>
                                    <td>{`${quote.destinyStreet} ${quote.destinyNumber}, ${quote.destinyDistrict}, ${quote.destinyCity}, ${quote.destinyState}, ${quote.destinyCountry}, ${quote.destinyPostalCode}`}</td>
                                </tr>
                                <tr>
                                    <th>Referencia:</th>
                                    <td>{quote.destinyReference}</td>
                                </tr>
                            </tbody>
                        </table>

                        <hr className="hr mb-3" />

                        <h5>Información de envio</h5>
                        <table className="table mt-4">
                            <tbody>
                                <tr>
                                    <th>Empresa transportista</th>
                                    <td>{shipment.carrier}</td>
                                </tr>
                                <tr>
                                    <th>Tipo de servicio:</th>
                                    <td>{shipment.service}</td>
                                </tr>
                                <tr>
                                    <th>Descripción del servicio:</th>
                                    <td>{shipment.serviceDescription}</td>
                                </tr>
                                <tr>
                                    <th>Llegada estimada:</th>
                                    <td>{shipment.deliveryEstimate}</td>
                                </tr>
                                <tr>
                                    <th>Fecha de llegada estimada:</th>
                                    <td>{shipment.deliveryDateDate}</td>
                                </tr>
                                <tr>
                                    <th>Hora de llegada estimada:</th>
                                    <td>{shipment.deliveryDateTime}</td>
                                </tr>
                                <tr>
                                    <th>Cantidad enviada:</th>
                                    <td>{shipment.quantity}</td>
                                </tr>
                                <tr>
                                    <th>Precio base estimado:</th>
                                    <td>{`$${shipment.basePrice} ${shipment.currency}`}</td>
                                </tr>
                                <tr>
                                    <th>Precio total estimado:</th>
                                    <td>{`$${shipment.totalPrice} ${shipment.currency}`}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-secondary" to="/">Regresar</Link>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Generar envio"
                            />
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h2>GENERAR COTIZACIÓN:</h2>
                    <hr className="hr mb-5" />

                    <form
                        onSubmit={handleSubmitQuote}
                    >
                        <h2>DATOS DE ORIGEN</h2>
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
                            <input id="originState" name="originState" type="text" className="form-control" placeholder="Ingrese el estado de origen del envio" value={quote.originState} onChange={handleChangeForm} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="originCountry" className="form-label">Pais:</label>
                            <input id="originCountry" name="originCountry" type="text" className="form-control" placeholder="Ingrese el pais origen del envio" value={quote.originCountry} onChange={handleChangeForm} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="originPostalCode" className="form-label">Código Postal:</label>
                            <input id="originPostalCode" name="originPostalCode" type="text" className="form-control" placeholder="Ingrese el código postal origen del envio" value={quote.originPostalCode} onChange={handleChangeForm} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="originReference" className="form-label">Referencia:</label>
                            <input id="originReference" name="originReference" type="text" className="form-control" placeholder="Ingrese alguna referencia del envio" value={quote.originReference} onChange={handleChangeForm} />
                        </div>

                        <h2>DATOS DE DESTINO</h2>
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
                            <input id="destinyState" name="destinyState" type="text" className="form-control" placeholder="Ingrese el estado de destino del envio" value={quote.destinyState} onChange={handleChangeForm} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="destinyCountry" className="form-label">Pais:</label>
                            <input id="destinyCountry" name="destinyCountry" type="text" className="form-control" placeholder="Ingrese el pais destino del envio" value={quote.destinyCountry} onChange={handleChangeForm} />
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
                            <input id="packageType" name="packageType" type="text" className="form-control" placeholder="Tipo de paquete" value={quote.packageType} onChange={handleChangeForm} />
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

                        <h2>INFORMACIÓN DE TRANSPORTADOR</h2>
                        <div className="mb-3">
                            <label htmlFor="shipmentCarrier" className="form-label">Empresa transportadora:</label>
                            <input id="shipmentCarrier" name="shipmentCarrier" type="text" className="form-control" placeholder="Nombre de empresa transportadora" value={quote.shipmentCarrier} onChange={handleChangeForm} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shipmentService" className="form-label">Tipo de servicio de transporte:</label>
                            <input id="shipmentService" name="shipmentService" type="text" className="form-control" placeholder="Tipo de servicio de transporte" value={quote.shipmentService} onChange={handleChangeForm} />
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
            )}
      </div>
    </div>
  )
}

export default ShippingView