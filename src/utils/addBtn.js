export function addBtnToHeader(auth) {
    const headersNav = document.getElementById('btn-exit')
    if (auth) {
        headersNav.innerHTML = `<button id="btn-exit" class="mui-btn mui-btn--accent">вийти</button>`
    }else{
        headersNav.innerHTML = ` <button id="btn-exit" disabled class="mui-btn mui-btn--accent">вийти</button>`
    }
}
export function addButtonApartment(auth, selector,id) {
    const element = document.querySelector(selector)
    const htmlBtn = ` 
    <div class="card-btn">
        <button id=${id} class="mui-btn mui-btn--primary btn-change">змінити дінні</button>
        <button id="remove" class="mui-btn mui-btn--danger">видалити</button>
    </div>`
    if (auth) {
        element.insertAdjacentHTML('beforeend', htmlBtn)
    }
}
