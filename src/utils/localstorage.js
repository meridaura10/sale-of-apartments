export function getLocalstorage(key) {
    return JSON.parse(localStorage.getItem(key))
}