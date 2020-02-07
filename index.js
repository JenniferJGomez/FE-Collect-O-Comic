document.addEventListener("DOMContentLoaded", ()=> {
    getNerdCollection()
    getAllComics()
})

function getNerdCollection(){
    let userCollectionBtn = document.querySelector('#user-collection')
    userCollectionBtn.addEventListener('click',()=>console.log("getting user collection"))
    
}

function getAllComics(){
    let allComicBtn = document.querySelector('#all-comic')
    allComicBtn.addEventListener('click', () => console.log('getting all comics'))
}