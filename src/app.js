import './style.css'
import { Apartments } from './components/apartments/apartments';
import { Authorization } from './components/Authorization/authorization';
import { getLocalstorage } from './utils/localstorage';
import { addBtnToHeader } from './utils/addBtn';
import { sortApartment } from './utils/sort';


let auth = getLocalstorage('auth')
addBtnToHeader(auth)
Apartments.createApartment(auth)
Apartments.addApartment(auth)
Authorization.exit()
sortApartment()
Authorization.authorizationModal()







