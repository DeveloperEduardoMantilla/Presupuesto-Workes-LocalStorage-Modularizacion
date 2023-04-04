export default{
    showMethos(){
        let formulario = document.querySelector("#formData");
        let deleteStorage = document.querySelector("#deleteStorage");

        let tabla_ingresos = document.querySelector("#tabla_ingresos");
        let tabla_egresos = document.querySelector("#tabla_egresos");
        let pres_disp= document.querySelector("#presuDispo");
        let buttonDrop = document.querySelector(".buttonDrop");

        let ingresos_total = document.querySelector("#ingresosValor");

        let data = [];
        let ingresosValor=0; 
        let egresosValor=0;
        let presupuesto_Disponible =0
        let ingresosComparativo =0

        formulario.addEventListener('submit', (e) =>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))

            let arrayString =localStorage.getItem("myArray");
            let valor_actual= JSON.parse(arrayString);
            let dato_recolectados ={
                operacion: data.operacion,
                descripcion: data.descripcion,
                valor: data.valor
            }

            valor_actual.unshift(dato_recolectados);
            let array_string = JSON.stringify(valor_actual)
            localStorage.setItem("myArray", array_string)

            cargarValores([dato_recolectados])
            cargaData([dato_recolectados]);
            dropElement();
            graficos(valor_actual);
         

            Swal.fire({
            title: `Presupuesto "${dato_recolectados.descripcion}" agregado con exito!`,
            timer: 3000,
            icon: 'success',
            position: 'bottom-end',
            showConfirmButton: false,
            timerProgressBar: false,
            toast: true
            })

        })

        window.addEventListener("load", ()=>{
            let dataCargada=""
            if(localStorage.getItem("myArray")!==null){
                dataCargada= JSON.parse(localStorage.getItem("myArray"));
                cargarValores(dataCargada);
                cargaData(dataCargada);
                dropElement();
                graficos(dataCargada);
            }else{
                let miArray=[]
                localStorage.setItem('myArray', JSON.stringify(miArray));
                document.querySelector("#presuDispo").innerHTML = '$0' 
            }
        })

        function cargarValores(data){
            data.forEach((val,id)=>{
                if(val.operacion== "+"){
                    ingresosValor+=parseInt(val.valor)
                }else{
                    egresosValor=egresosValor+parseInt(val.valor)
                }
            })
        }

        function cargaData(data){
            data.forEach((val,id)=>{
                if(val.operacion== "+"){

                    tabla_ingresos.insertAdjacentHTML('beforeend',`
                    <tr>
                        <td class="dato">${val.descripcion}</td>
                        <td class="valor">$${val.valor}</td>
                        <td><button class="buttonDrop" value="${id}" id=${id}><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`)
                }else{
                    let porcentaje = ((val.valor*100)/ingresosValor)
                    tabla_egresos.insertAdjacentHTML('beforeend',`
                    <tr>
                        <td class="dato">${val.descripcion}</td>
                        <td class="valor">$${val.valor}</td>
                        <td><span class="porcentaje">${porcentaje.toFixed(1)}%</span></td>
                        <td><button class="buttonDrop" value="${id}" id="${id}"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`)
                }
            })
            presupuesto_Disponible=ingresosValor-egresosValor;
            let valorr=presupuesto_Disponible
            const precioConFormato = valorr.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});
            console.log(typeof moneda);
            document.querySelector("#presuDispo").innerHTML = `${precioConFormato}`
            document.querySelector("#ingresosValor").innerHTML = `$ ${ingresosValor}` 
            document.querySelector("#egresosValor").innerHTML = `$ ${egresosValor}` 
            let porcentajeEgreso=0;
            
            porcentajeEgreso = ((egresosValor*100)/ingresosValor);
            document.querySelector("#porcentajeEgreso").innerHTML= `${porcentajeEgreso.toFixed(1)}%`
        }

        deleteStorage.addEventListener('click',()=>{
            localStorage.clear();
            location.reload();
        })

        function dropElement(){
            let elementos = document.querySelectorAll(".buttonDrop");
            let dataAct = localStorage.getItem("myArray");

            elementos.forEach(element =>{
                    element.addEventListener('click', (event)=>{
                        let dataCargada= JSON.parse(localStorage.getItem("myArray"));    
                        dataCargada.splice(element.value, 1); 
                        let dataupdate = JSON.stringify(dataCargada);
                        localStorage.setItem("myArray", dataupdate);
                        location.reload()
                })
            })
        }

        function graficos(localSt){
        let arrayData1=[]
        let arrayValores=[]
        localSt.forEach(elem=>{
            let res="";
            if(elem.operacion=="+"){
                res= elem.descripcion+" / Ingreso"
                arrayData1.unshift(res)
                arrayValores.unshift(elem.valor)
            }else{
                res= elem.descripcion+" / Egreso"
                arrayData1.unshift(res)
                arrayValores.unshift(elem.valor)
            }
            
        })
        var grafico = document.getElementById('grafico');
        var myChart = echarts.init(grafico);
        var options = {
        xAxis: {
            type: 'category',
            data: arrayData1
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: arrayValores,
            type: 'bar',
            color: ["#283747"]
        }]
        };
        myChart.setOption(options);
        }    
    }
}