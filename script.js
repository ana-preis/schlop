let nomePerfil = document.getElementById("nomePerfil")
let emailPerfil = document.getElementById("emailPerfil")
let dataNascimentoPerfil = document.getElementById("dataNascimentoPerfil")
let dispositivoPerfil = document.getElementById("dispositivoPerfil")
let petsPerfil = document.getElementById("petsPerfil")

let nomeEditar = document.getElementById("nomeEditar")
let emailEditar = document.getElementById("emailEditar")
let dataNascimentoEditar = document.getElementById("dataNascimentoEditar")

let senhaAtualEditar = document.getElementById("senhaAtualEditar")
let senhaNovaEditar = document.getElementById("senhaNovaEditar")
let confirmacaoSenhaEditar = document.getElementById("confirmacaoSenhaEditar")

let usuarioAtual = {}


// Vai p/ pagina de Perfil
function Perfil() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  let listaNomes = CriaListaNomesPets(usuarioAtual)
  console.log(listaNomes)

  nomePerfil.innerHTML = usuarioAtual.nome
  emailPerfil.innerHTML = usuarioAtual.email
  dataNascimentoPerfil.innerHTML = usuarioAtual.dataNascimento.split("-").reverse().join(" / ")
  //dispositivoPerfil.innerHTML = usuarioAtual.dispositivos.join(" , ")
  petsPerfil.innerHTML = listaNomes


}

function CriaListaNomesPets(user) {
  
  let listaNomes = []
  let listaPets = user.pets

  for (i = 0; i < listaPets.length; i++) {
    listaNomes.push(listaPets[i].nome)
    console.log(listaNomes.join(" , "))
  }
  return listaNomes.join(" , ")
}

//Formatação data: a.split("-").reverse().join("-")

// Vai para a página de edição do Hardware
function EditarDispositivo() {}


// Volta p/ página anterior
function Voltar() {}

//Volta para Homepage e zera usuarioAtual
function Sair() {
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  ZeraUsuarioAtual(usuarioAtual)
  petAtual = {}
  AtualizaPetAtual(petAtual)
  window.location.href = "homepage.html"
}

function AtualizaPetAtual(pet) {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  petAtual = pet
  localStorage.setItem("petAtual", JSON.stringify(petAtual))

}


function ZeraUsuarioAtual(user) {
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  if(user == null) {
    usuarioAtual = {}
    localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual))
  } else {
    usuarioAtual = {}
    localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual))
  }

}


function MostraInfoNoInputPerfil() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  nomeEditar.value = usuarioAtual.nome
  emailEditar.value = usuarioAtual.email
  dataNascimentoEditar.value = usuarioAtual.dataNascimento

}

// Salva as novas informações do perfil do usuário
function SalvarPerfil() {
  
  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  if (VerificaInputEditarVazio()) { return  }
  if (EmailJaExiste(usuarioAtual)) { return }
  if (!ValidaEmail(emailEditar.value)) { return }
  
  EditaUsuario(usuarioAtual)
  
}


// Verificação se o usuário preencheu todos os inputs ao apertar "Salvar",  retorna true se estiver VAZIO
function VerificaInputEditarVazio() {

  if (nomeEditar.value == "" || emailEditar.value == "" || dataNascimentoEditar.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } else { return false }

}


//Verifica se o email já foi cadastrado no armazenamento local
function EmailJaExiste(usuarioAtual) {

  for (i = 0; i < usuarios.length; i++) {
    if (emailEditar.value == usuarios[i].email){
      if (usuarioAtual.email != usuarios[i].email) {
        alert("Esse email já foi cadastrado!")
        document.getElementById("emailEditar").style.color = "red"
        return true
      }
    }
  }
  document.getElementById("emailEditar").style.color = "black"
  return false

}


//Verifica se email tem "@" e se tem ".com"
function ValidaEmail(email) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}


// Salva as novas informações no Objeto usuarioAtual e atualiza o JSON        //TESTAR
function EditaUsuario(atual) {

  atual.nome = nomeEditar.value
  atual.email = emailEditar.value
  atual.dataNascimento = dataNascimentoEditar.value
    
  AtualizaUsuarioAtual(atual)
  AtualizaUsuarios(atual)

  window.location.href = "perfil.html"

  return alert("Cadastro atualizado com sucesso!")


}


//Deleta a conta do usuário que está logado e retorna para a Home page
function DeletaConta() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  usuarios = JSON.parse(localStorage.getItem("usuarios"));
  console.log(indiceUsuarioAtual)

  if(confirm("Tem certeza que deseja deletar sua conta?")) {
    
    usuarioAtual = {}

    AtualizaUsuarioAtual(usuarioAtual)
    AtualizaUsuarios(usuarioAtual)

    alert("Sua conta foi excluída com sucesso!")

    window.location.href="homepage.html"
  }

}


//Atualiza lista de usuarios no Armazenamento Local
function AtualizaUsuarios(user) {
  usuarios = JSON.parse(localStorage.getItem("usuarios"));

  for(i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email == user.email) {
      usuarios[i] = user
    }
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios))

}

function AtualizaUsuarioAtual(atual) {
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  usuarioAtual = atual
  localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual))
}

// Salva a nova senha no Objeto usuarioAtual e atualiza o JSON
function AtualizaSenha(usuarioAtual) {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"))

  if (InputSenhaVazio() || !SaoIguais(senhaAtualEditar.value, usuarioAtual.senha) || !SaoIguais(senhaNovaEditar.value, confirmacaoSenhaEditar.value)) { return }
  usuarioAtual.senha = senhaNovaEditar.value

  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  window.location.href="editarPerfil.html"
  return alert("Senha atualizada com sucesso")

}


// Verificação se o usuário preencheu todos os inputs ao apertar "Salvar", retorna true se estiver VAZIO
function InputSenhaVazio() {

  if (senhaAtualEditar.value == "" || senhaNovaEditar.value == "" || confirmacaoSenhaEditar.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } 
  return false
}


function SaoIguais(senhaInput, senhaReal){

  if (senhaInput != senhaReal){      
    return false
  }
  return true
}
