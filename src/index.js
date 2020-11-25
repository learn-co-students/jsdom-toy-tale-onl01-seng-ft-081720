

document.addEventListener("DOMContentLoaded", () => {  
  addEventListenerToAddBtn()
  addEventListenerToForm()
  displayToys()
})

let addToy = false;
const toyCollection = document.querySelector("#toy-collection");
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

function addEventListenerToAddBtn() {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
}

function formData() {
  return {
    name: document.getElementsByName('name')[0].value,
    image: document.getElementsByName('image')[0].value,
    likes: 0
  }
}

function addEventListenerToForm() {
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData())
    })
    .then(function(resp) {
       return resp.json()
    })
    .then(function(data) {
      form.reset()
      addSingleToy(data)
    })

  })
}

function addEventListenerToLike(button, toy) {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes += 1
      })
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
    })
    let likeBox = event.target.previousSibling
    likeBox.innerText = `${toy.likes} Likes`
  })
}

function displayToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json))
}

function addSingleToy(toy) {
  const div = document.createElement("DIV")
  const h2 = document.createElement("H2")
  const img = document.createElement("IMG")
  const p = document.createElement("P")
  const button = document.createElement("BUTTON")

  h2.innerText = toy.name
  img.src = toy.image
  img.height = 250
  img.width = 250
  p.innerText = toy.likes + " Likes"
  div.className = "card"
  button.className = "like-btn"
  button.innerText = 'Like'

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  toyCollection.appendChild(div)

  addEventListenerToLike(button, toy)
}

function renderToys(json) {
  for(const toy of json) {
    addSingleToy(toy)
  }
}
