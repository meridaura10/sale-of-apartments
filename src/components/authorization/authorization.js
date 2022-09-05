import { addBtnToHeader, addChangeBtnToCard } from "../../utils/addBtn"
import { removeBtnChangeCard } from "../../utils/removeBtn"
import { Apartments } from "../apartments/apartments"
export class Authorization{
    static authorizationModal(){
        const btnAuthorization = document.getElementById('btn-authorization')
        btnAuthorization.addEventListener('click',createModal)
    }
    static authorizationSubmit(){
        const form = document.getElementById('form-authorization')
        form.addEventListener('submit',takeEmailAndPassword)
    }
    static authWithEmailAndPassword(email, password){
        const  apiKey =  "AIzaSyDXrEs0h_TjyGRf59PsjzfQnulIuY3b3W0"
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data.idToken)
    }
     static exit(){
       const btnExit = document.getElementById('btn-exit')
       btnExit.addEventListener('click',(event) =>{
            event.target.disabled = true
            removeBtnChangeCard('.card-btn')
            localStorage.setItem('auth', JSON.stringify(''))})
    }
}



function takeEmailAndPassword(event){
    event.preventDefault()
    const email = event.target.querySelector('#input-email').value
    const password = event.target.querySelector('#input-password').value 
     Authorization.authWithEmailAndPassword(email, password)
    .then(token => {

        localStorage.setItem('auth', JSON.stringify(token))
        Apartments.createApartment(token)
        addBtnToHeader(token)


    })
    mui.overlay('off')
}





function createModal() {
    const modalEl = document.createElement('div');
    modalEl.style.width = '500px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.padding = '60px'
    modalEl.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    modalEl.innerHTML = `
    <form id="form-authorization" class="mui-form">
      <legend>авторизація</legend>
      <div class="mui-textfield mui-textfield--float-label">
          <input id="input-email" type="email">
          <label>email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
      <input id="input-password" type="password">
      <label>password</label>
      </div>
      <button   id="input-submit" type="submit" class="mui-btn mui-btn--raised">відправити</button>
      </form>
    `
    mui.overlay( 'on', modalEl);
    Authorization.authorizationSubmit()
}