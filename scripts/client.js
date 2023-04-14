const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const name = document.getElementById("txtName")
const email = document.getElementById("txtEmail")
const age = document.getElementById("txtAge")

function obtenerCliente(){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
    .then(response => response.json())
    .then(result =>{
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `

            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.age}</td>
                <td><button class="btn btn-info" onclick="obtenerPorIdCliente(${element.id})">Detalles</button></td>
                <td><button>Eliminar</button></td>
            </tr>
            `
            
        });

    })
    .catch(error => console.log('error', error));

}
function crearCliente(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "name": name.value,
    "email": email.value,
    "age": age.value
    });
      
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };  
        
    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
    
    .then(response => {
        if(response.status == 201){
            location.reload()
        }else{
            alert("Error al agregar cliente")
        }
    })
    .catch(error => console.log('error',"error al crear nuevo cliente"));
}
function actualizarCliente(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "id": id.value,
        "name": name.value,
        "email": email.value,
        "age": age.value
      });
      
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result.status == 201){
            alert("Se modificó cliente")
        }else{
            alert("no se modificó cliente")
        }
    })
    .catch(error => console.log('error', error));

}

    
function eliminarCliente(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client", requestOptions)
    .then(response => response.json())
    .then(result => {
        if(response.status == 204){
        alert("Se eliminó cliente")
    }else{
        alert("no se eliminó cliente")
    }

    })
    .catch(error => console.log('error', error));
    
}
function obtenerPorIdCliente(idUrl){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    

    var raw = "";

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/client/client/${idUrl}", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
         id.value = datos.id
         name.value = datos.name
         email.value = datos.email
         age.value = datos.age
    })
    .catch(error => console.log('error', error));
   
}
    

obtenerCliente()