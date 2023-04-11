export default{

    showMyTables(){

        let data = `
        <div class="col-12 col-sm-12 ingresos">
            <h3>Ingresos</h3>
            <table class="table table-striped">
                <tbody id="tabla_ingresos">
                </tbody>
            </table>
        </div>
        <div class="col-12 mt-5 egresos">
            <h3>Egresos</h3>
            <table class="table table-striped">
                <tbody id="tabla_egresos">
                </tbody>
            </table>
            <button class="btn btn-danger btn-sm" id="btnGenerarPdf">Generar Pdf</button>
        </div>`;

        document.querySelector("#tablesData").insertAdjacentHTML("beforeend",data);
    }
}