let addToy = false;

function fetchToys(){
  return fetch('http://localhost:3000/toys')
     .then(function(response) {
       return response.json()
     })
     .then(function(object){
       renderToys(object)
     })
}

function renderToys(toys) {
  const toyWrapper = document.getElementById('toy-collection')

  for(let i = 0; i < toys.length; i++) {
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const likes = document.createElement('p')
    const likeBtn = document.createElement('button')

    h2.innerText = toys[i].name
    img.src = toys[i].image
    img.width = "150"
    likes.innerText = `${toys[i].likes} likes`
    likeBtn.innerText = "Like"

    toyWrapper.appendChild(h2)
    toyWrapper.appendChild(img)
    toyWrapper.appendChild(likes)
    toyWrapper.appendChild(likeBtn)

    console.log(toys[i].name)
  }
}


document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});