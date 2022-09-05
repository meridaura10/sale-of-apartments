import { addImages } from "../../plugins/addImages";
import { slider } from "../../plugins/clider";
import { firebaseGet, firebasePatch, firebasePost, firebaseRemove } from "../../utils/firebase";
import { addButtonApartment } from "../../utils/addBtn";
export class Apartments{
  static createApartment(auth){
    const apartmentsList = firebaseGet()
    document.getElementById('card-list').innerHTML = ''
    apartmentsList.then(response => response.forEach(content =>{
      Apartments.crateApartmentHtml(content, auth)
    })) 
  }
  static crateApartmentHtml(content, auth){
      let contentImgLength = content.img.length
      let sliderBtnHtml = ''
      if (contentImgLength > 1) {
        sliderBtnHtml = `
        <button class="slider-prev"></button>
        <button class="slider-next"></button>`
      }
      let htmlChangeDate = ''
      if (content.apartmentDataChange && content.apartmentDataTimeChange) {
        htmlChangeDate = `        <div class="card-text dateChange">
        <span class="dateChangeText">останній раз змінювали в: </span>
        <p class="apartment-dateChange">
        <span class="dateTime">${content.apartmentDataChange}</span>
        <span class="date">${content.apartmentDataTimeChange}</span>
      </p>
      </div>`
      }
      let html = `  
      <div data-ApartmnetId="${content.id}" class="apartment">
      <div class="apartment__img">
          <div class="apartment__slider">
              <div id="slider-line" class="apartment__slider-line">

              </div>
              ${sliderBtnHtml}
          </div>
      </div>
      <div class="apartment__content">
          <div class="card-text">
              <span>Ціна:</span>
              <div class="text-price"><p class="price">${content.price}</p><span class="currency">грн</span></div>
          </div>
          <div class="card-text">
            <span>Місце:</span>
            <p class="location">${content.Location}</p>
          </div>
          <div class="card-text">
          <span>кімнат:</span>
          <p class="room">${content.room}</p>
          </div>
          <div class="card-text card-text-date">
          <span>date:</span>
          <p class="apartment-date">
             <span class="dateTime">${content.dateTime}</span>
             <span class="date">${content.date}</span>
          </p>
          </div>
          ${htmlChangeDate}
      </div>
     </div> 
    `
    document.getElementById('card-list').insertAdjacentHTML(`afterbegin`, html)
    addButtonApartment(auth,'.apartment',content.id)
    renderImgToCard(content,'slider-line')
    slider({sliderLine: '#slider-line',sliderNext: '.slider-next',offset: 600,sliderPrev:'.slider-prev',},content.img.length)  
    if (auth) {
      document.getElementById(content.id).addEventListener('click',Apartments.changeAprartment)
      Apartments.removeApartment('#remove',content.id)
    }
  }
  static removeApartment(selectorBtn,idApartment){
    const btn = document.querySelector(selectorBtn)
    const apartment = document.querySelector(`[data-ApartmnetId = ${idApartment}]`)
    btn.addEventListener('click',() =>{
      apartment.parentNode.removeChild(apartment);
      firebaseRemove(`https://sale-apartments-default-rtdb.firebaseio.com/apartments/${idApartment}.json`)
    })
  }
  static changeAprartment(event){
    const apartmentId = event.target.id
    const apartment = document.querySelector(`[data-ApartmnetId=${apartmentId}]`)
    const Location = apartment.querySelector('.location').textContent
    const price = apartment.querySelector('.price').textContent
    const room = apartment.querySelector('.room').textContent
    const objApartment = {
      Location,
      price,
      room,
      apartmentId,
    }
    activateModal(objApartment)
  }
  static addApartment(){
    document.getElementById('add-apartment').addEventListener('click', activateModalAddApartment)
  }
}

function renderImgToCard(content, idListImg) {
  const cardListImg = document.getElementById(idListImg)
  content.img.forEach(src =>{
    cardListImg.insertAdjacentHTML('afterbegin',`<img class="card-img" src="${src}" alt="">`)
  })
}
function activateModalAddApartment() {
  const modalEl = document.createElement('div');
  modalEl.style.maxWidth = '1000px'
  modalEl.style.margin = '100px auto';
  modalEl.style.padding = '60px'
  modalEl.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  modalEl.innerHTML =  `
  <form id="form-addApartment" class="mui-form">
    <legend>додати нову квартиру</legend>
    <div class="mui-textfield mui-textfield--float-label">
        <input id="input-price-addApartment"  type="text">
        <input id="input-img-addApartment"  type="file">
        <label>price:</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input id="input-room-addApartment"  type="text">
    <label>room:</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input id="input-location-addApartment"  type="text">
    <label>location</label>
    </div>
    <button id="btn-img" type="button">додати картинку</button>
    <button disabled id="input-submit-addApartment" type="submit" class="mui-btn mui-btn--raised">створити</button>
    <div class="preview">

    </div>
    </form>
  `
  mui.overlay( 'on', modalEl);
    const form = document.getElementById('form-addApartment')
    form.addEventListener('input', () =>{
    const price = form.querySelector('#input-price-addApartment').value
    const room = form.querySelector('#input-room-addApartment').value
    const Location = form.querySelector('#input-location-addApartment').value
    const img = form.querySelectorAll('img')
    if (price && room && Location && img.length > 0) {
      form.querySelector('#input-submit-addApartment').disabled = false
    }else{
      form.querySelector('#input-submit-addApartment').disabled = true
    }
  })
  addImages(
    {
     input: '#input-img-addApartment',
     btn: '#btn-img',
     preview: '.preview'
     },
    {
     multi: true,
     accept: ['.png', '.jpg', '.jpeg', '.gif']
   })
  form.addEventListener('submit',getDataForTheApartment)
}


function getDataForTheApartment(event) {
  event.preventDefault()
  const form = event.target
  const img = form.querySelectorAll('img')
  const price = form.querySelector('#input-price-addApartment').value
  const room = form.querySelector('#input-room-addApartment').value
  const Location = form.querySelector('#input-location-addApartment').value
  const date = new Date
  const apartmentData = date.toLocaleDateString()
  const apartmentDataTime = date.toLocaleTimeString()
  let srcToImgNewApartment = []
  img.forEach(img =>{
    srcToImgNewApartment.push(img.src)
  })
  let newApartment = {
    price,
    room,
    Location,
    img: srcToImgNewApartment,
    date: apartmentData,
    dateTime: apartmentDataTime
  }
  firebasePost(newApartment)
  .then(response => response.json())
  .then(data => {
    newApartment.id = data.name
    Apartments.crateApartmentHtml(newApartment, localStorage.getItem('auth'))
    mui.overlay('off')
  })
}
function activateModal(content) { 
  const modalEl = document.createElement('div');
  modalEl.style.width = '500px';
  modalEl.style.height = '300px';
  modalEl.style.margin = '100px auto';
  modalEl.style.padding = '60px'
  modalEl.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  modalEl.innerHTML =  `
  <form id="form-change" class="mui-form">
    <legend>змінити данні квартири</legend>
    <div class="mui-textfield mui-textfield--float-label">
        <input id="input-price" value="${content.price}" type="text">
        <label>price:</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input id="input-room" value="${content.room}" type="text">
    <label>room:</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
    <input id="input-location" value="${content.Location}" type="text">
    <label>location</label>
    <button disabled  id="input-submit-change" type="submit" class="mui-btn mui-btn--raised">зберегти</button>
    </form>
  `
  mui.overlay( 'on', modalEl);
    const form = document.getElementById('form-change')
    form.addEventListener('input', () =>{
      const form = document.getElementById('form-change')
      const Location = form.querySelector('#input-location').value
      const price = form.querySelector('#input-price').value
      const room = form.querySelector('#input-room').value
      const date = new Date
      const apartmentDataChange = date.toLocaleDateString()
      const apartmentDataTimeChange = date.toLocaleTimeString()
      if (price && room && Location) {
        form.querySelector('#input-submit-change').disabled = false
        form.addEventListener('submit', (event) =>{
          event.preventDefault()
          const newApartment = {
            Location,
            price,
            room,
            apartmentDataChange,
            apartmentDataTimeChange
          } 
          const apartment = document.querySelector(`[data-ApartmnetId=${content.apartmentId}]`)
          apartment.querySelector('.location').innerHTML = newApartment.Location
          apartment.querySelector('.price').innerHTML = newApartment.price
          apartment.querySelector('.room').innerHTML = newApartment.room



         // addchangedate('.card-text-date',apartment,{apartmentDataTimeChange,apartmentDataChange})


          
          firebasePatch(`https://sale-apartments-default-rtdb.firebaseio.com/apartments/${content.apartmentId}.json`,newApartment)
          mui.overlay('off')
        })
      }else{
        form.querySelector('#input-submit-change').disabled = true
      }
    })  
    // function addchangedate(selector,apartment,content) {
    //   apartment.querySelector(selector).insertAdjacentHTML('afterend', `        <div class="card-text dateChange">
    //   <span class="dateChangeText">останній раз змінювали в: </span>
    //   <p class="apartment-dateChange">
    //   <span class="dateTime">${content.apartmentDataChange}</span>
    //   <span class="date">${content.apartmentDataTimeChange}</span>
    // </p>
    // </div>`)
    // }
}