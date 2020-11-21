let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys()
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

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      renderToys(json);
    })
}

function submitData(name, image) {
  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
    })
    };
   return fetch("http://localhost:3000/toys", configObj)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
          renderToys(toys)
        })
        .catch(function(error) {
            let newObj = document.createElement("p")
            newObj.innerHTML = error.message
            document.body.appendChild(newObj)
          });
}   

function renderToys(toys) {
  const container = document.getElementById('toy-collection')
  for(const toy of toys) {
    let card = document.createElement('div')
      container.appendChild(card)
    let h2 = document.createElement('h2')
      h2.innerText = toy.name
      card.appendChild(h2)
    let img = document.createElement("img")
      img.src = toy.image
      img.className = "toy-avatar"
      card.appendChild(img)
    let p = document.createElement('p')
      // let likeCounter = 0
      p.innerText = `${toy.likes} Likes`
      card.appendChild(p)
    let button = document.createElement('button')
      button.innerText = "Like"
      card.appendChild(button)
      button.onclick = function(){
        // toy.likes += 1
        // p.innerText = `${toy.likes} Likes`
        let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": toy.likes + 1
        })
        };
        return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
        .then(function(resp) {
            return resp.json();
        })        
        .then(function(json) {
          p.innerText = `${toy.likes + 1} Likes`
          console.log(json)
        })
        .catch(function(error) {
            let newObj = document.createElement("p")
            newObj.innerHTML = error.message
            document.body.appendChild(newObj)
          });   
    }
  }
}