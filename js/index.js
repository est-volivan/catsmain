const removeAllEmpty = (obj) => {
    const newObj = {}
    for(let key in obj){
        if (obj[key] || key === "favorite") {
            newObj[key] = obj[key]
        }
    }
    return newObj;
}

const handleResponse = (message) => {   
    alert(message)
    location.reload() //перезагрузка страницы
}

catsArray = [] 

fetch ("https://cats.petiteweb.dev/api/single/est-volivan/show") //отображение котов
    .then(response => response.json())
    .then(data => {
        catsArray.push(...data)
        catsArray.forEach(el => {
            const cat = new Card(el, '#card-template') //создаем экземпляр класса
            const catElement = cat.getElement()
            cat.cardImage.setAttribute('src', `${el.image}`)
            cat.cardTitle.innerText = el.name
            cat.cardRate.innerText = el.rate
            cat.cardAge.innerText = el.age
            cat.cardDescription.innerText = el.description
            if (el.favorite) {
                cat.cardIsFavorite.style.color = "red";
            }
            sectionCard.append(catElement);
        })
    })
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const formEditCat = document.querySelector('#edit-form-cat')
const sectionCard = document.querySelector('.cards');


const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();
catsArray.forEach(el => {
    const cat = new Card(el, '#card-template')
    const catElement = cat.getElement()
    cat.cardImage.setAttribute('src', `${el.image}`)
    cat.cardTitle.innerText = el.name
    cat.cardRate.innerText = el.rate
    cat.cardAge.innerText = el.age
    cat.cardDescription.innerText = el.description
    if (el.favorite) {
        cat.cardisFavorite.style.color = "red";
    }
    sectionCard.append(catElement);
})

const popupEditCat = new Popup("popup-edit-cats");
popupEditCat.setEventListener();
//добавление кота
function handleFormAddCat(e) {
    e.preventDefault()
    let newCat = {}
    newCat.id = formAddCat.querySelectorAll('[name="id"]')[0].value
    newCat.name  = formAddCat.querySelectorAll('[name="name"]')[0].value
    newCat.age  = formAddCat.querySelectorAll('[name="age"]')[0].value
    newCat.rate = formAddCat.querySelectorAll('[name="rate"]')[0].value
    newCat.description = formAddCat.querySelectorAll('[name="description"]')[0].value
    newCat.favorite = formAddCat.querySelectorAll('[name="favorite"]')[0].value === "on" ? true : false
    newCat.image = formAddCat.querySelectorAll('[name="img_link"]')[0].value
    createCat("https://cats.petiteweb.dev/api/single/est-volivan/add",newCat).then(data => handleResponse(data.message))

    popupAddCat.close();
}
const createCat = async (url="", data={}) =>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}
function getCatIdByName(name){
    return catsArray.find(cat => cat.name === name).id
}
const deleteCat = async (url="") =>{
    const response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json'
        },
    })
} //удаление кота 
function handleDeleteButton(e){
    const card = e.parentElement;
    const cardLink = card.querySelector('.card__link')
    const cardName = cardLink.querySelector('.card__name').innerText
    const catId = getCatIdByName(cardName)
    deleteCat(`https://cats.petiteweb.dev/api/single/est-volivan/delete/${catId}`).then(() => handleResponse("Вы удалили котика :( "))
}
const editCatFunction = async (url="", data={}) =>{
    const response = await fetch(url,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
} //редактирование кота
function handleEditButton(e){
    popupEditCat.open()
    const card = e.parentElement;
    const cardLink = card.querySelector('.card__link')
    const cardName = cardLink.querySelector('.card__name').innerText
    const catId = getCatIdByName(cardName)
    const btnCloseEditForm = document.querySelector('#edit')
    btnCloseEditForm.addEventListener('click', () =>  {  
        const editCat = {}
        editCat.name  = formEditCat.querySelectorAll('[name="name"]')[0].value
        editCat.age  = formEditCat.querySelectorAll('[name="age"]')[0].value
        editCat.rate = formEditCat.querySelectorAll('[name="rate"]')[0].value
        editCat.description = formEditCat.querySelectorAll('[name="description"]')[0].value
        editCat.favorite = formEditCat.querySelectorAll('[name="favorite"]')[0].checked
        editCat.image = formEditCat.querySelectorAll('[name="img_link"]')[0].value
        console.log(formEditCat.querySelectorAll('[name="favorite"]')[0].checked)
        editCatFunction(`https://cats.petiteweb.dev/api/single/est-volivan/update/${catId}`, removeAllEmpty(editCat))
            .then((data) => handleResponse(data.message))
        popupEditCat.close()
        })
}
btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);