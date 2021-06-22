// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
  
  
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// function getToys(){ 
//   return fetch("http://localhost:3000/toys")
//   .then(response => response.json)
//   .then(json => console.log(json));
// }
// });

// function postToy(toy_data) {
//   fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "name": toy_data.name.value,
//         "image": toy_data.image.value,
//         "likes": 0

//       })
//     })
//     .then(res => res.json())
//     .then((obj_toy) => {
//       renderToys(obj_toy)
//     })
// }

// function likes(e) {
//   e.preventDefault()
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"

//       },
//       body: JSON.stringify({
//         "likes": more
//       })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//       e.target.previousElementSibling.innerText = `${more} likes`;
//     }))
// }

// function renderToys(toy) {
//   let h2 = document.createElement('h2')
//   h2.innerText = toy.name

//   let img = document.createElement('img')
//   img.setAttribute('src', toy.image)
//   img.setAttribute('class', 'toy-avatar')

//   let p = document.createElement('p')
//   p.innerText = `${toy.likes} likes`

//   let btn = document.createElement('button')
//   btn.setAttribute('class', 'like-btn')
//   btn.setAttribute('id', toy.id)
//   btn.innerText = "like"
//   btn.addEventListener('click', (e) => {
//     console.log(e.target.dataset);
//     likes(e)
//   })

//   let divCard = document.createElement('div')
//   divCard.setAttribute('class', 'card')
//   divCard.append(h2, img, p, btn)
//   divCollect.append(divCard)
// }

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitButton = document.querySelector(".submit");

  getToys();
  addButton.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    addNewToy();
  });
});

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        putToCollection(element);
      });
    });
}

function addNewToy() {
  const name = document.getElementsByName("name")[0];
  const image = document.getElementsByName("image")[0];

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name: name.value, image: image.value, likes: 0 }),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(element => {
      putToCollection(element);
      name.value = "";
      image.value = "";
    });
}

function addNewLike(id, button) {
  button.disabled = true;
  const p = document.querySelector(`#L${id}`);
  const likes = parseInt(p.innerText) + 1;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes }),
  };
  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(response => response.json())
    .then(json => {
      p.innerText = likes + " Likes";
      button.disabled = false;
    });
}

function putToCollection(element) {
  const collection = document.querySelector("#toy-collection");
  collection.innerHTML += `<div class="card">
        <h2>${element.name}</h2>
        <img src="${element.image}" class="toy-avatar" />
        <p id="L${element.id}">${element.likes} Likes </p>
        <button class="like-btn"  id="B${element.id}">Like <3</button>
      </div>`;
  const button = document.querySelector(`#B${element.id}`);
  button.addEventListener("click", function (event) {
    console.log("dsf");
    addNewLike(element.id, event.target);
  });
}
