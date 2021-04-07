$(document).ready(function(){

  var pathArray = window.location.pathname.split('/');
  var secondLevelLocation = pathArray[1];
  var localStorageName = secondLevelLocation;

  var vidastotales = 5;

  localStorage.setItem(localStorageName,JSON.stringify({
    registro: false, 
    vidas: 0,
    victoria: false
  }));


  


  // Carga estados
  load('estados');
  var $sel = $('#estado');
  $sel.on('change', function() {
    var idestado = $('#estado').val();
    load('municipios', idestado);
  })
  

function load(tipo, idestado = ''){
$.ajax({
  url:"includes/LocationLoad",
  method:"POST",
  data:{tipo:tipo, idestado:idestado},
  dataType:"json",
  success:function(data){
  
      if(tipo == 'estados'){
            var html = '<option value="-1"> Seleccione estado </option>';
              for(var count = 0; count < data.length; count++){
                  html += '<option value="'+data[count].id+'">'+data[count].name+'</option>';
              }
        $('#estado').html(html);      
      }
      else{
          var html = '<option value="-1"> Seleccione municipio </option>';
              for(var count = 0; count < data.length; count++){
                  html += '<option value="'+data[count].id+'">'+data[count].name+'</option>';
              }
        $('#municipio').html(html); }
  },
  error: function(err) {
    console.log(err);
  } 
})
}



// Funcion registro
$( "#registrar" ).submit(function(event) {
    var parametros = $(this).serialize();
      $.ajax({
              type: "POST",
              url: "includes/registro",
              data: parametros,
              success: function(datos){
                
                var datos = $.parseJSON(datos);
       
                if (datos.status === 'error'){
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',               
                    title: '<div id="resultado">' + datos.error+'</div>',
                    showConfirmButton: false,
                    timer: 2500
                  });
                } 
                 if(datos.status === 'success') {
                  localStorage.setItem(localStorageName,JSON.stringify({
                    registro: true,
                    vidas: vidastotales,
                    victoria: false
                  }));
                    window.location.href = 'menu'
                } 
            },
            error: function(err) {
              
            } 
      })
      event.preventDefault();
  });

});


