const tableBody = document.getElementById("tableBody")
const id = document.getElementById("txtId")
const messageText = document.getElementById("txtMessageText")

function obtenerMessage(){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items
        datos.forEach(element => {
            tableBody.innerHTML += `

            <tr>
                <td>${element.id}</td>
                <td>${element.messagetext}</td>
                <td><button class="btn btn-info" onclick="obtenerPorIdMessage(${element.id})>Detalles</button></td>
                <td><button>Eliminar</button></td>
            </tr>
            `
        
        });
    })
    .catch(error => console.log('error', error));

}
function crearMessage(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "messageText": "El carro solicitado no es el adquirido"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
    
    .then(response => {
        if(response.status == 201){
            location.reload()
        }else{
            alert("Error al agregar mensaje")
        }
        
    })
    .catch(error => console.log('error', error));

}
function actualizarMessage(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "id": id.value,
    "messageText": "El carro solicitado fue adquirido"
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.status == 201){
        alert("Se modificó el mensaje")
    }else{
        alert("no se modificó el mensaje")

    }
    
  })
  .catch(error => console.log('error', error));

}
function eliminarMessage(){

    var myHeaders = new Headers();
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

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message", requestOptions)
    .then(response => response.json())
    .then(result => {
            if(response.status == 204){
            alert("Se eliminó el mensaje")
        }else{
            alert("no se pudo eliminar el mensaje")
        }
    })
    .catch(error => console.log('error', error));

}
function obtenerPorIdMessage(idUrl){

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var raw = "";

    var requestOptions = {
    method: 'GET',
    body: raw,
    redirect: 'follow'
    };

    fetch("https://g42644ab66fd251-u9bp01khm58jlzzn.adb.us-chicago-1.oraclecloudapps.com/ords/admin/message/message/${idUrl}", requestOptions)
    .then(response => response.json())
    .then(result => {
        const datos = result.items[0]
         id.value = datos.id
         messageText.value = datos.messageText
    })
    .catch(error => console.log('error', error));
        
}
obtenerMessage()
