let addToy = false;


// function fetchToys(){
//   return fetch("http://localhost:3000/toys/:id", {
//     method: "POST",
//     header: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       name
//     })
//   })

function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    renderToys(object)
    // console.log(object)
  })
}

function renderToys(toys){
const toyIndexWrapper = document.getElementById("toy-collection")

  for (let i = 0; i < toys.length; i++){
    const h2 = document.createElement("h2")
    const img = document.createElement("img")
    const likes = document.createElement("p")
    const likeBtn = document.createElement("button")

    h2.innerText = toys[i].name
    img.src = toys[i].image
    img.width = "150"
    likes.innerText = `${toys[i].likes} likes`
    likeBtn.innerText = "Like"

    toyIndexWrapper.appendChild(h2)
    toyIndexWrapper.appendChild(img)
    toyIndexWrapper.appendChild(likes)
    toyIndexWrapper.appendChild(likeBtn)



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
