class Card {
    constructor(dataCat, selectorTemplate) {
        this.dataCat = dataCat;
        this.selectorTemplate = selectorTemplate;
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this.selectorTemplate).content.querySelector('.card');
    
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона
        this.cardTitle = this.element.querySelector('.card__name');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardLike = this.element.querySelector('.card__like');
        this.cardRate = this.element.querySelector('.card__rate'); 
        this.cardAge = this.element.querySelector('.card__age'); 
        this.cardDescription = this.element.querySelector('.card__description'); 
        this.cardisFavourite = this.element.querySelector('.card__favourite')


        return this.element
    }

    setElement() {

    }
    
}

