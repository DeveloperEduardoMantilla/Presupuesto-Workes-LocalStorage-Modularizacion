export default{
    

    showMethos(){
        let formulario = document.querySelector("#formData");
        let deleteStorage = document.querySelector("#deleteStorage");
        let tabla_ingresos = document.querySelector("#tabla_ingresos");
        let tabla_egresos = document.querySelector("#tabla_egresos");
        let botonDrop = document.querySelectorAll(".buttonDrop");
        let data = [];
        let ingresosValor=0; 
        let egresosValor=0;
        let presupuesto_Disponible =0
        let ingresosComparativo =0

        //Creacion de mi worker de methodos
        const  worker = new Worker('./storage/wsMyMethods.js')

        formulario.addEventListener('submit', (e) =>{
            
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))

            let valor_actual= JSON.parse(localStorage.getItem("myArray"));

            worker.postMessage({type: 'guardarObjeto', a: data});

            worker.onmessage = function(event) {
                valor_actual.unshift(event.data);
                let array_string = JSON.stringify(valor_actual)
                localStorage.setItem("myArray", array_string)
                
                cargarValores([event.data])
                cargaData([event.data]);
                dropElement();
                graficos(valor_actual);
 
                Swal.fire({
                title: `Presupuesto "${event.data.descripcion}" agregado con exito!`,
                timer: 3000,
                icon: 'success',
                position: 'bottom-end',
                showConfirmButton: false,
                timerProgressBar: false,
                toast: true
                })
            };
            formulario.reset();
        })


        window.addEventListener("load", ()=>{
            let dataLocal=JSON.parse(localStorage.getItem("myArray"));        
            let dataCargada=""

            if(dataLocal!==null){
                dataCargada= JSON.parse(localStorage.getItem("myArray"));
                worker.postMessage({type: 'cargaData', a: dataLocal});
                worker.onmessage = function(event) {
                    cargarValores(event.data);
                    cargaData(event.data);
                    dropElement();
                    graficos(event.data);
                };
            }else{
                let miArray=[]
                localStorage.setItem('myArray', JSON.stringify(data));
                document.querySelector("#presuDispo").innerHTML = '$0' 
            }
        })

        function cargarValores(data){
            if(data){
            data.forEach((val,id)=>{
                if(val.operacion== "+"){
                    ingresosValor+=parseInt(val.valor)
                }else{
                    egresosValor=egresosValor+parseInt(val.valor)
                }
            })
            }else{
                ingresosValor=0;
                egresosValor=0;
            }
        }

        function cargaData(data){
            if(data){
            
            tabla_egresos.innerHTML="";
            tabla_ingresos.innerHTML="";
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
            document.querySelector("#presuDispo").innerHTML = `${precioConFormato}`
            document.querySelector("#ingresosValor").innerHTML = `$ ${ingresosValor}` 
            document.querySelector("#egresosValor").innerHTML = `$ ${egresosValor}` 
            let porcentajeEgreso=0;

            if(ingresosValor>0){
            porcentajeEgreso = ((egresosValor*100)/ingresosValor);
            document.querySelector("#porcentajeEgreso").innerHTML= `${porcentajeEgreso.toFixed(1)}%`
            }else{
                document.querySelector("#porcentajeEgreso").innerHTML= 0;
            }
            }else{
                tabla_ingresos.innerHTML="";
                tabla_egresos.innerHTML="";
                document.querySelector("#grafico").innerHTML="";
                document.querySelector("#presuDispo").innerHTML = 0
                document.querySelector("#ingresosValor").innerHTML = 0
                document.querySelector("#egresosValor").innerHTML = 0  
                document.querySelector("#porcentajeEgreso").innerHTML= 0
            }
        }

        deleteStorage.addEventListener('click',()=>{
            localStorage.clear();
            cargaData(null);
            data=[]
            localStorage.setItem('myArray', JSON.stringify(data));  
            cargarValores(null)      
        })

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
        
        window.jsPDF = window.jspdf.jsPDF;

        document.querySelector("#btnGenerarPdf").addEventListener("click", function(){
            var pdf = new jsPDF();
            let dataArry=[]

            pdf.addImage('./Assets/img/logo-campus.png', 10, 10, 40, 40);
            pdf.setFontSize(18);
            pdf.text('Sistema de Presupuesto, The end of the backend 3.0', 50, 30);
            var columns = ["Operacion", "Descripcion", "Valor"];

            let dataLocal= JSON.parse(localStorage.getItem("myArray"));
            let data=[]

            dataLocal.forEach((index,key)=>{
                data.unshift(Object.values(dataLocal[key]));
            })

            pdf.autoTable(columns,data,
                { margin:{ top: 50 }}
            );
                
            pdf.save('mipdf.pdf');
        })
        
        
        function dropElement(){
            let elementos = document.querySelectorAll(".buttonDrop");

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
        
    }
}