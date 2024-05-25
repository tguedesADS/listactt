const nome = document.querySelector("#inputNome");
const telefone = document.querySelector("#inputTelefone");
const email = document.querySelector("#inputEmail");
const formulario = document.querySelector("#formulario");
const contatos = document.querySelector("#contatos");

const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
let contador = 1;
if (listaContatos.length > 0) {
  contador = listaContatos[listaContatos.length - 1].id + 1;
}

function criarCard(objContato) {
  const novo_elemento = document.createElement("div");
  novo_elemento.classList.add("card_contato");
  const elemento_nome = document.createElement("p");
  elemento_nome.classList.add("color_name");
  elemento_nome.innerHTML = `<i class='bx bxs-user'></i><span id="nome">${objContato.nome}</span>`;
  const elemento_telefone = document.createElement("p");
  elemento_telefone.innerHTML = `<i class='bx bxs-phone'></i><span id="telefone">${objContato.telefone}</span>`;
  const elemento_email = document.createElement("p");
  elemento_email.innerHTML = `<i class='bx bxs-envelope'></i><span id="email">${objContato.email}</span>`;
  const elemento_btn = document.createElement("div");
  elemento_btn.classList.add("btn_contato");
  const elemento_edit = document.createElement("i")
  elemento_edit.classList.add("bx", "bxs-edit-alt")
  elemento_edit.id = "editarContato"
  const elemento_delet = document.createElement("i")
  elemento_delet.classList.add("bx", "bxs-message-alt-x")
  elemento_delet.id = "excluirContato"
//   elemento_btn.innerHTML = `<i class='bx bxs-edit-alt' id="editarContato"></i>
//   <i class='bx bxs-message-alt-x' id="excluirContato"></i>`;

//   const elemento_edit = document.querySelector("#editarContato");
  elemento_edit.addEventListener("click", () => {
    const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
    listaContatos.forEach((item) => {
      if (objContato.id === item.id) {
        const index = listaContatos.indexOf(item);
        localStorage.setItem(
          "contato_edit",
          JSON.stringify(listaContatos[index])
        );
        window.location.href = "./edit.html";
      }
    });
  });

//   const element_delet = document.querySelector("#excluirContato");
  elemento_delet.addEventListener("click", () => {
    const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
    listaContatos.forEach((item) => {
      if (objContato.id === item.id) {
        const index = listaContatos.indexOf(item);
        listaContatos.splice(index, 1);
      }
    });
    localStorage.setItem("lista", JSON.stringify(listaContatos));
    contatos.removeChild(novo_elemento);
  });

  elemento_btn.append(elemento_edit, elemento_delet)
  novo_elemento.append(
    elemento_nome,
    elemento_telefone,
    elemento_email,
    elemento_btn
  );
  contatos.appendChild(novo_elemento);
}

function addContato(e) {
  e.preventDefault();
  const objeto = {
    id: contador,
    nome: nome.value,
    telefone: telefone.value,
    email: email.value,
  };
  contador++;

  criarCard(objeto);

  const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
  listaContatos.push(objeto);
  localStorage.setItem("lista", JSON.stringify(listaContatos));

  nome.value = "";
  telefone.value = "";
  email.value = "";
  nome.focus();
}
function mascararTelefone(value) {
    let digitos = value.replace(/\D/g, '');

    digitos = digitos.replace(/^(\d{2})(\d)/g, '($1) $2');
    digitos = digitos.replace(/(\d{5})(\d)/, '$1-$2');

    return digitos;
}

telefone.addEventListener('input', (e) => {
    const valorMascarado = mascararTelefone(e.target.value);
    telefone.value = valorMascarado;
});

function carregarPagina(){
    const listaContatos = JSON.parse(localStorage.getItem("lista")) || []
    listaContatos.forEach((i) =>{
        criarCard(i)
    })
}

carregarPagina()

formulario.addEventListener("submit", addContato)