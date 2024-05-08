const inputNome = document.querySelector("#inputNome")
const inputTelefone = document.querySelector("#inputTelefone")
const inputEmail = document.querySelector("#inputEmail")
const formulario = document.querySelector("#formulario")
const contatos = document.querySelector("#contatos")
const cardContato = document.querySelector("#cardContato")
const editarContato = document.querySelector("#editarContato")
const excluirContato = document.querySelector("#excluirContato")

const listaContatos = JSON.parse(localStorage.getItem("lista")) || []
let contador = 1
if(listaContatos.length > 0){
    contador = listaContatos[listaContatos.length - 1].id + 1
}

