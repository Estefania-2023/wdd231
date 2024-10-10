const currentUrl = window.location.href;

const everything = currentUrl.split('?');

let formData =  everything[1].split('&');

var fechaCodificada = show('timestamp');

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p><b>Your Name:</b> ${show("fname")} ${show("lname")}.</p>
<p><b>Your Email:</b> <a href="${show('email')}">${show('email')}</a>.</p>
<p><b>Your Phone:</b> ${show('phone')}</p>
<p><b>Business Name:</b> ${show('organization')}.</p>
<p>You filled out this form on  ${formatFechaHora(fechaCodificada)}</p>

`;
console.log(show('timestamp'))


function formatFechaHora(fechaCodificada) {
    try {
        var fechaDecodificada = decodeURIComponent(fechaCodificada);
        var fecha = new Date(fechaDecodificada);
        
        if (isNaN(fecha.getTime())) {
            throw new Error('Fecha inválida');
        }

        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1;
        var año = fecha.getFullYear();
        var horas = fecha.getHours();
        var minutos = fecha.getMinutes();

        mes = mes.toString().padStart(2, '0');
        dia = dia.toString().padStart(2, '0');
        horas = horas.toString().padStart(2, '0');
        minutos = minutos.toString().padStart(2, '0');

        var fechaFormateada = `${mes}/${dia}/${año} at ${horas}:${minutos}`;
        return fechaFormateada;
    } catch (error) {
        console.error(error);
        return null;
    }
}



function show(information) {
    formData.forEach((element) => {
        if (element.startsWith(information)) {
            result = element.split('=')[1].replace("%40", "@")
        }
    })
    return(result);
}
