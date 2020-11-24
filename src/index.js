let addToy = false;
let totalToys = 0

function addHTwo(text){
  const newH = document.createElement("h2")
  newH.innerHTML = text
  return newH
}

function addImg(text){
  const newImg = document.createElement("img")
  newImg.setAttribute("src", text)
  return newImg
}

function addP(text){
  const newP = document.createElement("p")
  newP.innerHTML = `${text} likes`
  return newP
}

function addButton(){
  const newButton = document.createElement("button")
  newButton.setAttribute("class", "like-button")
  newButton.innerHTML = "Like"
  return newButton
}

function addDiv(div, obj){
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "card")
  newDiv.appendChild(addHTwo(obj["name"]))
  newDiv.appendChild(addImg(obj["image"]))
  newDiv.appendChild(addP(obj["likes"]))
  newDiv.appendChild(addButton())
  div.appendChild(newDiv)
}

function appendInfo(toys){
  const toyDiv = document.getElementById("toy-collection")
  toys.forEach((toy) => { 
    addDiv(toyDiv, toy) 
  })
}

function fetcher() {
  fetch("http://localhost:3000/toys")
  .then(function(response){
      return response.json()
  })
  .then(function(json){
    totalToys = json.length
    console.log(totalToys)
    appendInfo(json)
  })
}

function getNewToy(){
  const name = document.getElementById("name").value
  const img = document.getElementById("image").value
  const id = totalToys + 1
  totalToys = id

  const info = {
      id: id,
      name: name,
      image: img,
      likes: 0
  }

  const configObject = {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
      },
      body: JSON.stringify(info)
  }

  return fetch("http://localhost:3000/toys", configObject)
      .then(function(response){
          return response.json()
      })
      .then(function(json){
        appendInfo([json])
        return json
      })
}

const button = document.getElementById('toy-creator')
button.addEventListener("click", function(e){
  e.preventDefault()
  console.log(e)
  getNewToy()
})

// Bullseye
// https://secure.img1-fg.wfcdn.com/im/49083822/resize-h800-w800%5Ecompr-r85/8377/83778505/Bullseye+Disney/Pixar+Toy+Story+4+Cardboard+Standup.jpg

document.addEventListener("DOMContentLoaded", () => {
  fetcher()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {   // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
