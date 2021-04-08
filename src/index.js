let addToy = false;

function generate_div(toy_col) {
  let div = document.createElement('div')
  div.classList.add('card')
  return div
}

function generate_h2(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = `${toy.name}`
  return h2
}

function generate_img(toy) {
  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')
  return img
}

function generate_p(toy) {
  let p = document.createElement('p')
  p.innerText = `likes ${toy.likes}`
  return p
}

function generate_button(toy) {
  let button = document.createElement('button')
  button.innerText = 'Like <3'
  button.classList.add('like-btn')
  button.addEventListener("click", () => {        
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
      },
      body: JSON.stringify({'likes': toy.likes + 1})
    })
    .then(function(json){
      const toremove = document.getElementById('toy-collection')
      toremove.innerHTML = ""
      loadmenu();
    })
  })
  return button
}

function loadmenu(){
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    let toy_col = document.getElementById('toy-collection')
    json.forEach(function(toy){
      div = generate_div(toy_col)
      h2 = generate_h2(toy)
      img = generate_img(toy)
      p = generate_p(toy)
      button = generate_button(toy)
      toy_col.appendChild(div)
      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)
    })
  })
  event.preventDefault()
}


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
  loadmenu();
  submit_toy();
})

function submit_toy(){
  let add_toy_form = document.getElementsByClassName('add-toy-form')
  let name = add_toy_form[0].getElementsByClassName('input-text')[0]
  let image = add_toy_form[0].getElementsByClassName('input-text')[1]
  let submit = add_toy_form[0].getElementsByClassName('submit')[0]
  submit.addEventListener('click', event => {
    event.preventDefault()
    new_toy = {name: name.value, image: image.value, likes: 0}
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(new_toy)
      })
    const toremove = document.getElementById('toy-collection')
    toremove.innerHTML = ""
    loadmenu();
  })
}