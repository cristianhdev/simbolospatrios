
let video;

let elementoActualSound = null;
let audioHimno = null;
let audiopage = null;
let myAnimation

function init() {
    audioHimno = new Sonidos('Himno_Colombia');
    audiopage = new Sonidos('HojaFlip');
    document.body.addEventListener('keyup', presentacionteclado, false)

    setTimeout(() => {
        cargaPageFlip()
        document.querySelector('.spinner').classList.add('hidden')
        document.querySelector('.flipbook-viewport').classList.remove('hidden')

    }, 999);

}


function cargaPageFlip() {

    let flippage = document.querySelector('.flipbook')

    // Create the flipbook

    $(flippage).turn({
        // Width

        width: 922,

        // Height

        height: 600,

        // Elevation

        elevation: 50,

        // Enable gradients

        gradients: true,

        // Auto center this flipbook

        autoCenter: true

    });







    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {

    } else {
        /* $(".flipbook").turn({width:640, height:623}); */
        $(flippage).turn('display', 'single');
        $(flippage).turn('size', 400, 635);
        $(flippage).turn('resize')

    }

    $(flippage).bind('turning', (event, page, view) => {

        audiopage.playAudio()
        if (elementoActualSound != null) {
            audioHimno.stopAudio()
            document.querySelector(elementoActualSound).removeEventListener('click', stopSonido, false)
            document.querySelector(elementoActualSound).addEventListener('click', playSonido, false)
            document.querySelector(elementoActualSound).classList.add('botonPlay')
            document.querySelector(elementoActualSound).classList.remove('botonPause')

        }

    })

    $(flippage).bind('turned', (event, page, view) => {
        
    })


}

function presentacionteclado(e) {


    if (e.keyCode == 39) {
        $('.flipbook').turn('next');
        e.preventDefault();
        /* siguiente() */
    }

    if (e.keyCode == 37) {
        $('.flipbook').turn('previous');
        e.preventDefault();

    }
}

function playSonido(id) {

    audioHimno.playAudio(verificarFinAudio)
    elementoActualSound = `#${id}`
    document.querySelector(`#${id}`).removeEventListener('click', playSonido, false)
    document.querySelector(`#${id}`).addEventListener('click', stopSonido, false)
    document.querySelector(`#${id}`).classList.remove('botonPlay')
    document.querySelector(`#${id}`).classList.add('botonPause')
    //verificarFinAudio(`#${id}`)
}

function verificarFinAudio() {
    //audioHimno.playAudioFondo()
    document.querySelector(elementoActualSound).classList.remove('botonPause')
    document.querySelector(elementoActualSound).classList.add('botonPlay')
    document.querySelector(elementoActualSound).removeEventListener('click', stopSonido, false)
    document.querySelector(elementoActualSound).addEventListener('click', playSonido, false)
}

function stopSonido(e) {
    audioHimno.stopAudio()
    document.querySelector(`#${e.target.id}`).removeEventListener('click', stopSonido, false)
    document.querySelector(`#${e.target.id}`).addEventListener('click', playSonido, false)
    document.querySelector(`#${e.target.id}`).classList.add('botonPlay')
    document.querySelector(`#${e.target.id}`).classList.remove('botonPause')
}


function Imprimir(idImagen) {

    let base64StringImagen1 = imagenData(idImagen)
    let imagenfondoAplicada = imagenData('imagen-fondo')


    let ventanaPreview = window.open('', '', 'height=800, width=800');
    ventanaPreview.document.write('<html>');
    ventanaPreview.document.write('<head>');
    ventanaPreview.document.write('<style>');
    ventanaPreview.document.write(`


@media print {
    #botonImprimir{
        display:none
    }
    textarea{
        resize: none !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    body{
        -webkit-print-color-adjust:exact;
        -moz-print-color-adjust:exact;
        -ms-print-color-adjust:exact;
        print-color-adjust:exact;
    } 

   
}

@media print and (orientation:landscape)
{
    body{
        -webkit-print-color-adjust:exact;
        -moz-print-color-adjust:exact;
        -ms-print-color-adjust:exact;
        print-color-adjust:exact;
    }    
}`);
    ventanaPreview.document.write('</style>');
    ventanaPreview.document.write('<script src="https://cdn.tailwindcss.com"></script>');
    ventanaPreview.document.write('</head>');
    ventanaPreview.document.write('<body> <h1>Vista previa Impresion<br>');
    ventanaPreview.document.write(`<div id="print"
                                    class="w-full h-[70vh]  flex flex-col mx-auto mt-[10%] text-center justify-center items-center content-center border-2 border-gray-100"  style='background-image:${imagenfondoAplicada};background-repeat: no-repeat;background-size: 100% 100%;background-position: center center;'>
                                    <img class=" w-[85%] h-[85%] object-contain "
                                    src="${base64StringImagen1}" alt="escudo:alt">
                                </div>`);
    ventanaPreview.document.write('</body></html>');
    ventanaPreview.document.close();

    setTimeout(() => {
        ventanaPreview.print();
    }, 1200);


}


function imagenData(id) {
    var c = document.createElement('canvas');
    var img = document.getElementById(`${id}`);
    c.height = img.naturalHeight;
    c.width = img.naturalWidth;
    var ctx = c.getContext('2d');

    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL();
}

// Get the modal
let modal = document.getElementById("myModal");



// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

/* span.addEventListener('click', ocultarModal); */
window.addEventListener('click', ocultarModalVentana)

function ocultarModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
function ocultarModalVentana(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function MostrarVideo() {
    modal.style.display = "flex";
}

function OcultarVideo() {
    video.currentTime = 0
    videoMobile.currentTime = 0
    video.pause()
    videoMobile.pause()
    modal.style.display = "none";
}


