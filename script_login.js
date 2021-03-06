// Inputs tela de login
let emailLogin = document.getElementById("emailLogin")
let senhaLogin = document.getElementById("senhaLogin")

// Inputs tela de cadastro
let nomeCadastro = document.getElementById("nomeCadastro")
let dataCadastro = document.getElementById("dataCadastro")
let emailCadastro = document.getElementById("emailCadastro")
let emailConfirmaCadastro = document.getElementById("emailConfirmaCadastro")
let senhaCadastro = document.getElementById("senhaCadastro")
let senhaConfirmaCadastro = document.getElementById("senhaConfirmaCadastro")

let usuarios = []
let usuario = {}

function Usuario(parametroNome, parametroEmail, parametroData, parametroSenha, parametroDispositivo, parametroPets) {
    this.nome = parametroNome;
    this.email = parametroEmail;
    this.dataNascimento = parametroData;
    this.senha = parametroSenha
    this.dispositivos = parametroDispositivo;
    this.pets = parametroPets;
  }


//Novo Cadastro
function CadastroUsuario(){

  usuarios = JSON.parse(localStorage.getItem("usuarios"));
  document.getElementById("emailCadastro").style.color = "black"
  document.getElementById("emailConfirmaCadastro").style.color = "black"
  document.getElementById("senhaCadastro").style.color = "black"
  document.getElementById("senhaConfirmaCadastro").style.color = "black"

  if (usuarios == null){

    usuarios = []

    if(!Verificado()) { return }
    Armazena()

  } else {

    if(!VerificaEmailExiste()) { return }

    if(!Verificado()) { return }
    Armazena()

  }

  alert("Cadastro realizado com sucesso!")

  window.location.href="index.html"

 
}


//Verificações de input de cadastro
function Verificado() {

  let emailValido = /\S+@\S+\.\S+/.test(emailCadastro.value)

  if(VerificaInputCadastrarVazio()) { return false }
  
  if (!emailValido) {
    alert("Endereço de email inválido!")
    document.getElementById("emailCadastro").style.color = "red"
    return false
  }

  if(!SaoIguais(emailCadastro.value, emailConfirmaCadastro.value)){
    alert("Você digitou emails diferentes!")
    document.getElementById("emailCadastro").style.color = "red"
    document.getElementById("emailConfirmaCadastro").style.color = "red"
    return false
  }

  if(!ValidaSenha()) { return false }

  if(!SaoIguais(senhaCadastro.value, senhaConfirmaCadastro.value)) {
    alert("Você digitou senhas diferentes!")
    document.getElementById("senhaCadastro").style.color = "red"
    document.getElementById("senhaConfirmaCadastro").style.color = "red"
    return false
  }

  return true

}


//Verifica se o usuario deixou input em branco e mostra alert
function VerificaInputCadastrarVazio() {

  if (nomeCadastro.value == "" || dataCadastro.value == "" || emailCadastro.value == "" || emailConfirmaCadastro.value == "" || senhaCadastro.value == "" || senhaConfirmaCadastro.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } else { return false }

}


//Verifica se duas strings são iguais
function SaoIguais(senhaInput, senhaReal){

  if (senhaInput != senhaReal){      
    return false
  }
  return true
}


//Verifica se email do input já foi cadastrado
function VerificaEmailExiste() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))

  for (i = 0; i < usuarios.length; i++) {

    if(emailCadastro.value == usuarios[i].email){
      alert("Este email já está cadastrado!")
      document.getElementById("emailCadastro").style.color = "red"
      return false
    }

  }  

  return true

}


//Se clica no ícone da senha, troca o type para text 
 function IconeSenha() {

  const iconecadastro1 = document.getElementById('iconecadastro1')
  const senhaCadastro = document.getElementById('senhaCadastro')

  if (senhaCadastro.type == "password") {
    senhaCadastro.setAttribute("type", "text")
    iconecadastro1.classList.add("icon-pass-on")

  } else if (senhaCadastro.type == "text") {
    senhaCadastro.setAttribute("type", "password")
    iconecadastro1.classList.remove("icon-pass-on")

  }

 }

 function IconeSenhaConfirmar() {

  const iconecadastro2 = document.getElementById('iconecadastro2')
  const senhaConfirmaCadastro = document.getElementById('senhaConfirmaCadastro')

  if (senhaConfirmaCadastro.type == "password") {
    senhaConfirmaCadastro.setAttribute("type", "text")
    iconecadastro2.classList.add("icon-pass-on")

  } else if (senhaConfirmaCadastro.type == "text") {
    senhaConfirmaCadastro.setAttribute("type", "password")
    iconecadastro2.classList.remove("icon-pass-on")

  }
  
 }


//6 a 16 caracteres
function ValidaSenha() {

  var minNumberofChars = 6
  var maxNumberofChars = 16
  var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if(senhaCadastro.value.length < minNumberofChars || senhaCadastro.value.length > maxNumberofChars){
    document.getElementById("senhaCadastro").style.color = "red"
    var mensagemSenha = document.getElementById("mensagemSenha")
    mensagemSenha.textContent = "Senha deve ter no mínimo 6 e no máximo 16 caracteres"

      return false
  }
  if(!regularExpression.test(senhaCadastro.value)) {
    alert("regex")
    document.getElementById("senhaCadastro").style.color = "red"
    document.getElementById("mensagemSenha").innerHTML = "Senha deve ter no mínimo 6 e no máximo 16 caracteres"

    return false
  }

  document.getElementById("mensagemSenha").innerHTML = ""
  return true

}


// Armazenamento novo usuário
function Armazena() {  
  
  usuario = new Usuario(nomeCadastro.value, emailCadastro.value, dataCadastro.value, senhaCadastro.value)
  
  usuarios.push(usuario)
  
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
  
  return true
  
}




//Verifica se email já foi armazenado na tela de login
function EmailLoginExiste() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))

  for (i = 0; i < usuarios.length; i++) {
  
      if(emailLogin.value.toLowerCase() == usuarios[i].email){

          usuarioAtual = usuarios[i]

      return usuarioAtual
    
      }
  }
  alert ("Email não cadastrado")
  document.getElementById("emailLogin").style.color = "red"
  return false

}


//Entra no sistema e cria usuarioAtual
function Login(){

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  
  if(!EmailLoginExiste()){

      return

  } else {
      usuarioAtual = EmailLoginExiste()
      AtualizaUsuarioAtual(usuarioAtual)
  }

  if(!SaoIguais(senhaLogin.value, usuarioAtual.senha)){
    document.getElementById("senhaLogin").style.color = "red"
    alert("Senha incorreta!")
    return

  }
  window.location.href="poslogin.html"

}