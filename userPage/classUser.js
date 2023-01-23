import {UserActive} from '../userPage/classUserActive.js';
import {patterns} from '../registerForm/patterns&validInp.js';
import {checkDOMContentLoaded} from '../userPage/skeleton.js';

// class User
class User{
    static dataBaseUser = [];

    static displayInfoUserFormEdite = function(){
        User.dataBaseUser = [...UserActive.dataBaseUserActive];
        const objUser = {...User.dataBaseUser[0]};
        document.querySelector('body #container #main .section .Account .infoUser > form .uploadPhoto > img').src = objUser.imgSrc != undefined ? objUser.imgSrc : '';
        document.querySelector('body #container #main .section .Account .infoUser > form > input.inpFirstName').value = objUser.firstName;
        document.querySelector('body #container #main .section .Account .infoUser > form > input.inpLastName').value = objUser.LastName;
        document.querySelector('body #container #main .section .Account .infoUser > form > input.inpUserName').value = objUser.UserName;
        document.querySelector('body #container #main .section .Account .infoUser > form > input.inpEmail').value = objUser.Email;
        switch(objUser.Gender){
          case 'male':
            document.querySelector('body #container #main .section .Account .infoUser > form > div:nth-of-type(3) > input[value="male"]').checked = true;
            break;
            case 'female':
            document.querySelector('body #container #main .section .Account .infoUser > form > div:nth-of-type(3) > input[value="female"]').checked = true;
            break;
        }
        document.querySelector('body #container #main .section .Account .infoUser > form div input.inpBirthDay').value = objUser.BirthDay;
    }
    static checkSubSubCategoryChildren = function(){
        const btnsShowAll = document.querySelectorAll('body #container #main .section .categories .category .subCategory .row-title-btn-subSubCategory > h5 > a.btnShowAll'); 
        const subSubCategoryProducts = document.querySelectorAll('body #container #main .section .categories .category .subCategory .subSubCategory'); 
        btnsShowAll.forEach(function(value,index,arr){
            if(subSubCategoryProducts[index].childElementCount > 4){
                value.style.setProperty('visibility','visible');
            }
            else if(subSubCategoryProducts[index].childElementCount <= 4){
                value.style.setProperty('visibility','hidden');
            }
        });
    }
    static editeInfoUser = function(obj,inpUserName,inpEmail){
        if(localStorage.getItem('dataBaseUserTrash') == null){
            localStorage.setItem('dataBaseUserTrash',JSON.stringify([]))
        }
        if(localStorage.getItem('dataBaseUserEdite') == null){
            localStorage.setItem('dataBaseUserEdite',JSON.stringify([]))
        }
        const emailUserNameDouble = [...JSON.parse(localStorage.getItem('dataBaseUser')),...JSON.parse(localStorage.getItem('dataBaseAdmin')),...JSON.parse(localStorage.getItem('dataBaseUserEdite')),...JSON.parse(localStorage.getItem('dataBaseUserTrash'))].find(function(userAdmin){
            if(obj.UserName != undefined){
                if(obj.UserName === userAdmin.UserName){return userAdmin;}
            }
            if(obj.Email != undefined){
                if(obj.Email.toLowerCase() === userAdmin.Email.toLowerCase()){return userAdmin;}
            }
        });        
        if(emailUserNameDouble !== undefined){
            console.log('Email Or UserName are already taken');
            inpEmail.classList.add('invalid');
            inpEmail.classList.remove('valid');
            inpUserName.classList.add('invalid');
            inpUserName.classList.remove('valid');
            
        }
        else if(emailUserNameDouble === undefined){

            const DBuserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
            const user = DBuserActive[0];
            
            const objKeys = Object.keys(obj);
            for(let i = 0;i<objKeys.length;i++){
                user[objKeys[i]] = obj[objKeys[i]];
            }
            DBuserActive[0] = user;
            localStorage.removeItem('dataBaseActive');
            localStorage.setItem('dataBaseActive',JSON.stringify(DBuserActive));
            const DBuser = JSON.parse(localStorage.getItem('dataBaseUser'));     
            const indexUser = DBuser.findIndex(function(obj){
                return obj.id === user.id
            });
            DBuser[indexUser] = user;
            localStorage.removeItem('dataBaseUser');
            User.dataBaseUser = DBuser;
            localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
            UserActive.updateUserInDataBaseActive()
        }   
    }
    static displayProductFromItemsSideBar = function(elemSelect){
        if(localStorage.getItem('dataBaseProducts') != null){
            User.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseProducts'));  
            const emptySubSubCategory = document.querySelectorAll('body #container #main .section .categories .category .subCategory .subSubCategory');
            emptySubSubCategory.forEach(function(elem,index){
                elem.innerHTML = '';
            })
            User.dataBaseAdmin.forEach(function(obj){
                const article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct skeleton"><img src="${obj.imgSrc}" class="" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct skeleton">${obj.titleProduct}</h5>
                      <span class="priceProduct skeleton">${obj.priceProduct}$</span><span class="quantityProduct skeleton">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnAddToCard skeleton">Add To Card</button>
                      <button class="btnBuyProduct skeleton">Buy Product</button>
                    </div>`;
                const category = elemSelect;
                const subCategory = category[Number(obj.arrIndex[0])].querySelectorAll('.subCategory');
                const subSubCategory = subCategory[Number(obj.arrIndex[1])].querySelectorAll('div.subSubCategory');
                subSubCategory[Number(obj.arrIndex[2])].insertBefore(article,subSubCategory[Number(obj.arrIndex[2])].children[0]);
                
                if(Number(article.querySelector('.info .quantityProduct').textContent.slice(0,-1)) > 0){        //if quantity of product > 0
                    User.btnAddProductToCard(obj,article.querySelector('.btnsProducts button.btnAddToCard'));
                    User.btnBuyProduct(obj,article.querySelector('.btnsProducts button.btnBuyProduct'));
                }
                else{                                                                                           //if quantity of product == 0
                    article.querySelector('.btnsProducts button.btnBuyProduct').style.setProperty('cursor','not-allowed');
                    article.querySelector('.btnsProducts button.btnAddToCard').style.setProperty('cursor','not-allowed');
                }
            });
            checkDOMContentLoaded();
        }
    }
    static btnAddProductToCard = function(product,btnAddToCard){                    // btn add product to cart 
        btnAddToCard.onclick = function(){
            UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
            const {id} = UserActive.dataBaseUserActive[0];
            User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            let counter = false;
            for(let i =0;i<User.dataBaseUser.length;i++){
                if(id === User.dataBaseUser[i].id){
                    // add product to user in his cart
                        // if user has property 'cart'
                    if(User.dataBaseUser[i].hasOwnProperty('cart')){
                        for(let x = 0;x<User.dataBaseUser[i].cart.length;x++){
                            if(User.dataBaseUser[i].cart[x].idProduct == product.idProduct){
                                User.dataBaseUser[i].cart[x].userProductCount = Number(User.dataBaseUser[i].cart[x].userProductCount)+1;
                                counter = true;
                                break;
                            }
                        }
                        if(counter == false){
                            product.userProductCount = 1;
                            User.dataBaseUser[i].cart.push(product);
                        }
                    }
                    else{
                        const cartArr = [];
                        User.dataBaseUser[i].cart = cartArr;
                        product.userProductCount = 1;
                        User.dataBaseUser[i].cart.push(product);
                    }

                    localStorage.removeItem('dataBaseActive');
                    localStorage.setItem('dataBaseActive',JSON.stringify([User.dataBaseUser[i]]));        
                    break;
                }
            }
            localStorage.removeItem('dataBaseUser');
            localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
            console.log(`The product ${product.idProduct} has been added to the cart`);
        }
    }
    static btnBuyProduct = function(product,btnBuyProduct){         // btn buy product & move to orders
        btnBuyProduct.onclick = function(){         
        
            const modal = document.createElement('dialog');
            modal.className = `modal`;
            modal.innerHTML = `<p>Are you sure you want to buy that's products ?</p>
                <button class="button confirm-buy">Yes</button>
                <button class="button button-close">Close</button>`;
            document.body.querySelector('#container').appendChild(modal);
            modal.showModal();
            
            // add event for btn close window modal
            const btnClose = modal.querySelector('.button-close');
            btnClose.onclick = function(){
                modal.remove();
            };
            
            // add event for btn confirm buy products
            const btnConfirm = modal.querySelector('.confirm-buy');
            btnConfirm.onclick = function(){
                console.clear();

                let arrAdmin = '';

                // add Product categories buy to product order  
                const arrIndexRemove = [];
                
                UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
                const objUser = UserActive.dataBaseUserActive[0];
                
                let inOrder = false;
                console.log(objUser);
                for(let y = 0;y<objUser.orders.length;y++){
                    if(product.idProduct === objUser.orders[y].idProduct && objUser.orders[y].status == 'pending'){ //if product in order and his status == 'pending 
                        console.log(`you are alredey ${objUser.orders[y].idProduct} buy this product`);
                        inOrder = true;
                        break;
                    }   
                }
                if(inOrder === false){
                    product.status = 'pending';
                    product.userProductCount = 1;
                    objUser.orders.push(product);
                }
            
                // update data in database User
                UserActive.dataBaseUserActive = [objUser];
                localStorage.removeItem('dataBaseActive');
                localStorage.setItem('dataBaseActive',JSON.stringify(UserActive.dataBaseUserActive));
                User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));    
                for(let i = 0;i<User.dataBaseUser.length;i++){
                    if(User.dataBaseUser[i].id === objUser.id){
                        User.dataBaseUser.splice(i,1,objUser);
                        localStorage.removeItem('dataBaseUser');
                        localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                        break;
                    }
                }
                if(inOrder === false){
                    console.log(`your products cart : ${product.idProduct} has been deplaced >> Orders to agree by the adminstrator`);
                    
                    // notification if user buy product 'admin
                    const date = new Date();
                    let hour = Number(date.getHours());
                    hour < 10 ? `0${hour}` : hour;
                    let minutes = Number(date.getMinutes());
                    minutes = minutes < 10 ? `0${minutes}` : minutes;
                    let day = Number(date.getDate());
                    day = day < 10 ? `0${day+1}` : day+1;
                    let month = Number( date.getMonth()+1);
                    month = month < 10 ? `0${month}` : month;
                    let year = date.getFullYear();
                    
                    arrAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
                    arrAdmin[0].notifications.push({
                        id: objUser.id,
                        imgUser: objUser.imgSrc,
                        sender: `${objUser.firstName} ${objUser.LastName}`,
                        msg: `the user id: <b>${objUser.id}</b> had buy the product <b>${product.idProduct}</b>`,
                        titleProduct: product.titleProduct,
                        read: false,
                        type: 'order',
                        year: year,
                        month: month,
                        day: day,
                        hour: hour,
                        minutes: minutes,
                    });

                    // update Recent Orders DataBase
                    const dataBaseRecentOrders = JSON.parse(localStorage.getItem('dataBaseRecentOrders'));
                    let obj = {...product};
                    obj.fullName = `${objUser.firstName} ${objUser.LastName}`;
                    dataBaseRecentOrders.push(obj);
                    localStorage.removeItem('dataBaseRecentOrders')
                    localStorage.setItem('dataBaseRecentOrders',JSON.stringify(dataBaseRecentOrders));

                }
                // update database admin
                localStorage.removeItem('dataBaseAdmin');
                localStorage.setItem('dataBaseAdmin',JSON.stringify(arrAdmin));
                modal.remove();
            };   
        }
    }
    static displayProductsfromOrdersUser = function(){
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const {id} = UserActive.dataBaseUserActive[0];
        let userOrders;
        User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        for(let i = 0;i<User.dataBaseUser.length;i++){  
            if(User.dataBaseUser[i].id === id){
                userOrders = User.dataBaseUser[i];
                break;
            }
        }
        console.log(User.dataBaseUser);
        
        // if admin change info of product
        const dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
        for(let i = 0;i<userOrders.orders.length;i++){
            for(let x = 0;x<dataBaseProducts.length;x++){
                if(userOrders.orders[i].idProduct === dataBaseProducts[x].idProduct){
                    const {imgSrc,titleProduct,priceProduct,quantityProduct,Category,subCategory,subSubCategory,arrIndex} = dataBaseProducts[x];
                    userOrders.orders[i].imgSrc = imgSrc;
                    userOrders.orders[i].titleProduct = titleProduct;
                    userOrders.orders[i].priceProduct = priceProduct;
                    userOrders.orders[i].quantityProduct = quantityProduct;
                    userOrders.orders[i].Category = Category;
                    userOrders.orders[i].subCategory = subCategory;
                    userOrders.orders[i].subSubCategory = subSubCategory;
                    userOrders.orders[i].arrIndex = arrIndex;
                    break;
                }
            }
        }

        let indexUserActive = undefined;
        for(let i = 0;i<User.dataBaseUser.length;i++){  
            if(User.dataBaseUser[i].id === userOrders.id){
                User.dataBaseUser.splice(i,1,userOrders);
                indexUserActive = i;
                break;
            }
        }
        localStorage.removeItem('dataBaseUser');
        localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
        localStorage.removeItem('dataBaseActive');
        localStorage.setItem('dataBaseActive',JSON.stringify([User.dataBaseUser[indexUserActive]]));



        const ProductsOrders = document.querySelector('body #container #main .section .Orders .ProductsOrders');
        ProductsOrders.innerHTML = ``;

        userOrders.orders.forEach(function(ProductOrders,index){
            const article = document.createElement('article');
            article.className = 'product';
            article.idProduct = ProductOrders.idProduct;
            article.innerHTML = `
                <div class="imgProduct"><img src="${ProductOrders.imgSrc}" alt="photo product"></div>
                <div class="info">
                  <h5 class="titleProduct">${ProductOrders.titleProduct}</h5>
                  <div class="infoPriceAndQuantity">
                    <span class="priceProduct">${ProductOrders.priceProduct}$</span>
                    <span class="quantityProduct">${ProductOrders.quantityProduct}P</span>
                  </div>
                  <div class="statusProduct">
                    <label>status :&nbsp;&nbsp;</label><span class="status">${ProductOrders.status}</span>
                  </div>
                </div>
                <div class="QuantityProduct-removeOrder">
                  <div class="quantityProductOrders">
                    <input type="number" step="1"  min="1" readonly value="${ProductOrders.userProductCount}" class="inpQuantityProductOrders">
                  </div>
                  <button class="btnRemoveOrders" title="Remove Order">remove from Orders</button>
                  <!-- <button class="btnSale">Buy Product</button> -->
                </div>`;
            ProductsOrders.insertBefore(article,ProductsOrders.children[0]);
            switch(article.querySelector('.info .statusProduct .status').textContent){
                case 'declined':
                    article.querySelector('.info .statusProduct .status').style.setProperty('color','rgb(255 000 000)');
                    article.querySelector('.QuantityProduct-removeOrder .btnRemoveOrders').style.setProperty('cursor','pointer');
                    User.btnRemoveProductFromOrders(userOrders,ProductOrders,article.querySelector('.QuantityProduct-removeOrder .btnRemoveOrders'));
                    break;
                case 'delivered':
                    article.querySelector('.info .statusProduct .status').style.setProperty('color','rgb(000 255 000)');
                    break;
            }
        });   
    }
    static btnRemoveProductFromOrders = function(userOrders,ProductOrders,btnRemoveOrders){     //   btnRemoveProductFromOrders
        btnRemoveOrders.onclick = function(){
            // remove product orders from objUser
            for(let i = 0;i<userOrders.orders.length;i++){
                if(userOrders.orders[i].idProduct === ProductOrders.idProduct){
                    userOrders.orders.splice(i,1);
                    break;
                }
            }
            // update database user & database active
            UserActive.dataBaseUserActive = [userOrders];
            localStorage.removeItem('dataBaseActive');
            localStorage.setItem('dataBaseActive',JSON.stringify(UserActive.dataBaseUserActive));   
            User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            for(let i = 0;i<User.dataBaseUser.length;i++){
                if(User.dataBaseUser[i].id === userOrders.id){
                    User.dataBaseUser.splice(i,1,userOrders);
                    localStorage.removeItem('dataBaseUser');
                    localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                    break;
                }
            }
            // remove element in ProductsOrders  
            const ProductsOrders = document.querySelectorAll('body #container #main .section .Orders .ProductsOrders .product'); 
            for(let x = 0;x<ProductsOrders.length;x++){
                if(ProductsOrders[x].idProduct === ProductOrders.idProduct){
                    ProductsOrders[x].remove();
                    console.log(`this orders product ${ProductOrders.idProduct} has been removed`);
                    console.log(userOrders.id);
                    break;
                }
            }
        }
    }
    static displayProductsfromCartUser = function(){
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        if({...UserActive.dataBaseUserActive[0]}.hasOwnProperty('cart')){
            const {id} = UserActive.dataBaseUserActive[0];
            let userCart;
            
            // update dataProduct in cart User
            const dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
            User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            for(let i =0;i<User.dataBaseUser.length;i++){
                if(id === User.dataBaseUser[i].id){
                    // if admin change info product or remove it , > (change in cart 'user') 
                    User.dataBaseUser[i].cart.forEach(function(productUser,index){
                        const newProduct = dataBaseProducts.find(function(product){
                            if(productUser.idProduct === product.idProduct){

                                if(productUser.userProductCount > product.quantityProduct){ // if admin change info quantity product and quantity product in cart user greater than product quantity  
                                    product.userProductCount = 1;
                                }
                                else if(productUser.userProductCount <= product.quantityProduct){
                                    product.userProductCount = Number(productUser.userProductCount);
                                }
                                return product;
                            }
                        });
                        if(newProduct != undefined){
                            for(let x = 0;x<User.dataBaseUser[i].cart.length;x++){
                                if(User.dataBaseUser[i].cart[x].idProduct === newProduct.idProduct){
                                    User.dataBaseUser[i].cart.splice(x,1,newProduct);
                                    break;
                                }
                            }
                        }
                        else if(newProduct == undefined){               //if product in cart user is not in database product > remove it
                            User.dataBaseUser[i].cart.splice(index,1);
                        }
                    });
                    // ------------------
                    localStorage.removeItem('dataBaseActive');
                    localStorage.setItem('dataBaseActive',JSON.stringify([User.dataBaseUser[i]]));
                    localStorage.removeItem('dataBaseUser');
                    localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                    userCart = [...User.dataBaseUser[i].cart];
                    break;
                }
            }
            
            const ProductsCart = document.querySelector('body #container #main .section .Cart .ProductsCart');
            ProductsCart.innerHTML = ``;
            userCart.forEach(function(product,index){
                const article = document.createElement('article');
                article.className = 'product';
                article.idProduct = product.idProduct;
                article.innerHTML = `<div class="imgProduct"><img src="${product.imgSrc}" alt="photo product"></div>
                  <div class="info">
                    <h5 class="titleProduct">${product.titleProduct}</h5>
                    <!-- start info Price And Quantity -->
                    <div class="infoPriceAndQuantity">
                      <span class="priceProduct">${product.priceProduct}$</span>
                      <span class="quantityProduct">${product.quantityProduct}P</span>
                    </div>
                    <!-- start quantity Product Cart -->
                    <div class="quantityProductCart">
                      <input type="number" step="1"  min="1" max="${product.quantityProduct}" value="${product.userProductCount}" class="inpQuantityProductCart valid">
                    </div>
                  </div>
                  <div class="btnRemove-checkProduct">
                    <button class="btnRemoveCart">remove from Cart</button>
                    <div>
                        <label for='check${index}'>check product </label><input type="checkbox"  class="checkInp" id='check${index}'>
                    </div>
                  </div>`;
                if(product.quantityProduct === 0){
                    article.querySelector('.btnRemove-checkProduct div .checkInp').setAttribute('disabled','true');
                    article.querySelector('.btnRemove-checkProduct div .checkInp').setAttribute('title','quantity of product == 0');
                    article.querySelector('.btnRemove-checkProduct div .checkInp').style.setProperty('cursor','not-allowed');
                }
                ProductsCart.insertBefore(article,ProductsCart.children[0]);
                User.btnRemoveProductFromCart(product,article.querySelector('.btnRemove-checkProduct .btnRemoveCart'),ProductsCart);  //add event for btn remove product from cart user
                User.inpQuantityProductCart(product,article.querySelector('.quantityProductCart .inpQuantityProductCart'));
                User.inpCheckProduct(product,article.querySelector('.btnRemove-checkProduct div .checkInp'));
            });
            // set price of product in cart
            if(userCart.length > 0){
                const spanPrice = document.querySelector('body #container #main .section .Cart .confirmProducts > label span.price');
                spanPrice.textContent = `0$`;
            }
        }
    }
    // event for inp Quantity Product Cart 
    static inpQuantityProductCart = function(productCart,inpQuantityProductCart){
        inpQuantityProductCart.onchange = function(){upDateQuantityProductCart()};    
        inpQuantityProductCart.onkeyup = function(){upDateQuantityProductCart()};
        function upDateQuantityProductCart(){
            if(patterns.QuantityProduct.test(String(inpQuantityProductCart.value)) && inpQuantityProductCart.value.length <= (String(Number(productCart.quantityProduct)).length) && (inpQuantityProductCart.value <= Number(productCart.quantityProduct) && inpQuantityProductCart.value >= 1)){
                inpQuantityProductCart.classList.add('valid');inpQuantityProductCart.classList.remove('invalid');
                UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
                const {id} = UserActive.dataBaseUserActive[0];
                User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
                const resultUserActive = {...UserActive.dataBaseUserActive[0]};
                for(let i = 0;i<resultUserActive.cart.length;i++){
                    if(resultUserActive.cart[i].idProduct === productCart.idProduct){
                        resultUserActive.cart[i].userProductCount = Number(inpQuantityProductCart.value);
                        UserActive.dataBaseUserActive.shift();
                        UserActive.dataBaseUserActive.push(resultUserActive);
                        localStorage.removeItem('dataBaseActive');
                        localStorage.setItem('dataBaseActive',JSON.stringify(UserActive.dataBaseUserActive));
                        break;
                    }
                }    
                let bool = false;
                for(let i = 0;i<User.dataBaseUser.length;i++){
                    if(User.dataBaseUser[i].id === id){
                        for(let x = 0;x<User.dataBaseUser[i].cart.length;x++){
                            if(User.dataBaseUser[i].cart[x].idProduct === productCart.idProduct){
                                User.dataBaseUser[i].cart[x].userProductCount = Number(inpQuantityProductCart.value);
                                const productObj = User.dataBaseUser[i].cart[x];
                                User.dataBaseUser[i].cart.splice(x,1,User.dataBaseUser[i].cart[x]);
                                localStorage.removeItem('dataBaseUser');
                                localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                                bool = true;
                                break;
                            }
                        }
                        if(bool){break;}
                    }
                }
            }
            else{inpQuantityProductCart.classList.add('invalid');inpQuantityProductCart.classList.remove('valid');}
            User.priceProductCart(); // calcul price;
        }
    }
    // button Remove Product From Cart
    static btnRemoveProductFromCart = function(productCart,btnRemoveProductFromCart,ProductsCart){ 
        btnRemoveProductFromCart.onclick = function(){
            let bool = false;
            UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
            const {id} = UserActive.dataBaseUserActive[0];
            User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            for(let i =0;i<User.dataBaseUser.length;i++){
                if(id === User.dataBaseUser[i].id){
                    // remove product from database 
                    for(let x = 0;x<User.dataBaseUser[i].cart.length;x++){
                        if(User.dataBaseUser[i].cart[x].idProduct === productCart.idProduct){
                            // remove product from database Users
                            User.dataBaseUser[i].cart.splice(x,1);
                            localStorage.removeItem('dataBaseUser');
                            localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                            // remove product from database userActive
                            UserActive.dataBaseUserActive[0].cart.splice(x,1);
                            localStorage.removeItem('dataBaseActive');
                            localStorage.setItem('dataBaseActive',JSON.stringify(UserActive.dataBaseUserActive));
                            bool = true;
                            break;
                        }
                    }
                    if(bool){break;}
                }
            }
            
            // remove product element from cart [section] User
            for(let i = 0;i<ProductsCart.childElementCount;i++){
                if(ProductsCart.children[i].idProduct === productCart.idProduct){
                    ProductsCart.children[i].remove();
                    break;
                }
            }
            console.log(`The product ${productCart.idProduct} has been removed to the cart`);
            User.priceProductCart(); // calcul price;
        }
    }
    // event for CheckProduct 'Buy' 
    static inpCheckProduct = function(product,inpCheckBox){
        inpCheckBox.onchange = function(){
            User.priceProductCart();
        }
    }
    // price of products in cart
    static priceProductCart = function(){
        let result = 0, quantity, price;
        const products = document.querySelectorAll('body #container #main .section .Cart .ProductsCart .product');
        
        // checked product in cart is checked or not
        const elementChecked = [];  
        products.forEach(function(element,index){
            if(element.querySelector('.btnRemove-checkProduct div .checkInp').checked === true && element.querySelector('.quantityProductCart > input.inpQuantityProductCart').classList.contains('valid')){elementChecked.push(element);}
        });
        const spanPrice = document.querySelector('body #container #main .section .Cart .confirmProducts > label span.price');
        if(elementChecked.length > 0){
            elementChecked.forEach(function(element,index){
                quantity = element.querySelector('.quantityProductCart > input.inpQuantityProductCart').value;
                price = element.querySelector(' .info .infoPriceAndQuantity > span.priceProduct').textContent;
                price = Number(price.slice(0,price.length-1));
                result += (price*quantity);
            });
            spanPrice.textContent = `${result}$`;
        }
        else{spanPrice.textContent = `0$`;}
    }
    // event btn Buy Products
    static btnBuyProductsInCart = function(){
        const products = document.querySelectorAll('body #container #main .section .Cart .ProductsCart .product');
        // // checked product in cartUser is checked or not
        const objProduct = [];  
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const objUser = {...UserActive.dataBaseUserActive[0]};
        products.forEach(function(element,index){
            if(element.querySelector('.btnRemove-checkProduct div .checkInp').checked === true && element.querySelector('.quantityProductCart > input.inpQuantityProductCart').classList.contains('valid')){
                objUser.cart.forEach(function(proCart){
                    if(proCart.idProduct === element.idProduct){
                        objProduct.push(proCart);
                    }
                });   
            }
        });
        if(objProduct.length > 0){
            const modal = document.createElement('dialog');
            modal.className = `modal`;
            modal.innerHTML = `<p>Are you sure you want to buy that's products ?</p>
                <button class="button confirm-buy">Yes</button>
                <button class="button button-close">Close</button>`;
            document.body.querySelector('#container').appendChild(modal);
            modal.showModal();
            
            // add event for btn close window modal
            const btnClose = modal.querySelector('.button-close');
            btnClose.onclick = function(){
                modal.remove();
            };
            
            // add event for btn confirm buy products
            const btnConfirm = modal.querySelector('.confirm-buy');
            btnConfirm.onclick = function(){
                console.clear();
                // add Product cart buy to product order  
                const arrIndexRemove = [];
                // objUser.orders = [...objProduct];
                for(let x = 0;x<objProduct.length;x++){
                    let inOrder = false;
                    for(let y = 0;y<objUser.orders.length;y++){
                        if(objProduct[x].idProduct === objUser.orders[y].idProduct && objUser.orders[y].status == 'pending'){

                            console.log(`you are alredey ${objUser.orders[y].idProduct} buy this product`);
                            inOrder = true;
                            break;
                        }   
                    }
                    if(inOrder === true){arrIndexRemove.push(x);}
                    if(inOrder === false){
                        objProduct[x].status = 'pending';
                        objUser.orders.push(objProduct[x]);
                    }
                }
                 
                for(let i = 0;i<objProduct.length;i++){
                    for(let x = 0;x<arrIndexRemove.length;x++){
                        if(arrIndexRemove[x] === i){
                            objProduct.splice(i,1);
                            i--;
                            break;
                        }
                    }
                }

                UserActive.dataBaseUserActive = [objUser];
                localStorage.setItem('dataBaseActive',JSON.stringify(UserActive.dataBaseUserActive));
                User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));    
                for(let i = 0;i<User.dataBaseUser.length;i++){
                    if(User.dataBaseUser[i].id === objUser.id){
                        User.dataBaseUser.splice(i,1,objUser);
                        localStorage.removeItem('dataBaseUser');
                        localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
                        break;
                    }
                }

                const ObjProducts = [];
                objProduct.forEach(function(element){
                    ObjProducts.push(element);
                })
                if(ObjProducts.length > 0){
                    const dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
                    const admin = {...dataBaseAdmin[0]};
                    ObjProducts.forEach(function(ObjPro){
                        console.log(`your products cart : ${ObjPro.idProduct} has been deplaced >> Orders to agree by the adminstrator`);
                        //     // notification if user buy product 
                        const date = new Date();
                        let hour = Number(date.getHours());
                        hour < 10 ? `0${hour}` : hour;
                        let minutes = Number(date.getMinutes());
                        minutes = minutes < 10 ? `0${minutes}` : minutes;
                        let day = Number(date.getDate());
                        day = day < 10 ? `0${day+1}` : day+1;
                        let month = Number( date.getMonth()+1);
                        month = month < 10 ? `0${month}` : month;
                        let year = date.getFullYear();
                        
                        admin.notifications.push({
                            id:objUser.id,
                            imgUser: objUser.imgSrc,
                            sender: `${objUser.firstName} ${objUser.LastName}`,
                            msg: `the user <b>${objUser.id}</b> has buy the product <b>${ObjPro.idProduct}</b>`,
                            titleProduct: ObjPro.titleProduct,
                            read: false,
                            type: 'order',
                            year: year,
                            month: month,
                            day: day,
                            hour: hour,
                            minutes: minutes,
                        });

                        // update Recent Orders DataBase
                        const dataBaseRecentOrders = JSON.parse(localStorage.getItem('dataBaseRecentOrders'));
                        let obj = {...ObjPro};
                        obj.fullName = `${objUser.firstName} ${objUser.LastName}`;
                        dataBaseRecentOrders.push(obj);
                        localStorage.removeItem('dataBaseRecentOrders')
                        localStorage.setItem('dataBaseRecentOrders',JSON.stringify(dataBaseRecentOrders));

                    });
                    // upDate dataIn database admin
                    localStorage.removeItem('dataBaseAdmin');
                    localStorage.setItem('dataBaseAdmin',JSON.stringify([admin]));
                } 
                modal.remove();
            };   
        }
        else if(objProduct.length === 0){
            console.log('check product please !');
        }
    }
}
export {User};