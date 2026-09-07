# Receptor de RSVP (Google Apps Script)

`Codigo.gs` es el script que recibe los envíos del formulario de la web y los
guarda como filas en una hoja de cálculo de Google.

## Por qué fallaba el formulario

La web enviaba el RSVP con la cabecera `Content-Type: application/json`. Esa
cabecera saca la petición de la categoría de *simple request* de CORS y obliga
al navegador a lanzar antes una petición `OPTIONS` de comprobación
(*preflight*). Las Web Apps de Google Apps Script **no responden a `OPTIONS`**,
así que el navegador cancelaba el envío antes de mandar nada y `fetch` fallaba
con un error de red. Ese error caía en el bloque `.catch`, que mostraba
"Error de conexión..." — un mensaje engañoso, porque la conexión a internet
funcionaba perfectamente.

La solución aplicada en `boda_antonio_noemie.html` es enviar el JSON con
`Content-Type: text/plain;charset=utf-8`, que mantiene la petición como simple
y evita el *preflight*. El script sigue recibiendo el JSON intacto en
`e.postData.contents`, así que no hace falta cambiar nada del lado del
servidor.

## Despliegue

1. Abre la hoja de cálculo donde quieres los RSVP.
2. **Extensiones → Apps Script**.
3. Pega el contenido de `Codigo.gs` y guarda.
4. **Implementar → Nueva implementación** → tipo **Aplicación web**.
5. Configura estos dos valores, que son los que hacen que funcione:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** **Cualquier usuario**.

   Si aquí eliges "Solo yo" o "Cualquier usuario con una cuenta de Google", los
   invitados reciben un error de permisos y el formulario falla.
6. Copia la URL `/exec` que te da y pégala en la constante `SCRIPT_URL` de
   `boda_antonio_noemie.html`.

## Comprobar que el despliegue está vivo

Abre la URL `/exec` en el navegador. Debe responder:

```json
{"status":"ok","mensaje":"Receptor RSVP activo"}
```

Si en su lugar ves una pantalla de inicio de sesión de Google o un error de
permisos, el paso 5 no está bien configurado.

## Importante al modificar el script

Cada vez que edites el código tienes que crear una **nueva versión** de la
implementación (**Implementar → Gestionar implementaciones → editar → Versión:
Nueva versión**). Si solo guardas el archivo, la URL sigue sirviendo la versión
antigua.

## Exportar a Excel

En la hoja de cálculo: **Archivo → Descargar → Microsoft Excel (.xlsx)**.
