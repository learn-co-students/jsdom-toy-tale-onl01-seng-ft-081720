let addToy = false;

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

funciton addButton(){
  const newButton = document.createElement("button")
}

function addDiv(div, obj){
  const newDiv = document.createElement("div")
  newDiv.setAttribute("class", "card")
  newDiv.appendChild(addHTwo(obj["name"]))
  div.appendChild(newDiv)
}

function appendInfo(toys){
  console.log(toys)
  // const toyDiv = document.getElementById("toy-collection")
  // // toys.forEach((toy) => {}
  // for (let i = 0; i < toys.length; i++){
  //   addDiv(toyDiv, toys[i])
  // }
}

function fetcher() {
  fetch("http://localhost:3000/toys")
  .then(function(response){
      return response.json()
  }).then(function(json){
    appendInfo(JSON.stringify(json))
  })
}

fetcher()
// appendInfo(toyInfo)

document.addEventListener("DOMContentLoaded", () => {
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
