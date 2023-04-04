//Bandera de los botones

let modoOscuro 

//Botones darkmode y lightmode

let btnDarkMode = document.getElementById(`darkmode`)
let btnLightMode = document.getElementById(`lightmode`)

//Eventos

btnDarkMode.addEventListener("click", ()=>{
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", false)

});
btnLightMode.addEventListener("click", ()=>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", true)
});

if(localStorage.getItem("modoOscuro")){
    modoOscuro = localStorage.getItem("modoOscuro")
}else{
    localStorage.setItem("modoOscuro", true)
    modoOscuro = "true"
}

if(modoOscuro == "false"){
    document.body.classList.add("darkMode")
}else{
    document.body.classList.remove("darkMode")
}