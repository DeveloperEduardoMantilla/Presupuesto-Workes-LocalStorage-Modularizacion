export default{
    showMyGrafics(){
        let data= 
        `
        <h1>Grafico</h1>
        <div id="grafico" style="width: 600px;height:400px;"></div>
        `;
        document.querySelector("#graficos").insertAdjacentHTML("beforeend",data);
    }
}