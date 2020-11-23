let addToy = false;

function loadToys(obj) {
  let toyCollectionDiv = document.getElementById("toy-collection");

  obj.forEach(function(toy) {
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "Like"
    btn.addEventListener('click', (b) => {
      increaseLikeCount(b)
    })

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    toyCollectionDiv.append(divCard)
  })
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(object => loadToys(object))

  newToyForm.addEventListener("submit", event => {
    event.preventDefault();
    submitToDatabase(event.target)
  });
});

function createLikeEvents() {
  [...document.getElementsByClassName("like-btn")].forEach(function(btn) {
    btn.addEventListener("click", event => {increaseLikeCount(event.target)})
  })
  debugger
}

function createNewToy(toy) {
  let toyCollectionDiv = document.getElementById("toy-collection");
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like"
  btn.addEventListener('click', (b) => {
    increaseLikeCount(b)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  toyCollectionDiv.append(divCard)
};

function submitToDatabase(event) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": event.name.value,
      "image": event.image.value,
      "likes": 0
    })
  };

  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(obj) {
    createNewToy(obj);
  })
  .catch(function(error) {
    alert("Failed!");
    document.body.innerHTML = error.message;
  })
};

function increaseLikeCount(event) {
  event.preventDefault()
  let more = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
    .then(res => res.json())
    .then((like_obj => {
      event.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
