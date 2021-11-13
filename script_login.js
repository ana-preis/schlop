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

let email = ""
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

function CadastroUsuario(){

    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    document.getElementById("emailCadastro").style.color = "black"
    document.getElementById("emailConfirmaCadastro").style.color = "black"
    document.getElementById("senhaCadastro").style.color = "black"
    document.getElementById("senhaConfirmaCadastro").style.color = "black"


    if (usuarios == null){

      usuarios = []

      if(!VerificaEArmazena()) {
        return
      }

    } else {

      if(!VerificaEArmazena()) {
        return
      }

    }

    alert("Cadastro realizado com sucesso!")

    window.location.href="index.html"

}

function VerificaEArmazena() {

  if(VerificaInputCadastrarVazio()) { return }

  if(!ValidaEmail(emailCadastro.value)) { 
    document.getElementById("emailCadastro").style.color = "red"
    return
   }

  if(!SaoIguais(senhaCadastro.value, senhaConfirmaCadastro.value)) {
    alert("Você digitou senhas diferentes!")
    document.getElementById("senhaCadastro").style.color = "red"
    document.getElementById("senhaConfirmaCadastro").style.color = "red"
    return false
  }
  if(!SaoIguais(emailCadastro.value, emailConfirmaCadastro.value)){
    alert("Você digitou emails diferentes!")
    document.getElementById("emailCadastro").style.color = "red"
    document.getElementById("emailConfirmaCadastro").style.color = "red"
    return false
  }

  usuario = new Usuario(nomeCadastro.value, emailCadastro.value, dataCadastro.value, senhaCadastro.value)

  usuarios.push(usuario)

  localStorage.setItem("usuarios", JSON.stringify(usuarios))

  return true

}


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

function SaoIguais(senhaInput, senhaReal){

  console.log(senhaInput, senhaReal)
    if (senhaInput != senhaReal){      
      return false
    }
    return true
}


function VerificaInputCadastrarVazio() {

  if (nomeCadastro.value == "" || dataCadastro.value == "" || emailCadastro.value == "" || emailConfirmaCadastro.value == "" || senhaCadastro.value == "" || senhaConfirmaCadastro.value == "") {
    alert("Você deixou algum campo vazio!")
    return true
  } else { return false }

}

function ValidaEmail(email) {
  if (/\S+@\S+\.\S+/.test(email)) {
     return (true)
   }
   alert("Endereço de email inválido!")
   return (false)
}
