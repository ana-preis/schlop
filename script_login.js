// Inputs tela de login
let emailLogin = document.getElementById("emailLogin")
let senhaLogin = document.getElementById("senhaLogin")

// Inputs tela de cadastro alterar!!
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

//Verificalções de input de cadastro
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

// Armazenamento
function Armazena() {  
  
  usuario = new Usuario(nomeCadastro.value, emailCadastro.value, dataCadastro.value, senhaCadastro.value)
  
  usuarios.push(usuario)
  
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
  
  return true
  
}

//Verifica se o usuario deixou input em branco e mostra alert
function VerificaInputCadastrarVazio() {

  if (nomeCadastro.value == "" || dataCadastro.value == "" || emailCadastro.value == "" || emailConfirmaCadastro.value == "" || senhaCadastro.value == "" || senhaConfirmaCadastro.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } else { return false }

}

//Verifica se email ja ta cadastrado tem @, ".", e se tem conteudo antes e depois do arroba
function ValidaEmail() {
  

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

  console.log(usuarioAtual)
  if(!SaoIguais(senhaLogin.value, usuarioAtual.senha)){
    document.getElementById("senhaLogin").style.color = "red"
    alert("Senha incorreta!")
    return

  }
  window.location.href="poslogin.html"

}

//Verifica se email já foi armazenado
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

//Verifica se duas strings são iguais
function SaoIguais(senhaInput, senhaReal){

  console.log(senhaInput, senhaReal)
    if (senhaInput != senhaReal){      
      return false
    }
    return true
}

function IconeSenha() {

  const iconecadastro1 = document.querySelector('#iconecadastro1')
  const senhaCadastro = document.querySelector('#senhaCadastro')

  iconecadastro1.addEventListener('click', function (e) {
    const type = senhaCadastro.getAttribute('type') === 'password' ? 'text' : 'password'
    senhaCadastro.setAttribute('type', type)
    this.classList.toggle('icon-pass-on')

  })

  const iconecadastro2 = document.querySelector('#iconecadastro2')
  const senhaConfirmaCadastro = document.querySelector('#senhaConfirmaCadastro')

  iconecadastro2.addEventListener('click', function (e) {
    const type = senhaConfirmaCadastro.getAttribute('type') === 'password' ? 'text' : 'password'
    senhaConfirmaCadastro.setAttribute('type', type)
    this.classList.toggle('icon-pass-on')

  })

}

//6 a 16 caracteres
function ValidaSenha() {

  var minNumberofChars = 6
  var maxNumberofChars = 16
  var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
  console.log(senhaCadastro.value.length)

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