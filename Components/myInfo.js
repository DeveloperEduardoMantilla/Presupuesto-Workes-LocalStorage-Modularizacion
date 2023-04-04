export default{
    showMyInfo(){
        let data = 
        `
        <div class="col-12 box1">
                    <h6>Presupuesto Disponible</h6>
                    <h1 id="presuDispo"></h1>
                    <div class="caja_ingresos mt-1 col-12 pt-1 pb-1 d-flex justify-content-around text-light">
                        <tr class="d-flex justify-content-center align-items-center">
                            <td>
                                <h5>INGRESOS</h5>
                            </td>
                            <td>
                                <h4 id="ingresosValor"></h4>
                            </td>
                        </tr>
                    </div>
                    <div class="caja_egresos mt-1 col-12 pt-1 pb-1 d-flex justify-content-around text-light">
                        <tr class="d-flex justify-content-center align-items-center">
                            <td>
                                <h5 class="m-0 p-0">EGRESOS</h5>
                            </td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <h4 id="egresosValor" class="m-0 p-0"></h4>
                                    <h3 class="porcentajeEntrada" id="porcentajeEgreso"></h3>
                                </div>
                            </td>
                        </tr>
                    </div>
                    <div class="col-12 mt-3">
                        <form id="formData" onsubmit="event.preventDefault();">
                            <div class="row">
                                <div class="col col-3">
                                    <select class="form-select" name="operacion">
                                        <option>+</option>
                                        <option>-</option>
                                    </select>
                                </div>
                                <div class="col col-9">
                                    <input type="number" class="form-control" name="valor" required>
                                </div>
                            </div>
                            <div class="mb-3 mt-2">
                                <input type="text" class="form-control" name="descripcion" required>
                            </div>
                            <button class="btn"><i class="fa-solid fa-circle-check btn-formulario"></i></button>
                            <button type="button" class="btn-remove" id="deleteStorage"><i class="fa-solid fa-trash"></i></button>
                        </form>
                    </div>
                </div>
        `;
        document.querySelector("#box1").insertAdjacentHTML("beforeend",data);
    }
}