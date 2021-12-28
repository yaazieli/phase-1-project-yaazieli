const container = document.querySelector('.colleges');

//Render colleges in page
function renderAllColleges() {
  fetch('http://localhost:3000/colleges?_sort=likes&_order=desc')
  .then(res => res.json())
  .then(colleges => colleges.forEach(colleges => renderOneCollege(colleges)))
}
  
//DOM render function and adding template for colleges listing
 function renderOneCollege(colleges){
  let template = document.createElement('ol')
  template.className = 'colleges'
  template.innerHTML = `
     <div class="colleges">
    </div>  <h3>${colleges.name}</h3>
      <p><span class="likes-count">${colleges.likes} </span> Likes</p>
      <p>${colleges.description}</p>
      <img src="${colleges.imageUrl}">
      <button class="likes" id="likes-btn">Likes ❤️</button>
      `

      template.querySelector('#likes-btn').addEventListener('click', () => {
        colleges.likes+= 1
        template.querySelector('span').textContent = colleges.likes
        //should add code fetch to keep this updated after refresh
      })

  //Add list to DOM
 document.querySelector('.colleges').appendChild(template)
}



//Event Listener 1 (render colleges in the page - need to refresh after new ones added with the below form))
window.addEventListener('DOMContentLoaded', renderAllColleges); 


//Event Listener 2 (add new colleges created with the form on the data)
document.querySelector('form').addEventListener('submit', handleSubmitColleges);


// Event Handler: Create more colleges using the form

function handleSubmitColleges(e) {
  e.preventDefault()
  const collegesObj = {
    name: e.target.name.value,
    description: e.target.description.value,
    likes: 0,
    imageUrl: e.target.imageUrl.value,
  }
  renderOneCollege(collegesObj)
  addColleges(collegesObj)
}
  
//Fetch request - Post Method to add data via the form, using promise to get response from json
  function addColleges(collegeObj) { 
  fetch('http://localhost:3000/colleges', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(collegeObj),
  })
  .then(res => res.json())
  console.log(collegeObj)
  }



