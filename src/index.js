let addToy = false;

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

 fetch("http://localhost:3000/toys")
 .then(resp => resp.json())
 .then(data => {findToys(data)})

 function findToys(toys){
   toys.forEach(toy =>{
    const div = document.createElement('div')
    const container = document.getElementById('toy-collection')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const butt = document.createElement('button')
      div.className = 'card'
      h2.innerText = toy.name
      img.src = toy.image
      img.className = "toy-avatar"
      butt.className = "like-btn"
      butt.innerText = "Like <3"
      p.innerText =  toy.likes 
      div.innerHTML += h2.outerHTML + img.outerHTML + p.outerHTML + butt.outerHTML
      container.append(div)
   });
 }
  butt.addEventListener('click',function(){
    
  })


