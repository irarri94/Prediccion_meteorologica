
var url = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/';
var key = '?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcnJpemFiYWxhZ2FpcmFpZGVAZ21haWwuY29tIiwianRpIjoiYzg2ZDhjNWItYmI1My00OTIyLTgxNzUtNDUxMzBlYjMyNWVlIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1NjM3MzM4ODcsInVzZXJJZCI6ImM4NmQ4YzViLWJiNTMtNDkyMi04MTc1LTQ1MTMwZWIzMjVlZSIsInJvbGUiOiIifQ.OrR6i_YmsWmVWEAnBp5B8xt9xTkbCuA-YyeUKEeahkk';

$(function () {

  $('select#provinces').change(function provinceSelected () {
    var province = $('#provinces').val();
    findTownsByProvince(province);
  });

  var province = $('#provinces').val();
  findTownsByProvince(province);

  function findTownsByProvince (province) {
    $('select#towns').html('');
    $('select#towns').append('<option value=""> - </option>');
    for (var i = 0; i < towns.length; i++) {
      if (towns[i].province === province) {
        $('select#towns').append('<option value="' + towns[i].code + '">' + towns[i].name + '</option>');
      }
    }
  }

  $('select#towns').change(function () {
    var code = $('#towns').val();
    if (code) {
      obtenerDatos(code);
    }
  });

  function obtenerDatos (code) {
    var fullUrl = url + code + key;
    $.get(fullUrl, function (response) {
      $.ajax({
        url: response.datos,
        type: 'GET',
        dataType: 'json',
      }).done(function (info) {
        printInfo(info);
      }).fail(function (err) {
        console.error('Error:', err);
      });
    });
  }

  function printInfo (info) {
    $('#weather').html('');
    $('#town-name').text(info[0].nombre);
    var dias = info[0].prediccion.dia;
    for (var i = 0; i < dias.length; i++) {
      var description = '';
      for (var x = 0; x < dias[i].estadoCielo.length; x++) {
        if (!description) {
          description = dias[i].estadoCielo[x].descripcion;
        }
      }
      var rain = 0;
      for (var x = 0; x < dias[i].probPrecipitacion.length; x++) {
        if (rain < dias[i].probPrecipitacion[x].value) {
          rain = dias[i].probPrecipitacion[x].value;
        }
      }
      $('#weather').append('<hr>');
      $('#weather').append('<h3>' + dias[i].fecha + '</h3>');
      $('#weather').append('<h4>Max: ' + dias[i].temperatura.maxima + ' Min: ' + dias[i].temperatura.minima + ' - ' + description + ' - Probabilidad lluvia: ' + rain + '%</h4>');
    }
  }

});
