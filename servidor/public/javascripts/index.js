
$("#add").on('click', function () {
    location.href = '/user/new'
})

$.ajax('http://localhost:3000/api/users')
    .done(function (data) {
        for (var i = 0; i < data.length; i++) {
            $(".mainDivUsers").append(`
            <div class="user" id='user-${data[i].id}' data-userId='${data[i].id}'>
            
                <div class="info" id="info-div-${data[i].id}">
                    <p>Nombre: ${data[i].name}</p>
                    <p>Apellido: ${data[i].surname}</p>
                    <p>Telefono: ${data[i].phone}</p>
                    <p>E-Mail: ${data[i].mail}</p>

                    <button class="btnEdit btn">Editar</button>
                    <button class="btnDelete btn">Borrar</button>
                </div>

                <form class="edit-form" id="edit-form-${data[i].id}">
                    <p>Nombre</p>
                    <input name="name" id="nombre-${data[i].id}" type="text" value="${data[i].name}">
                    <p>Apellido</p>
                    <input name="surname" id="apellido-${data[i].id}" type="text" value="${data[i].surname}">
                    <p>Telefono</p>
                    <input name="phone" id="telefono-${data[i].id}" type="tel" value="${data[i].phone}">
                    <p>E-Mail</p>
                    <input name="mail" id="email-${data[i].id}" type="email" value="${data[i].mail}">

                    <button type="button" class="btnGuardarEdit btn">Guardar</button>
                    <button type="button" class="btnCancelar btn">Cancelar</button>
                </form>
                

            </div>
            `)
        }
    })

$(document).on('click', '.btnDelete', function () {
    const id = $(this).parent().parent().data('userid');
    console.log(id)
    $.ajax('http://localhost:3000/api/users/' + id, {
        method: 'delete',
        success: function () {
            $('#user-' + id).remove();
            $(".modalDelete").show()
            $(".closeModal").on('click', function () {
                location.href = '/users';
            })
        }
    })
})

$(document).on('click', '.btnEdit', function () {
    const id = $(this).parent().parent().data('userid');
    $("#info-div-" + id).hide()
    $("#edit-form-" + id).show()
})

$(document).on('click', '.btnCancelar', function () {
    const id = $(this).parent().parent().data('userid');
    $("#info-div-" + id).show()
    $("#edit-form-" + id).hide()
})

$(document).on('click', '.btnGuardarEdit', function () {
    const id = $(this).parent().parent().data('userid');
    const nombre = $('#nombre-' + id).val();
    const apellido = $('#apellido-' + id).val();
    const telefono = $('#telefono-' + id).val();
    const mail = $('#email-' + id).val();

    var modifiedUser = {
        id: id,
        name: nombre,
        surname: apellido,
        phone: telefono,
        mail: mail,
    }


    $.ajax('http://localhost:3000/api/user/' + id, {
        method: 'POST',
        data: modifiedUser,
        success: function () {
            $(".modal").show()
            $(".closeModal").on('click', function () {
                location.href = '/users';
            })
        },
        failure: function () {
            alert("No modifico");
        }
    })
})

$('#btfiltro').on('click', function(){
    const valFiltro = $('#filtrar').val(); 
    
    $(".mainDivUsers").empty();

    $.ajax("http://localhost:3000/api/users?search="+ valFiltro)
        .done(function (data) {
        for(let i= 0; i < data.length; i++){
            $(".mainDivUsers").append(`
            <div class="user" id='user-${data[i].id}' data-userId='${data[i].id}'>
            
                <div class="info" id="info-div-${data[i].id}">
                    <p>Nombre: ${data[i].name}</p>
                    <p>Apellido: ${data[i].surname}</p>
                    <p>Telefono: ${data[i].phone}</p>
                    <p>E-Mail: ${data[i].mail}</p>

                    <button class="btnEdit btn">Editar</button>
                    <button class="btnDelete btn">Borrar</button>
                </div>

                <form class="edit-form" id="edit-form-${data[i].id}">
                    <p>Nombre</p>
                    <input name="name" id="nombre-${data[i].id}" type="text" value="${data[i].name}">
                    <p>Apellido</p>
                    <input name="surname" id="apellido-${data[i].id}" type="text" value="${data[i].surname}">
                    <p>Telefono</p>
                    <input name="phone" id="telefono-${data[i].id}" type="tel" value="${data[i].phone}">
                    <p>E-Mail</p>
                    <input name="mail" id="email-${data[i].id}" type="email" value="${data[i].mail}">

                    <button type="button" class="btnGuardarEdit btn">Guardar</button>
                    <button type="button" class="btnCancelar btn">Cancelar</button>
                </form>
                

            </div>
            `)
        }
    })
})