export function removeBtnChangeCard(selector) {
    const btn = document.querySelectorAll(selector);
    btn.forEach(element =>{
        element.parentNode.removeChild(element);
    })
}
