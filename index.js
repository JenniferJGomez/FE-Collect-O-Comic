document.addEventListener("DOMContentLoaded", ()=> {
    fetchComics()
    getNerdCollection()
    getAllComics()
    getSearchform().submit.addEventListener('click', submittingForm)
    getRandomizerBtn().addEventListener('click', randomizerHandler)

})

let allComics = []

function getSearchform(){
    return document.querySelector('#search-bar')
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

function getAllComics(){
    let allComicBtn = document.querySelector('#all-comic')
    allComicBtn.addEventListener('click', fetchComics)
}


function fetchComics(){
    let listedComic =  document.querySelector('#listed-comics') 
    listedComic.innerHTML = ""
    fetch("http://localhost:3000/comic_books")
    .then(resp => resp.json())
    .then(comics =>{
     allComics = comics
     renderComics() })
}

function renderComics(searchedComics){
    
    let comics = searchedComics ? searchedComics : allComics
    comics.forEach(comic => buildComicCard(comic))

}


function buildComicCard(comic){
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
    }
    
    
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
        `
        // <button id = "rating-button">Submit</button>

        // debugger
        let ratingBtn = document.createElement('button')
        ratingBtn.id = 'rating-button'
        ratingBtn.innerText = "Submit Rating"
        comicRating.appendChild(ratingBtn)
        ratingBtn.addEventListener('click', (event)=>submitRating(event, comic))
       
        let backBtn = document.createElement('button')
        backBtn.innerText = "Back"
        backBtn.addEventListener('click', fetchComics)
        
        // add to collection button
        let addComicBtn = document.createElement('button')
        
        addComicBtn.innerText = "Add to Collection"
        addComicBtn.addEventListener('click', ()=>fetchUser(null,comic))
        
        comicDiv.append(comicName, comicImage, comicDescription, comicEpisodeCount, comicRating, backBtn, addComicBtn)
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

    //randomizer functions

    function getRandomizerBtn(){
        return document.getElementById('randomizer')
    }

    function getListedComics(){
        return document.getElementById('listed-comics') 
    }

    function randomizerHandler(event){
        clearDiv(getListedComics())

        let randBtn = document.createElement('button')
        randBtn.innerText = "Get Random Comic"
        let randomContainer = document.createElement('div')
        randomContainer.className = "random-container"
        getListedComics().append(randBtn, randomContainer)

        randBtn.addEventListener('click', ()=> 
            fetch("http://localhost:3000/comic_books")
            .then(resp => resp.json())
            .then(comicArray => randomFunction(comicArray))
            )
        
    }

    function randomFunction(comicArray){
        const length = comicArray.length
        const random_number = Math.floor((Math.random() * length-1))
        const random_item = comicArray[random_number]
        
        let randomContainer = document.querySelector('.random-container')
        clearDiv(randomContainer)
    
        let randomCard = document.createElement('div')
        randomCard.className = "random-card"

        let randomName = document.createElement('h2')
        randomName.innerText = random_item.name

        let randomImg = document.createElement('img')
        randomImg.src = random_item.image

        randomContainer.appendChild(randomCard)
        randomCard.append(randomName, randomImg)
    }


    function clearDiv(div){
        while(div.firstChild){
          div.firstChild.remove()
        }
      }
    

    function submittingForm(e){
        e.preventDefault()
        let parentForm = e.target.parentElement
        let searchComic =  parentForm.userInput.value.toLowerCase()
        let searchResult =allComics.filter(comic => comic.name.toLowerCase().includes(searchComic))
        let listedComics = document.querySelector('#listed-comics')
        clearDiv(listedComics)
        renderComics(searchResult)
        e.target.parentElement.reset()
        
    }

   
   function submitRating(event, comic){
        console.log(event)
        debugger
        // let ratingValue = ratingBtn.parentElement.children[1].value
        // parseInt(ratingValue)
   }
