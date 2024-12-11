document.addEventListener('DOMContentLoaded', () => {
    console.log('documento listo')

    const menu = document.getElementById('icono-menu')
    const navegacion = document.querySelector('.navegacion')
    const body = document.querySelector('body')
    const icono = document.getElementById('icono')

    menu.addEventListener('click', () => {
        navegacion.classList.toggle('visible')
        body.classList.toggle('body')

        if(icono.src.includes('icon-menu-close')) {
            icono.src = './img/icon-menu.svg'
        } else {
            icono.src = './img/icon-menu-close.svg'
        }
    })
})