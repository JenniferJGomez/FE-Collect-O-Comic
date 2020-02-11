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

function fetchUser(){
    fetch("http://localhost:3000/users/1")
    .then(response => response.json())
    .then(user =>{
        
    let userComics = user.comic_books
    displaysNerdCollection(userComics)
    })
    
}

function getAllComics(){
    let allComicBtn = document.querySelector('#all-comic')
    allComicBtn.addEventListener('click', fetchComics)
    // let listedComics = document.querySelector('#listed-comics')
    // // debugger
    // if (listedComics.style.display == "none"){
    //     listedComics.style.display = "block"
    // }
    // else{
    //     listedComics.dataset.listToggle = ""
    //     listedComics.style.display = "none"
    // }
    // })
}


function fetchComics(){
    let listedComic =  document.querySelector('#listed-comics') 
    listedComic.innerHTML = ""
    fetch("http://localhost:3000/comic_books")
    .then(resp => resp.json())
    .then(comics => {
        allComics = comics
        renderComics()
    })
}

function renderComics(){
    allComics.forEach(comic => buildComicCard(comic))
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
    
    
    function fetchSpecificComic(comicId){
        fetch(`http://localhost:3000/comic_books/${comicId}`)
        .then(response => response.json())
        .then(comic => displayComicDetailPage(comic))
    }

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
        
        let addComicBtn = document.createElement('button')
        addComicBtn.innerText = "Add to Collection"
        addComicBtn.addEventListener('click', ()=>addToCollection(comic))
        
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
        getListedComics().appendChild(randBtn)

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
    
        let randomCard = document.createElement('div')
        randomCard.className = "random-card"

        let randomName = document.createElement('h2')
        randomName.innerText = random_item.name

        let randomImg = document.createElement('img')
        randomImg.src = random_item.image

        getListedComics().appendChild(randomCard)
        randomCard.append(randomName, randomImg)
    }


    function clearDiv(div){
        while(div.firstChild){
          div.firstChild.remove()
        }
      }
    