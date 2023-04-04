export default{
    showBody(){
        let data = 
        `
        <div class="col-12 row mt-5 d-flex justify-content-around align-items-center f-wrap">
            <div id="box1" class="col-12 col-md-6 col-lg-4 text-center h-100 d-flex flex-column  align-items-center justify-content-center"></div>
            <div id="tablesData" class="col-12 col-md-6 col-lg-5 d-flex flex-column align-items-center justify-content-center"></div>
            <div id="graficos" class="col-12 d-flex flex-column justify-content-center align-items-center grafico"></div>
        </div>
        `;
        document.querySelector("#body").insertAdjacentHTML("beforeend",data);
    }
}