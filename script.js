let bemVindo = document.getElementById("bemVindo")
let cardAdd = document.getElementById("cardAdd")

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

//Armazena informações do pet clicado na página pets      //tem como direcionar do outro script??


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

  if (usuarioAtual.pets != null) {
    let listaNomes = CriaListaNomesPets(usuarioAtual)
    console.log(listaNomes)
    petsPerfil.innerHTML = listaNomes
  }

  nomePerfil.innerHTML = usuarioAtual.nome
  emailPerfil.innerHTML = usuarioAtual.email
  dataNascimentoPerfil.innerHTML = usuarioAtual.dataNascimento.split("-").reverse().join(" / ")
  //dispositivoPerfil.innerHTML = usuarioAtual.dispositivos.join(" , ")

}

//Cria a lista de nomes que aparece no perfil
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

//Volta para index e zera usuarioAtual
function Sair() {
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  ZeraUsuarioAtual(usuarioAtual)
  petAtual = {}
  AtualizaPetAtual(petAtual)
  window.location.href = "index.html"
}

//Atualiza informações do petAtual no armazenamento
function AtualizaPetAtual(pet) {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  petAtual = pet
  localStorage.setItem("petAtual", JSON.stringify(petAtual))

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

// Verifica se duas strings são iguais
function SaoIguais(senhaInput, senhaReal){

  if (senhaInput != senhaReal){      
    return false
  }
  return true
}


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

function CadastraDispositivo() {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  let numeroBebedouroInput = document.getElementById("numeroBebedouroInput")
  let nomeBebedouroInput = document.getElementById("nomeBebedouroInput")

  if (BebedouroJaExiste(usuarioAtual)) { return } 
  
  usuarioAtual.dispositivos.push([nomeBebedouroInput.value, numeroBebedouroInput.value])

  console.log(usuarioAtual.dispositivos)

  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  alert("Cadastro do novo bebedouro realizado com sucesso!")

  window.location.href = "cadastroDispositivo.html"

}

function ExcluirDispositivo(indice) {

  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  usuarioAtual.dispositivos.splice(indice, 1)

  console.log(usuarioAtual.dispositivos)

  alert("Bebedouro excluido com sucesso!")

  window.location.href = "cadastroDispositivo.html"

  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

}

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