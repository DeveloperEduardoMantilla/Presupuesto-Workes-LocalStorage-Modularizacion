export default{
    showMyGrafics(){
        let data= 
        `
        <h1>Grafico</h1>
        <div id="grafico"></div>
        `;
        document.querySelector("#graficos").insertAdjacentHTML("beforeend",data);
    }
}