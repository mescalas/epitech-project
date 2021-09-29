let menuActif = '';

function showMenu (name) {
    menuActif = name;
    return document.querySelector('#navbarComposants').style.display = "block"
}

function hiddenMenu () {
    return document.querySelector('#navbarComposants').style.display = "none"
}

function getOngletActif () {
    return menuActif;
}

module.exports = {
    showMenu,
    hiddenMenu,
    getOngletActif
}