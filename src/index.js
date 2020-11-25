let addToy = false;
const toyCollection = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', (e) => {
        postToy(e.target)
    })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json()) 
  .then(toys => {
    toys.forEach((toy) => {
      renderToy(toy)
    })
})
}

function postToy(toy_stats) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/jason"
    },
    body: JSON.stringify({
      name: toy_stats.name.value,
      image: toy_stats.image.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(toy => {
    
    let newToy = renderToy(toy)
    toyCollection.append(newToy)
  })
}

function renderToy(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-button')
  button.setAttribute('id', toy.id)
  button.innerText = "Like"
  button.addEventListener("click", (e) => {
    e.preventDefault()
    addLikes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, button)
  toyCollection.append(divCard)
}

function addLikes(e) {
  let anotherLike = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: anotherLike
    })
  })
  .then(results => results.json())
  .then((likeObject => {
    e.target.previousElementSibling.innerText = `${likeObject.likes} likes`
  }))
}



fetchToys()
