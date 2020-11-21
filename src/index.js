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

function renderToys(toys) {
  
}