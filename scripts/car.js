const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const brand = document.getElementById("txtBrand")
const model = document.getElementById("txtModel")
const category_id = document.getElementById("txtCategory_id")   

function crearCar(){
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "brand": brand.value,
    "model": model.value,
    "category_id": category_id.value
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    
    .then(response => {
        if(response.status == 201){
            location.reload()
        }else{
            alert("Error al agregar car")
        }
    })
    .catch(error => console.log('error',"error al crear nuevo carro"));
}
    

function obtenerCar(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    .then(response => response.json())
    .then(result  =>{
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `

            <tr>
                <td>${element.id}</td>
                <td>${element.brand}</td>
                <td>${element.model}</td>
                <td>${element.category_id}</td>
                <td><button class="btn btn-info" onclick="obtenerPorIdCar(${element.id})>Detalles</button></td>
                <td><button>Eliminar</button></td>
            </tr>
            `
        
        });
    })
  .catch(error => console.log('error', error ));
    
}
function actualizarCar(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "brand": brand.value,
    "model": model.value,
    "category_id": category_id.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.status == 201){
            alert("Se modificó carro")
        }else{
            alert("no se modificó carro")
        }
    
  })
  .catch(error => console.log('error', error));

}

    
function eliminarCar(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": idCar,

    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(response.status == 204){
            alert("Se eliminó carro")
        }else{
            alert("no se eliminó carro")
        }
    })
    .catch(error => console.log('error', error));
   
    
}
function obtenerPorIdCar(idUrl){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/car/car/${idUrl}", requestOptions)
        .then(response => response.json())
        .then(result => {
            const datos = result.items[0]
            id.value = datos.id
            model.value = datos.model
            brand.value = datos.brand
            category_id.value = datos.category_id
        })
        .catch(error => console.log('error', error));
     
}

obtenerCar()