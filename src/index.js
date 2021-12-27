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
      <h2>${colleges.name}</h2>
      <p><small>${colleges.likes} likes</small></p>
      <p>${colleges.description}</p>
      <img src="${colleges.imageUrl}">
        `
   
  })

  container.innerHTML = template;
}
window.addEventListener('DOMContentLoaded', () => renderColleges()); //need to fix//


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
  await fetch('http://localhost:3000/colleges', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

// : causing page refresh-- window.location.replace('index.html')
}

form.addEventListener('submit', createColleges);

