const container = document.querySelector('.colleges');

const renderColleges = async () => {
  let uri = 'http://localhost:3000/colleges?_sort=likes&_order=desc';


  //need to fix, change to then
  const res = await fetch(uri);
  const colleges = await res.json()
  
  let template = '';
  colleges.forEach(colleges => {
    template += `
    <div class="colleges">
    </div>  <h2>${colleges.name}</h2>
      <p><small>${colleges.likes} likes</small></p>
      <p>${colleges.description}</p>
      <img src="${colleges.imageUrl}">
      <button class="likes" id="likes">Likes ❤️</button>
        `
   })

  container.innerHTML = template;
}

//create more Colleges posts

const form = document.querySelector('form');

const createColleges = async (e) => {
  e.preventDefault();


  const doc = {
    name: form.name.value,
    description: form.description.value,
    likes: 0,
    imageUrl: form.imageUrl.value,
  }
  
  //need to fix, change to then
  //await fetch('http://localhost:3000/colleges', {
   fetch('http://localhost:3000/colleges', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })
  }



  //LIKES

  function likes(e) {
    e.preventDefault()
    let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
    fetch(`http://localhost:3000/colleges/${e.target.id}`, {
      method: 'PATCH',
      body: JSON.stringify(doc),
      headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then((likes_obj => {
       e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  
    }
  

//Event Listener 3 (add new colleges created with the form on the data)
form.addEventListener('submit', createColleges);


//Event Listener 2 (render colleges in the page after refresh)
window.addEventListener('DOMContentLoaded', renderColleges); 




  


