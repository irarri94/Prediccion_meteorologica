# Como usar
Descargar el repositorio, descomprimir el zip y abrir ella archivo tiempo.html en el navegador.

##Descripción
Aemet necesita los códigos específicos de cada municipio, por lo tanto he descargado los datos en un excel y los he puesto en formato json en el fichero codes.js que se  carga antes de tiempo.js.
La url que nos devuelve los datos es la siguiente:
https://opendata.aemet.es/dist/index.html?#!/predicciones-especificas/Predicci%C3%B3n_por_municipios_diaria_Tiempo_actual

# Funcionamiento:
El usuario elige la provincia y luego el pueblo. Cuando el selector del pueblo se cambia se obtienen los datos meteorológicos del municipio seleccionado.
Hay que hacer dos llamadas, la primera con la api key que nos devuelve la url definitiva y hacemos otra petición contra ella la cual nos devuelve los datos definitivos.

### Datos mostrados:
-Estado del cielo: muestra el primer valor que nos devuelve, el general.
-Probabilidad de lluvia: la mas alta.
-Temperatura: máxima y mínima.
-Fecha.
