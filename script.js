let nomeEditar = document.getElementById("nomeEditar")
let usuarioEditar = document.getElementById("usuarioEditar")
let emailEditar = document.getElementById("emailEditar")
let dataNascimentoEditar = document.getElementById("dataNascimentoEditar")

let senhaAtualEditar = document.getElementById("senhaAtualEditar")
let senhaNovaEditar = document.getElementById("senhaNovaEditar")
let confirmacaoSenhaEditar = document.getElementById("confirmacaoSenhaEditar")

let criar = document.getElementById("criar")    //TEMPORÁRIO

let usuarios = []
let usuarioAtual = {}
let indiceUsuarioAtual = usuarios.indexOf(usuarioAtual)

function Usuario(parametroNome, parametroUsuario, parametroEmail, parametroData, parametroDispositivo, parametroPets, parametroSenha) {
  this.nome = parametroNome;
  this.nomeDeUsuario = parametroUsuario;
  this.email = parametroEmail;
  this.dataNascimento = parametroData;
  this.dispositivos = parametroDispositivo;
  this.pets = parametroPets
  this.senha = parametroSenha
}


// Rapidao um cadastro aqui pra teste  //TEMPORÁRIO
function CadastroRapido() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))

  if (usuarios == null) {
    usuarios = []
    usuarioAtual = new Usuario(nomeEditar.value, usuarioEditar.value, emailEditar.value, dataNascimentoEditar.value)
    usuarios.push(usuarioAtual)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
  } else {
    usuarioAtual = new Usuario(nomeEditar.value, usuarioEditar.value, emailEditar.value, dataNascimentoEditar.value)
    usuarioAtual.senha = (Math.random()*100).toFixed(0)     //TEMPORARIO
    usuarios.push(usuarioAtual)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
  }
  
  alert("Cadastro efetuado!")

}


// Vai p/ pagina de Perfil
function Perfil() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = usuarios[3]     //TEMPORARIO

  document.getElementById("nomePerfil").innerHTML = usuarioAtual.nome
  document.getElementById("usuarioPerfil").innerHTML = usuarioAtual.nomeDeUsuario
  document.getElementById("emailPerfil").innerHTML = usuarioAtual.email
  document.getElementById("dataNascimentoPerfil").innerHTML = usuarioAtual.dataNascimento.split("-").reverse().join(" / ")
  document.getElementById("dispositivoPerfil").innerHTML = usuarioAtual.dispositivos.join(" , ")
  document.getElementById("petsPerfil").innerHTML = usuarioAtual.pets.join(" , ")

}

//Formatação data: a.split("-").reverse().join("-")

// Vai p/ pagina de Pets
function Pets() {}


// Vai para a página da lista de Pets
function EditarPets() {}


// Vai para a página de edição do Hardware
function EditarDispositivo() {}


// Volta p/ página anterior
function Voltar() {}


// Vai p/ página de Edição da Senha
function EditarSenha() {

  window.location.href = "editarSenha.html"

}


// Salva as novas informações do perfil do usuário
function SalvarPerfil() {
  
  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = usuarios[0]     //TEMPORARIO

  if (VerificaInputEditarVazio()) { return }
  if (NomeDeUsuarioJaExiste(usuarioAtual)) { return }
  if (!ValidaEmail(emailEditar.value)) { return }
  
  AtualizaPerfil(usuarioAtual)
  
}


// Verificação se o usuário preencheu todos os inputs ao apertar "Salvar",  retorna true se estiver VAZIO
function VerificaInputEditarVazio() {

  if (nomeEditar.value == "" || emailEditar.value == "" || dataNascimentoEditar.value == "" || usuarioEditar.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } else { return false }

}


//Verifica se o nome de usuário já foi cadastrado no armazenamento local
function NomeDeUsuarioJaExiste(usuarioAtual) {

  for (i = 0; i < usuarios.length; i++) {
    if (usuarioEditar.value == usuarios[i].nomeDeUsuario){
      if (usuarioAtual.email != usuarios[i].email) {
        alert("Esse nome de usuário já existe!")
        document.getElementById("usuarioEditar").style.color = "red"
        return true
      }
    }
  }
  document.getElementById("usuarioEditar").style.color = "black"
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

// Salva as novas informações no Objeto usuarioAtual e atualiza o JSON
function AtualizaPerfil(usuarioAtual) {

  usuarioAtual.nome = nomeEditar.value
  usuarioAtual.nomeDeUsuario = usuarioEditar.value
  usuarioAtual.email = emailEditar.value
  usuarioAtual.dataNascimento = dataNascimentoEditar.value

  localStorage.setItem("usuarios", JSON.stringify(usuarios))
  return alert("Cadastro atualizado com sucesso!")

}


//Deleta a conta do usuário que está logado e retorna para a Home page
function DeletaConta() {

  if(confirm("Tem certeza que deseja deletar sua conta?")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
    usuarioAtual = usuarios[0]     //TEMPORARIO
    usuarios.splice(usuarioAtual, 1)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    alert("Sua conta foi excluída com sucesso!")
    window.location.href="alternat_index.html"
  }

}


// Salva a nova senha no Objeto usuarioAtual e atualiza o JSON
function AtualizaSenha(usuarioAtual) {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = usuarios[2]     //TEMPORARIO
  if (InputSenhaVazio() || !SenhaAtualCorreta(usuarioAtual) || !SenhaEConfirmacaoIguais()) { return }
  usuarioAtual.senha = senhaNovaEditar.value
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
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


// Verificação se o usuário digitou as senhas iguais ao apertar "Salvar", retorna true se for DIFERENTE
function SenhaEConfirmacaoIguais() {

  if (senhaNovaEditar.value !== confirmacaoSenhaEditar.value) {
    alert("Você digitou senhas diferentes!")
    return false
  } 
  return true

}


// Verifica se a senha digitada é igual à senha do Objeto usuarioAtual
function SenhaAtualCorreta(usuarioAtual) {

  if (senhaAtualEditar.value != usuarioAtual.senha) {
    alert("A senha digitada não corresponde a sua senha atual!")
    return false
  }
  return true

}



// Faz o Logout do usuário
function Sair() {}

