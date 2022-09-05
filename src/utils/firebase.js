const urlFirebaseApartments = 'https://sale-apartments-default-rtdb.firebaseio.com/apartments.json'
export function firebasePost(content) {
    if (Array.isArray(content) === true) {
      content.forEach(element => {
       return fetch(urlFirebaseApartments, {
            method: "POST",
            body: JSON.stringify(element),
            Headers: {
                'Content-Type': 'applications/json'
            }
     })
      });
    }else{
        return fetch(urlFirebaseApartments, {
            method: "POST",
            body: JSON.stringify(content),
            Headers: {
                'Content-Type': 'applications/json'
            }
     })
    }
}
export function firebaseGet(url) {
  return fetch(url || urlFirebaseApartments)
    .then(response => response.json())
    .then(response => {
        return response ?  Object.keys(response).map(key =>({
            ...response[key],
            id: key
        })): []
    })
}
export function firebasePatch(url, element) {
    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify(element || ''),
        Headers: {
            'Content-Type': 'applications/json'
        }
    })
    .then(response => response.json())
}
export function firebaseRemove(url) {
    fetch(url, {
    method: 'DELETE',
    })
}