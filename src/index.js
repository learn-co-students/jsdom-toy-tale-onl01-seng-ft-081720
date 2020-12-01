let addToy = false;
const toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        displayToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  retrieveToys();
  displayToy();
});

// get the api
function retrieveToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}

// display the api results
function displayToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'image': toy_data.image.value,
      'likes': toy_data.image.value
    })
  })
  .then(resp => resp.json())
  .then(toy_object => {
    let newToy = showToys(toy_object)
    toyCollection.append(newToy)
  })
}

function showToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-pic')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-button')
  button.setAttribute('id', toy.id)
  button.innerText = "like"
  button.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    likes(event)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.appendChild(h2, img, p, button)
  toyCollection.append(divCard)
}

function likes(event) {
  event.preventDefault()
  let amount = parseInt(event.target.previousElementSibling.innerText) + 1

  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": amount
      })
    })
    .then(resp => resp.json())
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${amount} likes`;
    }))
}
