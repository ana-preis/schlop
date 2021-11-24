//Tela poslogin
let bemVindo = document.getElementById("bemVindo")
let cardAdd = document.getElementById("cardAdd")

//Label tela perfil
let nomePerfil = document.getElementById("nomePerfil")
let emailPerfil = document.getElementById("emailPerfil")
let dataNascimentoPerfil = document.getElementById("dataNascimentoPerfil")
let dispositivoPerfil = document.getElementById("dispositivoPerfil")
let petsPerfil = document.getElementById("petsPerfil")

//Inputs tela editarPerfil
let nomeEditar = document.getElementById("nomeEditar")
let emailEditar = document.getElementById("emailEditar")
let dataNascimentoEditar = document.getElementById("dataNascimentoEditar")

//Inputs tela editarSenha
let senhaAtualEditar = document.getElementById("senhaAtualEditar")
let senhaNovaEditar = document.getElementById("senhaNovaEditar")
let confirmacaoSenhaEditar = document.getElementById("confirmacaoSenhaEditar")

let usuarioAtual = {}


function MostrarUsuarioHeader() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  document.getElementById("usuarioTopo").innerHTML = usuarioAtual.nome

}

//Mostra a mensagem de Bem Vindo + nome do usuario
function MostrarNomeUsuario() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  bemVindo.innerHTML = "Bem vindo(a), " + usuarioAtual.nome

}


//Cria o card se houver pet cadastrado naquela conta
function CriaCardPets() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  let pets = usuarioAtual.pets

  if (pets == null) {
    cardAdd.classList.remove("esconder")
    return
  }

  cardAdd.classList.add("esconder")

  for(i = 0; i < pets.length; i++) {
    let cardPet = document.createElement("div")
    let linkPet = document.createElement("a") 
    let nomePet = document.createElement("h3")
    let pesoPet = document.createElement("h3")
    let racaPet = document.createElement("h3")
    let condicaoPet = document.createElement("h3")

    nomePet.textContent = pets[i].nome
    pesoPet.textContent = pets[i].peso + "Kg"
    racaPet.textContent = pets[i].raca
    condicaoPet.textContent = pets[i].condicao

    document.getElementById("cardRow").appendChild(cardPet)
    cardPet.appendChild(linkPet)
    linkPet.appendChild(nomePet)
    linkPet.appendChild(pesoPet)
    linkPet.appendChild(racaPet)
    linkPet.appendChild(condicaoPet)

    cardPet.classList.add("card")

    idNome = i
    cardPet.setAttribute("id", idNome)

    cardPet.addEventListener("click", e => {
      CriaPetAtual(cardPet.id)
      window.location.href = "relatorio.html"   
    })

  }

}


//Armazena informações do pet clicado na página pets
function CriaPetAtual(id) {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("petAtual"));

    if (petAtual == null){

      petAtual = {}

      AtualizaPetAtual(usuarioAtual.pets[id])

    } else {

      AtualizaPetAtual(usuarioAtual.pets[id])

    }

}


// Vai p/ pagina de Perfil
function Perfil() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  let listaNomeDispositivos = []

  if (usuarioAtual.pets != null) {
    let listaNomes = CriaListaNomesPets(usuarioAtual)
    petsPerfil.innerHTML = listaNomes
  }

  nomePerfil.innerHTML = usuarioAtual.nome
  emailPerfil.innerHTML = usuarioAtual.email
  dataNascimentoPerfil.innerHTML = usuarioAtual.dataNascimento.split("-").reverse().join(" / ")

  for(i = 0; i < usuarioAtual.dispositivos.length; i++) {
    listaNomeDispositivos.push(usuarioAtual.dispositivos[i][0])
  }
  dispositivoPerfil.innerHTML = listaNomeDispositivos.join(" , ")

}


//Cria a lista de nomes que aparece no perfil
function CriaListaNomesPets(user) {
  
  let listaNomes = []
  let listaPets = user.pets

  for (i = 0; i < listaPets.length; i++) {
    listaNomes.push(listaPets[i].nome)
  }
  return listaNomes.join(" , ")
}


//Atualiza informações do petAtual no armazenamento
function AtualizaPetAtual(pet) {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  petAtual = pet
  localStorage.setItem("petAtual", JSON.stringify(petAtual))

}


//Mostra informações automaticamente no input de Editar
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

//Verifica se email tem @, ".", e se tem conteudo antes e depois do arroba
function ValidaEmail(email) {
 if (/\S+@\S+\.\S+/.test(email)) {
    return (true)
  }
  alert("Endereço de email inválido!")
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


//Atualiza infos do usuarioAtual no armazenamento
function AtualizaUsuarioAtual(atual) {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  usuarioAtual = atual
  localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual))

}


// Salva a nova senha no Objeto usuarioAtual e atualiza o JSON
function AtualizaSenha(usuarioAtual) {
  
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"))
  
  if (InputSenhaVazio()) { return }

  if(!SaoIguais(senhaAtualEditar.value, usuarioAtual.senha)) { 
    document.getElementById("senhaAtualEditar").style.color = "red"
    document.getElementById("senhaNovaEditar").style.color = "red"
    alert("A senha atual está incorreta!")
    return
  }
  
  if(!SaoIguais(senhaNovaEditar.value, confirmacaoSenhaEditar.value)) { 
    document.getElementById("confirmacaoSenhaEditar").style.color = "red"
    document.getElementById("senhaNovaEditar").style.color = "red"
    alert("A senha nova está diferente da senha de confirmação!")
    return  
  }

  if(!ValidaSenha()) { return }
  
  usuarioAtual.senha = senhaNovaEditar.value

  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  window.location.href="editarPerfil.html"
  document.getElementById("senhaAtualEditar").style.color = "red"
  document.getElementById("senhaNovaEditar").style.color = "red"
  document.getElementById("confirmacaoSenhaEditar").style.color = "red"
  mensagemSenha.textContent = ""

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


// Verifica se duas strings são iguais
function SaoIguais(senhaInput, senhaReal){

  if (senhaInput != senhaReal){      
    return false
  }
  return true
}

//6 a 16 caracteres
function ValidaSenha() {
  var minNumberofChars = 6
  var maxNumberofChars = 16
  var regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

  if(senhaNovaEditar.value.length < minNumberofChars || senhaNovaEditar.value.length > maxNumberofChars){
    document.getElementById("senhaNovaEditar").style.color = "red"
    var mensagemSenha = document.getElementById("mensagemSenha")
    mensagemSenha.textContent = "Senha deve ter no mínimo 6 e no máximo 16 caracteres"

      return false
  }
  if(!regularExpression.test(senhaNovaEditar.value)) {
    document.getElementById("senhaNovaEditar").style.color = "red"
    document.getElementById("mensagemSenha").innerHTML = "Senha deve ter no mínimo 6 e no máximo 16 caracteres"

    return false
  }

  if (senhaNovaEditar.value == usuarioAtual.senha) {
    alert("A nova senha está igual a senha antiga!")
    return false
  }

  document.getElementById("mensagemSenha").innerHTML = ""
  return true

}


//Deleta a conta do usuário que está logado e retorna para a Index
function DeletaConta() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if(confirm("Tem certeza que deseja deletar sua conta?")) {
    
    for(i = 0; i < usuarios.length; i++) {
      if(usuarios[i].email == usuarioAtual.email){
        usuarios.splice(i, 1)
        break
      }
    }

    usuarioAtual = {}

    AtualizaUsuarioAtual(usuarioAtual)
    AtualizaUsuarios(usuarioAtual)

    alert("Sua conta foi excluída com sucesso!")

    window.location.href="index.html"
  }

}


//Mostra a Listagem dos bebedouros cadastrados automaticamente
function CriaListaBebedouros() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  let dispositivos = usuarioAtual.dispositivos

  if (dispositivos == null) { return }

  for (i = 0; i < dispositivos.length; i++) {

    let indiceDispositivo = i
    let linhaDispositivo = document.createElement("div")
    let dispositivo = document.createElement("label")
    let excluirDispositivo = document.createElement("button")

    dispositivo.textContent = dispositivos[i].join(" - ")      
    excluirDispositivo.textContent = "Excluir"

    document.getElementById("bebedouros").appendChild(linhaDispositivo)

    linhaDispositivo.appendChild(dispositivo)
    linhaDispositivo.appendChild(excluirDispositivo)

    excluirDispositivo.addEventListener("click", e => {
      ExcluirDispositivo(indiceDispositivo)
    })
    
    excluirDispositivo.classList.add("btn-excluir-disp")

  }

}


//Armazena o Novo Dispositivo e Atualiza usuario e usuarioAtual
function CadastraDispositivo() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  let numeroBebedouroInput = document.getElementById("numeroBebedouroInput")
  let nomeBebedouroInput = document.getElementById("nomeBebedouroInput")

  if (BebedouroJaExiste(usuarioAtual)) { return } 
  
  usuarioAtual.dispositivos.push([nomeBebedouroInput.value, numeroBebedouroInput.value])

  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  alert("Cadastro do novo bebedouro realizado com sucesso!")

  window.location.href = "cadastroDispositivo.html"

}


//Verifica se Já existe bebedouro com o código digitado e retorna true se sim
function BebedouroJaExiste(user) {

  for (i = 0; i < user.dispositivos.length; i++) {
    if (user.dispositivos[i][1] == numeroBebedouroInput.value) {
      alert("Este código já foi cadastrado!")
      document.getElementById("numeroBebedouroInput").style.color = "red"
      return true
    }
  }

  return false

}


//Exclui dispositivo e atualiza usuario e usuarioAtual
function ExcluirDispositivo(indice) {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  if(confirm("Tem certeza que deseja excluir este bebedouro?")) {

    usuarioAtual.dispositivos.splice(indice, 1)

    alert("Bebedouro excluido com sucesso!")

    window.location.href = "cadastroDispositivo.html"

    AtualizaUsuarioAtual(usuarioAtual)
    AtualizaUsuarios(usuarioAtual)

  }

}


//Volta para index e zera usuarioAtual
function Sair() {
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  if(confirm("Tem certeza que deseja sair da sua conta?")) {

    ZeraUsuarioAtual(usuarioAtual)
    petAtual = {}
    AtualizaPetAtual(petAtual)
    window.location.href = "index.html"
  }

}


//Declara usuario atual {}
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