let nomePet = document.getElementById("nomePet")

let nomePetEditar = document.getElementById("nomePetEditar")
let pesoPetEditar = document.getElementById("pesoPetEditar")
let racaPetEditar = document.getElementById("racaPetEditar")
let condicaoPetEditar = document.getElementById("condicaoPetEditar")

let pesquisarPet = document.getElementById("pesquisarPet")
let mensagemPesquisa = document.getElementById("mensagemPesquisa")

let pets = []
let pet = {}

function Pet(parametroNome, parametroPeso, parametroRaca, parametroCondicao, parametroTag) {
  this.nome = parametroNome;
  this.peso = parametroPeso;
  this.raca = parametroRaca;
  this.condicao = parametroCondicao;
  this.tag = parametroTag;
}


// Seleciona o pet pesquisado e faz verificações
function PesquisarPet() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  let pets = usuarioAtual.pets
  let nenhumPet = 0

  RemoveClassEsconder(pets)

  for (i = 0; i < pets.length; i++) {
    let idTable = "table" + i
    if ((pets[i].nome).toLowerCase() != pesquisarPet.value.toLowerCase()) {
      let linhaTabela = document.getElementById(idTable)
      linhaTabela.classList.add("esconder")
      nenhumPet++
    }

  }

  if (pesquisarPet.value == "") {
    RemoveClassEsconder(pets)
    mensagemPesquisa.textContent = ""
  } else if (nenhumPet == pets.length) {
    mensagemPesquisa.textContent = "Nenhum pet encontrado"
  } else {
    mensagemPesquisa.textContent = ""
  }

}


//Remove a classe esconder das linhas da tabela ao realizar nova pesquisa
function RemoveClassEsconder(pets) {

  for (i = 0; i < pets.length; i++) {
    let idTable = "table" + i
    let linhaTabela = document.getElementById(idTable)
    linhaTabela.classList.remove("esconder")
    }
  
}


//Cadastro do Pet
function CadastroPet() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

  if(InputVazioPet()) { return }

  ArmazenaPetUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  alert("Novo pet cadastrado!")

  window.location.href="pets.html"

}

//Verifica se usuário deixou input vazio ao adicionar Pet
function InputVazioPet() {

  if(nomePetEditar.value == "" || pesoPetEditar.value == "" || racaPetEditar.value == ""){
    alert("Você deixou algum campo vazio!")
    return true
  }
  return false

}

//Armazenamento local do Pet no Objeto usuarioAtual
function ArmazenaPetUsuarioAtual(user) {

  if (user.pets == null) {
    user.pets = []
    pet = new Pet(nomePetEditar.value, pesoPetEditar.value, racaPetEditar.value, condicaoPetEditar.value)
    user.pets.push(pet)
    localStorage.setItem("usuarioAtual", JSON.stringify(user))
    return
  }

  pet = new Pet(nomePetEditar.value, pesoPetEditar.value, racaPetEditar.value, condicaoPetEditar.value)
  user.pets.push(pet)
  localStorage.setItem("usuarioAtual", JSON.stringify(user))

}

//Cria DIVS (linhas) da tabela de Pets de acordo com a quantidade de Pets
function CriaLinhaTabela() {

  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  var pets = usuarioAtual.pets

  for (i = 0; i < pets.length; i++) {
    let linhaPet = document.createElement("div")
    let nomePet = document.createElement("div")
    let pesoPet = document.createElement("div")
    let racaPet = document.createElement("div")
    let condicaoPet = document.createElement("div")
    let divEditarPet = document.createElement("div")
    let editarPet = document.createElement("button")

    nomeDoPetAtual = pets[i].nome

    nomePet.textContent = pets[i].nome
    pesoPet.textContent = pets[i].peso + "Kg"
    racaPet.textContent = pets[i].raca
    condicaoPet.textContent = pets[i].condicao
    editarPet.textContent = "Editar"

    document.getElementById("table").appendChild(linhaPet)
    linhaPet.appendChild(nomePet)
    linhaPet.appendChild(pesoPet)
    linhaPet.appendChild(racaPet)
    linhaPet.appendChild(condicaoPet)
    linhaPet.appendChild(divEditarPet)
    divEditarPet.appendChild(editarPet)
    
    linhaPet.classList.add("table-line")
    nomePet.classList.add("col", "col1")
    pesoPet.classList.add("col", "col2")
    racaPet.classList.add("col")
    condicaoPet.classList.add("col", "col4")
    divEditarPet.classList.add("coluna-editar")

    idNome = i
    idTable = "table" + [i]
    
    nomePet.setAttribute("id", idNome)
    linhaPet.setAttribute("id", idTable)

    nomePet.addEventListener("click", e => {
      CriaPetAtual(nomePet.id)
      //window.location.href = ""   DIRECIONA P/ DETALHE PET
    })

    editarPet.addEventListener("click", e => {
      CriaPetAtual(nomePet.id)
      window.location.href = "editarPet.html"
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

//Atualiza valores novos na chave petAtual, usuarioAtual e usuarios
function EditaPet() {
  
  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  let listaPets = usuarioAtual.pets
  let indicePetAtual
  
  for(i = 0; i < listaPets.length; i++) {
    if(listaPets[i].nome == petAtual.nome){
      indicePetAtual = i
      break
    }
  }

  if(InputVazioPet()) { return }

  petAtual.nome = nomePetEditar.value
  petAtual.peso = pesoPetEditar.value
  petAtual.raca = racaPetEditar.value
  petAtual.condicao = condicaoPetEditar.value

  listaPets[indicePetAtual] = petAtual

  AtualizaPetAtual(petAtual)
  AtualizaUsuarioAtual(usuarioAtual)
  AtualizaUsuarios(usuarioAtual)

  alert("Cadastro do Pet atualizado com sucesso!")

  window.location.href="pets.html"

}

//Exclui cadastro do PetAtual e atualiza pet Atual
function ExcluirCadastroPet() {
  
  usuarios = JSON.parse(localStorage.getItem("usuarios"))
  usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));
  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  let listaPets = usuarioAtual.pets

  if(confirm("Tem certeza que deseja excluir o cadastro desse Pet?")) {
 
    for(i = 0; i < listaPets.length; i++) {
      if(listaPets[i].nome == petAtual.nome){
        listaPets.splice(i, 1)
        break
      }
    }

    petAtual = {}
    AtualizaPetAtual(petAtual)
    AtualizaUsuarioAtual(usuarioAtual)
    AtualizaUsuarios(usuarioAtual)
    alert("As informações desse Pet foram excluídas com sucesso!")
    window.location.href="pets.html"

  }
}


function AtualizaPetAtual(pet) {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  petAtual = pet
  localStorage.setItem("petAtual", JSON.stringify(petAtual))

}

//Preenche os inputs com informações do Pet clicado
function MostraInfoNoInputPets() {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));

  nomePetEditar.value = petAtual.nome
  pesoPetEditar.value = petAtual.peso
  racaPetEditar.value = petAtual.raca
  condicaoPetEditar.value = petAtual.condicao

}

function MostraNomePet() {

  petAtual = JSON.parse(localStorage.getItem("petAtual"));
  nomePet.innerHTML = petAtual.nome

}