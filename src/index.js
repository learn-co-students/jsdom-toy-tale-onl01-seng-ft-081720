let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  getData();
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

  document.querySelector(".add-toy-form").addEventListener("submit",function (e){
    const data = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    };
    submitData(data);
  })


});

function addToys(object){
    let collection = document.getElementById("toy-collection");
    let div = document.createElement('div')
    div.class= "card";
    let h2 = document.createElement("h2");
    h2.innerText = `${object.name}`;
    let img = document.createElement("img");
    img.src = `${object.image}`;
    img.class = "toy-avatar";
    let p = document.createElement("p");
    p.id = `${object.id}`;
    p.innerText = `${object.likes} Likes`;
    let btn = document.createElement("button");
    btn.class = "like-btn";
    btn.innerText = "Like <3";
    btn.addEventListener("click",(e) => {
      updateLikes(object);
      e.stopPropagation;
      });

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);
    collection.appendChild(div);

  }

  function submitData (data){
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(data)
    };
  
    return fetch("http://localhost:3000/toys",configObj)
        .then(response => response.json())
        .then(object => addToys(object))
        .catch(error => document.body.innerHTML += error.message)
  }
  
  
  function getData (){
    
    return fetch("http://localhost:3000/toys")
        .then(response => response.json())
        .then(object => {
          object.forEach(el => addToys(el))
          
        } )
        .catch(error => document.body.innerHTML += error.message)
  }
  
  
function updateLikes (object){
  let likeCount = parseInt(object.likes);
  likeCount += 1 ;
  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount

    })
  };

  return fetch(`http://localhost:3000/toys/${object.id}`,configObj)
      .then(response => response.json())
      .then(object => {
        document.getElementById(object.id).innerText = `${likeCount} likes`
      })
      .catch(error => document.body.innerHTML += error.message)
    
}

