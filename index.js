document.addEventListener("DOMContentLoaded", ()=> {
    fetchComics()
    getNerdCollection()
    getAllComics()
    getSearchform().submit.addEventListener('click', submittingForm)
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
    userCollectionBtn.addEventListener('click',()=>console.log("getting user collection"))
}
function getAllComics(){
    let allComicBtn = document.querySelector('#all-comic')
    allComicBtn.addEventListener('click', () => {
        let listed_comics = document.querySelector("#listed-comics")
        listed_comics.style.display = "block"
        console.log('getting all comics')
    })
}

function fetchComics(){
    fetch("http://localhost:3000/comic_books")
    .then(resp => resp.json())
    .then(comicArray => buildComicCard(comicArray) )
}

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




    //    let comicDescription = document.createElement('p')
    //    comicDescription.innerText = comic.description

        listedComic.appendChild(comicCard)
        comicCard.append(comicName, comicImage, comicBtn)
    });

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
        
        comicDiv.append(comicName, comicImage, comicDescription)






 
    }
}
