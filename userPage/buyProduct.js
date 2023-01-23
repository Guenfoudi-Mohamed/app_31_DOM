import {User} from '../userPage/classUser.js'; 

const btnBuyProduct = document.querySelector('body #container #main .section .Cart .confirmProducts > button.btnBuyNow');
btnBuyProduct.onclick = function(){
    User.btnBuyProductsInCart();
}