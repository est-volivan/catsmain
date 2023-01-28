
const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const sectionCard = document.querySelector('.cards');

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();
console.log(popupAddCat)
cats.forEach(el => {
    const cat = new Card(el, '#card-template')
    const catElement = cat.getElement()
    cat.cardImage.setAttribute('src', `${el.img_link}`)
    cat.cardTitle.innerText = el.name
    cat.cardRate.innerText = el.rate
    cat.cardAge.innerText = el.age
    cat.cardDescription.innerText = el.description
    if (el.favourite) {
        cat.cardisFavourite.style.color = "red";
    }
    sectionCard.append(catElement);
})

function handleFormAddCat(e) {
    e.preventDefault()

    popupAddCat.close();
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);