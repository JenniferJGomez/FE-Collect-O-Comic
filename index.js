document.addEventListener("DOMContentLoaded", ()=> {
    fetchComics()
    getNerdCollection()
    getAllComics()
    getSearchform().submit.addEventListener('click', submittingForm)
    getRatingSubmit()
})

function getSearchform(){
    return document.querySelector('#search-bar')
}

function submittingForm(e){
    e.preventDefault()
    let parentForm = e.target.parentElement
    let userInput =  parentForm.userInput.value
    console.log('submiting')
}

function getNerdCollection(){
    let userCollectionBtn = document.querySelector('#user-collection')
    userCollectionBtn.addEventListener('click', fetchUser)
}
// fetches the user comics
function fetchUser(event,comic){
    fetch("http://localhost:3000/users/1")
    .then(response => response.json())
    .then(user =>{
        
    let userComics = user.comic_books
  
    if(!comic){
        displaysNerdCollection(userComics)
    }else{
        fetch('http://localhost:3000/collections', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({user_id: user.id, comic_book_id: comic.id}),
          })
            
          .then((response) =>response.json())
          .then(data => {
            new_array = Array.from(data)
              displaysNerdCollection(new_array)
            
            })
       

    }
    })
    
}
// get all comics button
function getAllComics(){
    let allComicBtn = document.querySelector('#all-comic')
    allComicBtn.addEventListener('click', () => {
    let listed_comics = document.querySelector("#listed-comics")
    listed_comics.style.display = "block"
    })
}
// fetches all general comics
function fetchComics(){
    let listedComic =  document.querySelector('#listed-comics') 
    listedComic.innerHTML = ""
    fetch("http://localhost:3000/comic_books")
    .then(resp => resp.json())
    .then(comicArray => buildComicCard(comicArray) )
}
// builds out the cards for an array of comics
function buildComicCard(comicArray){
    comicArray.forEach(comic => {
        let listedComic =  document.querySelector('#listed-comics')    
        
        let comicCard = document.createElement('div')  
        comicCard.className = 'comic-card'
        
        comicCard.id = comic.id
        
        let comicName = document.createElement('h3')
        comicName.innerText = comic.name
        
        let comicImage = document.createElement('img')
        comicImage.src = comic.image
        // button for specific card
        let comicBtn = document.createElement('button')
        comicBtn.innerText = "Comic Details"
        comicBtn.addEventListener('click', () => fetchSpecificComic(comicCard.id))
        
        listedComic.appendChild(comicCard)
        comicCard.append(comicName, comicImage, comicBtn)
    })
    
    // grabs a specific comic
    function fetchSpecificComic(comicId){
        fetch(`http://localhost:3000/comic_books/${comicId}`)
        .then(response => response.json())
        .then(comic => displayComicDetailPage(comic))
    }
// displays comic show page
    function displayComicDetailPage(comic){
        let list = document.querySelector("#listed-comics")
        list.innerHTML = ""
        let listedComic =  document.querySelector('#listed-comics') 
        // card
        let comicDiv = document.createElement('div')  
        comicDiv.className = 'comic' 
        listedComic.appendChild(comicDiv)
        
        let comicName  = document.createElement('h1')
        comicName.innerText = comic.name
        
        let comicImage = document.createElement('img')
        comicImage.src = comic.image
        
        let comicDescription = document.createElement('p')
        comicDescription.innerText = comic.description
        
        let comicEpisodeCount = document.createElement('p')
        comicEpisodeCount.innerText = `Number of episodes: ${comic.count_of_episodes}`
        
        let comicRating = document.createElement('p')
        // comicRating.innerText = `Rating: ${comic.rating}`
        comicRating.className = "ratings"
        
        comicRating.innerHTML = `Current Rating: ${comic.rating}
        <label for="rating-box">Rate this Comic:</label>
        <select id = "rating-box">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        <button id = "rating-button">Submit</button>
        `
       
        let backBtn = document.createElement('button')
        backBtn.innerText = "Back"
        backBtn.addEventListener('click', fetchComics)
        
        // add to collection button
        let addComicBtn = document.createElement('button')
        
        addComicBtn.innerText = "Add to Collection"
        addComicBtn.addEventListener('click', ()=>addComicToCollection(comic))
        
        comicDiv.append(comicName, comicImage, comicDescription, comicEpisodeCount, comicRating, backBtn, addComicBtn)
    }
}
    function addComicToCollection(comic){
       fetchUser(null, comic)

       
        
    }
    
    function displaysNerdCollection(userComics, fetchSpecificComic){
        let listedComic =  document.querySelector('#listed-comics') 
        listedComic.innerHTML = ""
        listedComic.style.display = "block"
        
        userComics.forEach(comic =>{
            let comicCard = document.createElement('div')
            comicCard.className = 'comic-card'
            let comicName = document.createElement('h3')
            comicName.innerText = comic.name 
            
            let comicImage = document.createElement('img')
            comicImage.src = comic.image
            // button for specific card
            comicCard.id = comic.id
            let comicBtn = document.createElement('button')
            comicBtn.innerText = "Comic Details"

            comicBtn.addEventListener('click', ()=> fetchSpecificComic)
            
            listedComic.appendChild(comicCard)
            
            comicCard.append(comicName, comicImage, comicBtn)
        })
        
    }





    // function for grabbing submit button

    function getRatingSubmit(){
        let ratingSubmit = document.querySelector('#rating-button')
        ratingSubmit.addEventListener('submit', submitingRating)
    }
   
   function submitingRating(){
    let ratingValue = submitBtn.parentElement.children[1].value
    parseInt(ratingValue)
    debugger
   }
