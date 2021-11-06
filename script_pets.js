let nomePetEditar = document.getElementById("nomePetEditar")
let pesoPetEditar = document.getElementById("pesoPetEditar")
let racaPetEditar = document.getElementById("racaPetEditar")
let condicaoPetEditar = document.getElementById("condicaoPetEditar")

let pets = []
let petAtual = {}
let trPet

function Pet(parametroNome, parametroPeso, parametroRaca, parametroCondicao, parametroTag) {
  this.nome = parametroNome;
  this.peso = parametroPeso;
  this.raca = parametroRaca;
  this.condicao = parametroCondicao;
  this.tag = parametroTag;
}

function CadastroPetRapido() {
  pets = JSON.parse(localStorage.getItem("pets"))

  if (pets == null) {
    pets = []
    petsAtual = new Pet(nomePetEditar.value, pesoPetEditar.value, racaPetEditar.value, condicaoPetEditar.value)
    pets.push(petsAtual)
    localStorage.setItem("pets", JSON.stringify(pets))
  } else {
    petsAtual = new Pet(nomePetEditar.value, pesoPetEditar.value, racaPetEditar.value, condicaoPetEditar.value)
    pets.push(petsAtual)
    localStorage.setItem("pets", JSON.stringify(pets))
  }
  
  alert("Cadastro efetuado!")
}

function Pets() {

  pets = JSON.parse(localStorage.getItem("pets"))
  i = 0

  
  document.getElementById("tableNome").innerHTML = pets[i].nome
  document.getElementById("tablePeso").innerHTML = pets[i].peso
  document.getElementById("tableRaca").innerHTML = pets[i].raca
  document.getElementById("tableCondicao").innerHTML = pets[i].condicao
  
  
  
}

//Cria DIVS (linhas) da tabela de Pets de acordo com a quantidade de Pets
function CriaLinhaTabela() {
  for (i = 0; i < pets.length; i++) {
    trPet = document.createElement("tr")
    trPet.innerHTML = 
  
    document.table.appendChild(trPet); 
  }

}

function BotaoExcluirTabela() {

  if(confirm("Tem certeza que deseja excluir o cadastro desse Pet?")) {
    pets = JSON.parse(localStorage.getItem("pets"))
    petAtual = pets[0]     //TEMPORARIO
    pets.splice(petAtual, 1)
    localStorage.setItem("pets", JSON.stringify(pets))
    alert("As informações desse Pet foram excluídas com sucesso!")
    window.location.href="pets.html"
  }
}

function EditarPet() {

  pets = JSON.parse(localStorage.getItem("pets"))
  petAtual = pets[0]    //TEMPORARIO  
  console.log(petAtual.nome)

  document.getElementById("nomePetEditar").innerHTML = petAtual.nome
  document.getElementById("pesoPetEditar").innerHTML = petAtual.peso
  document.getElementById("racaPetEditar").innerHTML = petAtual.raca
  document.getElementById("condicaoPetEditar").innerHTML = petAtual.condicao

}