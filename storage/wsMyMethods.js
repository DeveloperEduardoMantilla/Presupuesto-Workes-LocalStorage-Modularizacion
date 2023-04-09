
function cargaData(data){
    return data;
}
function guardarObjeto(data){
    let dato_recolectados ={
        operacion: data.operacion,
        descripcion: data.descripcion,
        valor: data.valor
    }
    return dato_recolectados;
}


self.addEventListener('message', function(event) {
    const data = event.data;
    let result;
  
    switch (data.type) {
      case 'cargaData':
        result = cargaData(data.a);
        break;
      case 'guardarObjeto':
            result = guardarObjeto(data.a);
            break;
      default:
        result = 'Tipo de operación no válida';
    }
  
    self.postMessage(result);
});