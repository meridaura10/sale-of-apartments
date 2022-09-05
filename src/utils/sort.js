export function sortApartment() {
    const sort = document.getElementById('sort')
    let directionPrice = 1
    let directionRoom = 1
    let directionDate = 1
    sort.addEventListener('click', event =>{
       if (event.target.dataset.sort) {
            const apartment = document.querySelectorAll('.apartment')
            let cardList = Array.from(apartment)
            let sortOptions = event.target.dataset.sort
            if (sortOptions === 'room') {
                cardList.sort((apartment1, apartment2) => (apartment1.querySelector(`.${sortOptions}`).textContent - apartment2.querySelector(`.${sortOptions}`).textContent)*directionRoom)
                if (directionRoom === 1) {
                    directionRoom = -1
                }else{
                    directionRoom = 1
                }
            }
            if (sortOptions === 'price') {
                cardList.sort((apartment1, apartment2) => (apartment1.querySelector(`.${sortOptions}`).textContent.replaceAll(' ', '') - apartment2.querySelector(`.${sortOptions}`).textContent.replaceAll(' ', ''))*directionPrice)
                if (directionPrice === 1) {
                    directionPrice = -1
                }else{
                    directionPrice = 1
                }
            }
            if (sortOptions === 'date') {
                cardList.sort((apartment1, apartment2) => {
                    let apartmentTime1 = apartment1.querySelector('.dateTime').textContent.replaceAll(':','')
                    let apartmentdate1 = apartment1.querySelector('.date').textContent.split('.').reverse().join('')
                    let date1 = apartmentdate1 + apartmentTime1
                    let apartmentTime2 = apartment2.querySelector('.dateTime').textContent.replaceAll(':','')
                    let apartmentdate2 = apartment2.querySelector('.date').textContent.split('.').reverse().join('')
                    let date2 = apartmentdate2 + apartmentTime2
                    return (date1 - date2)*directionDate
                })
                if (directionDate === 1) {
                    directionDate = -1
                }else{
                    directionDate = 1
                }
            }
            apartment.forEach(element =>{
                element.parentNode.removeChild(element)
            })
            cardList.forEach(card =>{
                document.getElementById('card-list').appendChild(card)
            })
       }
    })
}