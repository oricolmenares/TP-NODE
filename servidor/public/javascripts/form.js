var modal = document.getElementsByClassName('modal');

$('#new').on('click', function () {
  console.log("hola")
  const nombre = $('#nombre').val();
  const apellido = $('#apellido').val();
  const telefono = $('#telefono').val();
  const mail = $('#email').val();

  var newUser = {
    name: nombre,
    surname: apellido,
    phone: telefono,
    mail: mail,
  }

    $.ajax('http://localhost:3000/api/user/new', {
      method: 'POST',
      data: newUser,
      success: function () {
        $(".modal").show()
        $(".closeModal").on('click', function () {
          location.href = '/users';
        })
      },
      failure: function () {
        alert("Call failes");
      }
    })
})