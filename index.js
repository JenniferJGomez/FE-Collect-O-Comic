document.addEventListener("DOMContentLoaded", ()=> {
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
    allComicBtn.addEventListener('click', () => console.log('getting all comics'))
}