import {AdminActive} from '../adminPage/classAdminActive.js';
import {AdminDashBoard} from '../adminPage/dashBoard.js';
// class User
class Admin{
    static dataBaseAdmin = [];
    static dataBaseProducts = [];
    static dataBaseProductsTrash = [];
    static idProducts = [];
    static idProduct = '';
    static dataBaseUser = [];
    static dataBaseUserEdite = [];
    static dataBaseUserTrash = [];
    static customer = {};
    constructor(){
    }
    static displayInfoAdminFormEdite = function(){
      Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
      const objAdmin = {...Admin.dataBaseAdmin[0]};
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form .uploadPhoto > img').src = objAdmin.imgSrc;
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > input.inpFirstName').value = objAdmin.firstName;
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > input.inpLastName').value = objAdmin.LastName;
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > input.inpUserName').value = objAdmin.UserName;
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > input.inpEmail').value = objAdmin.Email;
      switch(objAdmin.Gender){
        case 'male':
          document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > div:nth-of-type(3) > input[value="male"]').checked = true;
          break;
          case 'female':
          document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form > div:nth-of-type(3) > input[value="female"]').checked = true;
          break;
      }
      document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form div input.inpBirthDay').value = objAdmin.BirthDay;
    }
    static checkSubSubCategoryChildren = function(){
      const btnsShowAll = document.querySelectorAll('body #container #main > section.leftSection .categories .category .subCategory .row-title-btn-subSubCategory > h5 > a.btnShowAll'); 
      const subSubCategoryProducts = document.querySelectorAll('body #container #main > section.leftSection .categories .category .subCategory div.subSubCategory'); 
      btnsShowAll.forEach(function(value,index,arr){
          if(subSubCategoryProducts[index].childElementCount > 4){
              value.style.setProperty('visibility','visible');
          }
          else if(subSubCategoryProducts[index].childElementCount <= 4){
              value.style.setProperty('visibility','hidden');
          }
      });
    }
    static editeInfoAdmin = function(obj,inpUserName,inpEmail){
        const emailUserNameDouble = [...JSON.parse(localStorage.getItem('dataBaseAdmin')),...JSON.parse(localStorage.getItem('dataBaseUser')),...JSON.parse(localStorage.getItem('dataBaseUserEdite')),...JSON.parse(localStorage.getItem('dataBaseUserTrash'))].find(function(userAdmin){
            if(obj.UserName != undefined){
                if(obj.UserName.toLowerCase() === userAdmin.UserName.toLowerCase()){return userAdmin;}
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
            let DBadmin = JSON.parse(localStorage.getItem('dataBaseActive'));
            const admin = DBadmin[0];

            const objKeys = Object.keys(obj);
            for(let i = 0;i<objKeys.length;i++){
                admin[objKeys[i]] = obj[objKeys[i]];
            }

            DBadmin[0] = admin;

            localStorage.removeItem('dataBaseActive');
            localStorage.setItem('dataBaseActive',JSON.stringify(DBadmin));
            localStorage.removeItem('dataBaseAdmin');
            localStorage.setItem('dataBaseAdmin',JSON.stringify(DBadmin));
            AdminActive.updateAdminInDataBaseActive();
        }   
    }
    static addProductTolocalStorage = function(itemsSideBar, objProduct){
        if(localStorage.getItem('dataBaseProducts') == null){
            Admin.dataBaseProducts.push(objProduct); 
            localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));
        }
        else if(localStorage.getItem('dataBaseProducts') != null){
            Admin.dataBaseProducts = [...JSON.parse(localStorage.getItem('dataBaseProducts')),objProduct];
            localStorage.removeItem('dataBaseProducts');
            localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));
        }   
        if(itemsSideBar[2].classList.contains('active')){ //if itemSideBar 2 is active
            Admin.displayProduct(objProduct,2);
        }
        else if(itemsSideBar[4].classList.contains('active')){  //if itemSideBar 4 is active
            Admin.displayProduct(objProduct,4);
        }

        // add notification to user about 'product' 

          // set date to the notification 
        const date = new Date();
        let hour = Number(date.getHours());
        hour < 10 ? `0${hour}` : hour;
        let minutes = Number(date.getMinutes());
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let day = Number(date.getDate());
        day = day < 10 ? `0${day}` : day;
        let month = Number(date.getMonth()+1);
        month = month < 10 ? `0${month}` : month;
        let year = date.getFullYear();

        Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        Admin.dataBaseUser.forEach(function(user){
          const onjNotification = {
            id: user.id,
            sender: `Admin`,
            msg: `Admin has added a new product <b>${objProduct.titleProduct}</b>, Category : ${objProduct.Category}`,
            read: false,
            type: 'product',
            year: year,
            month: month,
            day: day,
            hour: hour,
            minutes: minutes
          }
          user.notifications.push(onjNotification);
        });
        localStorage.removeItem('dataBaseUser');
        localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));
    }
    static displayProduct = function(obj,itemIndex){
        let article = '';
        switch(itemIndex){
            case 2:
                article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct"><img src="${obj.imgSrc}" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct">${obj.titleProduct}</h5>
                      <span class="priceProduct">${obj.priceProduct}$</span><span class="quantityProduct">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnEditeProduct">Edit Product</button>
                      <button class="btnRemoveProduct">Remove Product</button>
                    </div>`;
                const category = document.querySelectorAll('body #container #main > section.leftSection .categories .category');
                const subCategory = category[Number(obj.arrIndex[0])].querySelectorAll('.subCategory');
                const subSubCategory = subCategory[Number(obj.arrIndex[1])].querySelectorAll('div.subSubCategory');
                subSubCategory[Number(obj.arrIndex[2])].insertBefore(article,subSubCategory[Number(obj.arrIndex[2])].children[0]);
                Admin.btnEditeProduct(obj,article.querySelector('.btnsProducts button:first-of-type'));     
                Admin.btnRemoveProduct(obj,article.querySelector('.btnsProducts button:last-of-type'));
                break;
            case 4:
                article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct"><img src="${obj.imgSrc}" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct">${obj.titleProduct}</h5>
                      <span class="priceProduct">${obj.priceProduct}$</span><span class="quantityProduct">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnEditeProduct">Edit Product</button>
                      <button class="btnRemoveProduct">Remove Product</button>
                    </div>`;
                const products = document.querySelector('body #container #main > section.leftSection .addProduct > .products'); 
                products.insertBefore(article,products.children[0]);   
                Admin.btnEditeProduct(obj,article.querySelector('.btnsProducts button:first-of-type'));     
                Admin.btnRemoveProduct(obj,article.querySelector('.btnsProducts button:last-of-type'));
                break;
        }
    }
    static displayProductFromItemsSideBar = function(elemSelect,wordName){
        if(wordName === 'categories' && (localStorage.getItem('dataBaseProducts') != null)){
            Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseProducts'));  
            const emptySubSubCategory = document.querySelectorAll('body #container #main > section.leftSection .categories .category .subCategory div.subSubCategory');
            emptySubSubCategory.forEach(function(elem,index){
                elem.innerHTML = '';
            })
            Admin.dataBaseAdmin.forEach(function(obj,index){
                const article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct"><img src="${obj.imgSrc}" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct">${obj.titleProduct}</h5>
                      <span class="priceProduct">${obj.priceProduct}$</span><span class="quantityProduct">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnEditeProduct">Edit Product</button>
                      <button class="btnRemoveProduct">Remove Product</button>
                    </div>`;
                const category = elemSelect;
                const subCategory = category[Number(obj.arrIndex[0])].querySelectorAll('.subCategory');
                const subSubCategory = subCategory[Number(obj.arrIndex[1])].querySelectorAll('div.subSubCategory');
                subSubCategory[Number(obj.arrIndex[2])].insertBefore(article,subSubCategory[Number(obj.arrIndex[2])].children[0]);
                Admin.btnEditeProduct(obj, article.querySelector('.btnsProducts .btnEditeProduct'));
                Admin.btnRemoveProduct(obj, article.querySelector('.btnsProducts .btnRemoveProduct'),'categories');

            });
        }
        else if(wordName === 'Add Product' && (localStorage.getItem('dataBaseProducts') != null)){
            Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseProducts'));
            const products = elemSelect;
            products.innerHTML = '';
            Admin.dataBaseAdmin.forEach(function(obj,index){
                const article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct"><img src="${obj.imgSrc}" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct">${obj.titleProduct}</h5>
                      <span class="priceProduct">${obj.priceProduct}$</span><span class="quantityProduct">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnEditeCard">Edit Product</button>
                      <button class="btnRemoveProduct">Remove Product</button>
                    </div>`;
                
                products.insertBefore(article,products.children[0]);   
                Admin.btnEditeProduct(obj,article.querySelector('.btnsProducts button:first-of-type'));     
                Admin.btnRemoveProduct(obj,article.querySelector('.btnsProducts button:last-of-type'),'Add Product');     
            });
        }
    }
    static displayOrders = function(){
      Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
      const productsOrders = document.querySelector('body #container #main > section.leftSection .orders .productsOrders');
      productsOrders.innerHTML = ``;
      Admin.dataBaseUser.forEach(function(user){
        for(let i = 0;i<user.orders.length;i++){
          if(user.orders[i].status === 'pending'){
            const article = document.createElement('article');
            article.className = `proOrder`;
            article.idUser = user.id;
            article.idProduct = user.orders[i].idProduct;
            article.innerHTML = `
              <div class="infoProduct"> <!-- start info prroduct -->
                <div class="imgProduct">
                  <img class="img" src="${user.orders[i].imgSrc}" alt="product order">
                </div>
                <div class="price-quantity">
                  <label>price : <span>${user.orders[i].priceProduct}$</span></label>
                  <label>quantity : <span class='quantityProduct'>${user.orders[i].quantityProduct}P</span></label>
                </div>
              </div>
              <div class="infoUser-product">
                <label>id user : <span>${user.id}</span></label>
                <label>id product : <span>${user.orders[i].idProduct}</span></label>
                <label>title product : <span>${user.orders[i].titleProduct}</span></label>
                <label>quantity user select : <input type="number" value='${user.orders[i].userProductCount}' step="1" class='valid' min="1" max='${user.orders[i].userProductCount}'></label>
                <label>status product : <span class='status'>${user.orders[i].status}</span></label>
              </div>
              <div class="btns-declined-delivered">
                <button title="Declined">Declined</button>
                <button title="Delivered">Delivered</button>
              </div>`;
            productsOrders.insertBefore(article,productsOrders.children[0]);
            const quantityElementValue = Number(article.querySelector('.price-quantity .quantityProduct').textContent.slice(0,-1));
            if(quantityElementValue <= 0){
              Admin.validInpPriceProductOrder(article.querySelector('.infoUser-product > label > input[type="number"]'),Number(user.orders[i].userProductCount)); 
              Admin.btnDeclinedDeliveredOrder(article.querySelector('.productsOrders .proOrder .btns-declined-delivered > button[title="Declined"]'),article.querySelector('.productsOrders .proOrder .btns-declined-delivered > button[title="Delivered"]'),user,user.orders[i],article.querySelector('.infoUser-product label .status'),article.querySelector('.infoUser-product > label > input[type="number"]'),article.querySelector('body #container #main > section.leftSection .orders .productsOrders .proOrder .infoProduct .price-quantity label > span.quantityProduct')); 
              article.querySelector('.btns-declined-delivered > button:last-of-type').style.setProperty('pointer-events','none');
              article.querySelector('.btns-declined-delivered > button:last-of-type').setAttribute('title','not-allowed');
              article.querySelector('.btns-declined-delivered > button:last-of-type').style.setProperty('background','#9a9e9a');
            }
            else{
              // if(){

              // }
              Admin.validInpPriceProductOrder(article.querySelector('.infoUser-product > label > input[type="number"]'),Number(user.orders[i].userProductCount)); 
              Admin.btnDeclinedDeliveredOrder(article.querySelector('.productsOrders .proOrder .btns-declined-delivered > button[title="Declined"]'),article.querySelector('.productsOrders .proOrder .btns-declined-delivered > button[title="Delivered"]'),user,user.orders[i],article.querySelector('.infoUser-product label .status'),article.querySelector('.infoUser-product > label > input[type="number"]'),article.querySelector('body #container #main > section.leftSection .orders .productsOrders .proOrder .infoProduct .price-quantity label > span.quantityProduct')); 
            }
          }
        }
      });
    }

    static validInpPriceProductOrder = function(inp,inpMaxValue){   //function valid inp price order
      // add event to inp
      inp.onchange = function(){validPrice();}
      inp.onkeyup = function(){validPrice();}
      // function valid inp price
      function validPrice(){
        const textInpValue = /^[1-9]([0-9])*$/.test(inp.value);
        if(textInpValue === true && inp.value <= inpMaxValue){
          inp.classList.add('valid');
          inp.classList.remove('invalid');
        }
        else{
          inp.classList.add('invalid');
          inp.classList.remove('valid');
        }
      }
    }

    static btnDeclinedDeliveredOrder = function(btnDeclined,btnDelivered,user,proOrder,elementStatus,inpQuantityUserProductSelect,quantityProductElement){     

      // ==== event for btn declined Order
      btnDeclined.addEventListener('click',FuncOrderDeclined);
        /* Function Order Declined */
      function FuncOrderDeclined(){                                     
        const popUpDeleteProduct = document.createElement('div');
        popUpDeleteProduct.setAttribute('id','popUpDeleteProduct');
        document.body.appendChild(popUpDeleteProduct);
        popUpDeleteProduct.innerHTML = `
          <!-- start popUp delete product -->
            <div class="containerPopUpDeleteProduct">
              <h4>Are you sure you want to Declined this Order ?</h4>
              <div class="btns">
                <input type="button" title="Yes" value="Yes"><input type="button" title="No" value="No">
              </div>
            </div>`;
        const btnYes = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:first-of-type');
        btnYes.onclick = function(){   

          Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
          let breakLoop = false;
          for(let i = 0;i<Admin.dataBaseUser.length;i++){
            if(Admin.dataBaseUser[i].id === user.id){
              for(let x = 0;x<Admin.dataBaseUser[i].orders.length;x++){
                if(Admin.dataBaseUser[i].orders[x].idProduct === proOrder.idProduct && Admin.dataBaseUser[i].orders[x].status == 'pending'){
                  Admin.dataBaseUser[i].orders[x].status = 'declined';
                  breakLoop = true;

                   // add notification to the user 
                   const date = new Date();
                   let hour = Number(date.getHours());
                   hour < 10 ? `0${hour}` : hour;
                   let minutes = Number(date.getMinutes());
                   minutes = minutes < 10 ? `0${minutes}` : minutes;
                   let day = Number(date.getDate());
                   day = day < 10 ? `0${day}` : day;
                   let month = Number(date.getMonth()+1);
                   month = month < 10 ? `0${month}` : month;
                   let year = date.getFullYear();

                   const notification = {
                     id: Admin.dataBaseUser[i].id,
                     sender: `Admin`,
                     msg: `Mr ${Admin.dataBaseUser[i].firstName} Your order <b>${Admin.dataBaseUser[i].orders[x].idProduct}</b> has been <b style='color: rgb(255, 000, 000);'>Declined</b>`,
                     read: false,
                     type: 'order',
                     year: year,
                     month: month,
                     day: day,
                     hour: hour,
                     minutes: minutes
                   }
                   Admin.dataBaseUser[i].notifications.push(notification);

                  // update Recent Orders DataBase
                  const dataBaseRecentOrders = JSON.parse(localStorage.getItem('dataBaseRecentOrders'));
                  let obj = {...Admin.dataBaseUser[i].orders[x]};
                  obj.fullName = `${Admin.dataBaseUser[i].firstName} ${Admin.dataBaseUser[i].LastName}`;
                  dataBaseRecentOrders.push(obj);
                  localStorage.removeItem('dataBaseRecentOrders')
                  localStorage.setItem('dataBaseRecentOrders',JSON.stringify(dataBaseRecentOrders));

                  console.log('you are declined this order '+proOrder.idProduct+' of user : '+user.id);
                  break;
                }
              }
              if(breakLoop){break;}
            }
          }
          elementStatus.textContent = 'declined';
          elementStatus.classList.add('declined');
          btnDelivered.style.setProperty('cursor','not-allowed');
          btnDeclined.style.setProperty('cursor','not-allowed');
          
            // update data in database User
          localStorage.removeItem('dataBaseUser');
          localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));
          
            // remove event in btn
          btnDeclined.removeEventListener('click',FuncOrderDeclined);
          btnDelivered.removeEventListener('click',FuncOrderDelivered);

            
            // close popUp window
          popUpDeleteProduct.remove();   
        }
          // if click in btn no
        const btnNo = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:last-of-type');
        btnNo.onclick = function(){
            popUpDeleteProduct.remove();
        }
      }
      
      // ==== event for btn Delivered Order
      if(btnDelivered != null){
        btnDelivered.addEventListener('click',FuncOrderDelivered);
      }
      /* Function Order Delivered */
      function FuncOrderDelivered(){
        if(inpQuantityUserProductSelect.classList.contains('valid')){
          const popUpDeleteProduct = document.createElement('div');
          popUpDeleteProduct.setAttribute('id','popUpDeleteProduct');
          document.body.appendChild(popUpDeleteProduct);  
          popUpDeleteProduct.innerHTML = `
            <!-- start popUp delete product -->
              <div class="containerPopUpDeleteProduct">
                <h4>you want to Delivered this Order ?</h4>
                <div class="btns">
                  <input type="button" title="Yes" value="Yes"><input type="button" title="No" value="No">
                </div>
              </div>`;
          const btnYes = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:first-of-type'); 
          btnYes.onclick = function(){
            // update quantity of product in database products
            let newQuantityValueProduct = 1;
            Admin.dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
            for(let i = 0;i<Admin.dataBaseProducts.length;i++){
              if(Admin.dataBaseProducts[i].idProduct === proOrder.idProduct){
                Admin.dataBaseProducts[i].quantityProduct = Number(Admin.dataBaseProducts[i].quantityProduct) - Number(inpQuantityUserProductSelect.value);
                newQuantityValueProduct = Admin.dataBaseProducts[i].quantityProduct;
                
                // update totalSales & gross profit 'Product' << - >> Admin Dashboard 
                AdminDashBoard.update_TotalSales_GrossProfit_DATA(Number(Admin.dataBaseProducts[i].priceProduct),Number(inpQuantityUserProductSelect.value)); 

                break;
              }
            }



            localStorage.removeItem('dataBaseProducts');
            localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));

            // update data base user Orders
            Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            let breakLoop = false;
            let ordersUsersChange = false;
            const arrOrdersUsersChange = [];

            for(let i = 0;i<Admin.dataBaseUser.length;i++){
              if(Admin.dataBaseUser[i].id === user.id){
                for(let x = 0;x<Admin.dataBaseUser[i].orders.length;x++){
                  if(Admin.dataBaseUser[i].orders[x].idProduct === proOrder.idProduct && Admin.dataBaseUser[i].orders[x].status === 'pending'){
                    Admin.dataBaseUser[i].orders[x].status = 'delivered';
                    Admin.dataBaseUser[i].orders[x].quantityProduct = newQuantityValueProduct;
                    Admin.dataBaseUser[i].orders[x].userProductCount = Number(inpQuantityUserProductSelect.value);
                    breakLoop = true;

                    // add notification to the user 
                    const date = new Date();
                    let hour = Number(date.getHours());
                    hour < 10 ? `0${hour}` : hour;
                    let minutes = Number(date.getMinutes());
                    minutes = minutes < 10 ? `0${minutes}` : minutes;
                    let day = Number(date.getDate());
                    day = day < 10 ? `0${day}` : day;
                    let month = Number(date.getMonth()+1);
                    month = month < 10 ? `0${month}` : month;
                    let year = date.getFullYear();

                    const notification = {
                      id: Admin.dataBaseUser[i].id,
                      sender: `Admin`,
                      msg: `Mr ${Admin.dataBaseUser[i].firstName} Your order <b>${Admin.dataBaseUser[i].orders[x].idProduct}</b> has been <b style='color:rgb(000, 255, 000);'>Delivered</b>`,
                      read: false,
                      type: 'order',
                      year: year,
                      month: month,
                      day: day,
                      hour: hour,
                      minutes: minutes
                    }
                    Admin.dataBaseUser[i].notifications.push(notification);

                    // update Recent Orders DataBase
                    const dataBaseRecentOrders = JSON.parse(localStorage.getItem('dataBaseRecentOrders'));
                    let obj = {...Admin.dataBaseUser[i].orders[x]};
                    obj.fullName = `${Admin.dataBaseUser[i].firstName} ${Admin.dataBaseUser[i].LastName}`;
                    dataBaseRecentOrders.push(obj);
                    localStorage.removeItem('dataBaseRecentOrders')
                    localStorage.setItem('dataBaseRecentOrders',JSON.stringify(dataBaseRecentOrders));

                    console.log('you are delivered this order '+proOrder.idProduct+' of user : '+user.id);

                    // upDate data in orders products for other objects users
                    for(let j = 0;j<Admin.dataBaseUser.length;j++){
                      if(i === j){
                        continue;
                      }
                      for(let z = 0;z<Admin.dataBaseUser[j].orders.length;z++){
                        if(Admin.dataBaseUser[j].orders[z].idProduct === Admin.dataBaseUser[i].orders[x].idProduct){
                          Admin.dataBaseUser[j].orders[z].quantityProduct = newQuantityValueProduct;

                          if(newQuantityValueProduct <= 0){
                            Admin.dataBaseUser[j].orders[z].userProductCount = 0;
                          }
                          else if(newQuantityValueProduct <= Number(Admin.dataBaseUser[j].orders[z].userProductCount)){
                            Admin.dataBaseUser[j].orders[z].userProductCount = Number(newQuantityValueProduct);
                          }
                          ordersUsersChange = true;
                          arrOrdersUsersChange.push({idUser:Admin.dataBaseUser[j].id,idProduct:Admin.dataBaseUser[j].orders[z].idProduct,quantityProduct:newQuantityValueProduct,userProductCount:Admin.dataBaseUser[j].orders[z].userProductCount,status:Admin.dataBaseUser[j].orders[z].status});
                        }
                      }
                    }

                    break;
                  }
                }
                if(breakLoop){break;}
              }
            }

            quantityProductElement.textContent = `${newQuantityValueProduct}P`;
            elementStatus.textContent = 'delivered';
            elementStatus.classList.add('delivered');
            btnDelivered.style.setProperty('cursor','not-allowed');
            btnDeclined.style.setProperty('cursor','not-allowed');

              // remove event in btn
            btnDeclined.removeEventListener('click',FuncOrderDeclined);
            btnDelivered.removeEventListener('click',FuncOrderDelivered);

              // if orders Users Change data  >> change eleemnt
            if(ordersUsersChange){
              const proOrder = document.querySelectorAll('body #container #main > section.leftSection .orders .productsOrders .proOrder');
              for(let i = 0;i<arrOrdersUsersChange.length;i++){
                for(let x = 0;x<proOrder.length;x++){
                  if(arrOrdersUsersChange[i].idUser === proOrder[x].idUser && arrOrdersUsersChange[i].idProduct === proOrder[x].idProduct){
                    proOrder[x].querySelector('.infoProduct .price-quantity label > span.quantityProduct').textContent = `${arrOrdersUsersChange[i].quantityProduct}P`;
                    if(arrOrdersUsersChange[i].status == 'pending'){
                      proOrder[x].querySelector('.infoUser-product > label > input[type="number"]').value = arrOrdersUsersChange[i].quantityProduct;
                      proOrder[x].querySelector('.infoUser-product > label > input[type="number"]').setAttribute('max',`${arrOrdersUsersChange[i].quantityProduct}`);
                    }

                    if(Number(arrOrdersUsersChange[i].quantityProduct) <= 0 && arrOrdersUsersChange[i].status == 'pending'){
                      proOrder[x].querySelector('.btns-declined-delivered > button:last-of-type').setAttribute('title','not-allowed');
                      proOrder[x].querySelector('.btns-declined-delivered > button:last-of-type').style.setProperty('pointer-events','none');
                      proOrder[x].querySelector('.btns-declined-delivered > button:last-of-type').style.setProperty('background','#9a9e9a');
                    }
                  } 
                }
              }
            }
            console.log(arrOrdersUsersChange);


              // update data in database User
            localStorage.removeItem('dataBaseUser');
            localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));

              // close popUp window
            popUpDeleteProduct.remove();
          }
          const btnNo = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:last-of-type'); 
          btnNo.onclick = function(){
            popUpDeleteProduct.remove();
          }
        }
        else{
          console.log(`quantity of user is invalid`);
        }
      }
    }
    static btnEditeProduct = function(objProduct,btnEditeProduct){
        btnEditeProduct.onclick = function(){
            Admin.dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
            let obj = '';
            for(let i = 0;i<Admin.dataBaseProducts.length;i++){
                if(Admin.dataBaseProducts[i].idProduct === objProduct.idProduct){
                    obj = Admin.dataBaseProducts[i];
                    break
                }
            }
            console.log(obj);
            const popUpEditeProduct = document.querySelector('body #popUpEditeProduct');
            popUpEditeProduct.classList.remove('hidden');
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > .uploadImageProduct .img > .imgProduct').src = obj.imgSrc;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpTitleProduct').focus();
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpTitleProduct').value = obj.titleProduct;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpTitleProduct').classList.add('valid');
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > select.selectCategory').selectedIndex = 0;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > select.selectCategory').classList.add('invalid');
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > select.selectSubCategory').selectedIndex = 0;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > select.selectSubSubCategory').selectedIndex = 0;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpPriceProduct').value = obj.priceProduct;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpPriceProduct').classList.add('valid');
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpQuantityProduct').value = obj.quantityProduct;
            popUpEditeProduct.querySelector('.containerPopUpEditeProduct > form > input.inpQuantityProduct').classList.add('valid');
            Admin.idProduct = obj.idProduct;
        }
    }
    static updateInfoProduct = function(objProduct,itemsSideBar){
        Admin.dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
        localStorage.removeItem('dataBaseProducts');
        let index = '';
        for(let i = 0;i<Admin.dataBaseProducts.length;i++){
            if(Admin.dataBaseProducts[i].idProduct === objProduct.idProduct){
                Admin.dataBaseProducts.splice(i,1,objProduct);
                index = i;
                break;
            }
        }
        localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));
        
        if(itemsSideBar[2].classList.contains('active')){ //if itemSideBar 2 is active
          const category = document.querySelectorAll(`body #container #main > section.leftSection .categories .category`);
          const subCategory = category[objProduct.arrIndex[0]].querySelectorAll(`body #container #main > section.leftSection .categories .category .subCategory`);
          const subSubCategory = subCategory[objProduct.arrIndex[1]].querySelectorAll(`body #container #main > section.leftSection .categories .category .subCategory div.subSubCategory`);
          const subSubCategoryElemnt = subSubCategory[objProduct.arrIndex[2]];

          for(let i = 0;i<subSubCategoryElemnt.childElementCount;i++){
              if(subSubCategoryElemnt.children[i].idProduct === objProduct.idProduct){
                  subSubCategoryElemnt.children[i].querySelector('.imgProduct > img').src = objProduct.imgSrc;
                  subSubCategoryElemnt.children[i].querySelector('.info .titleProduct').textContent = `${objProduct.titleProduct}`;
                  subSubCategoryElemnt.children[i].querySelector('.info .priceProduct').textContent = `${objProduct.priceProduct}$`;
                  subSubCategoryElemnt.children[i].querySelector('.info .quantityProduct').textContent = `${objProduct.quantityProduct}P`;
                  break;
              }
          } 
        }
        else if(itemsSideBar[4].classList.contains('active')){  //if itemSideBar 4 is active
          const products = document.querySelector('body #container #main > section.leftSection .addProduct > .products');
          for(let i = 0;i<products.childElementCount;i++){
              if(products.children[i].idProduct === objProduct.idProduct){
                  products.children[i].querySelector('.imgProduct > img').src = objProduct.imgSrc;
                  products.children[i].querySelector('.info .titleProduct').textContent = `${objProduct.titleProduct}`;
                  products.children[i].querySelector('.info .priceProduct').textContent = `${objProduct.priceProduct}$`;
                  products.children[i].querySelector('.info .quantityProduct').textContent = `${objProduct.quantityProduct}P`;
                  break;
              }
          }    
        }

    }
    static btnRemoveProduct = function(objProduct,btnRemoveProduct,wordName){
        btnRemoveProduct.onclick = function(){
            Admin.dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
            localStorage.removeItem('dataBaseProducts');
            let objP = ''; 
            for(let i = 0;i<Admin.dataBaseProducts.length;i++){
                if(objProduct.idProduct === Admin.dataBaseProducts[i].idProduct){
                    objP = Admin.dataBaseProducts[i];
                    Admin.dataBaseProducts.splice(i,1);
                    break;
                }
            }
            localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));
            if(localStorage.getItem('dataBaseProductsTrash') == null){
                localStorage.setItem('dataBaseProductsTrash',JSON.stringify([]));
            }
            Admin.dataBaseProductsTrash = JSON.parse(localStorage.getItem('dataBaseProductsTrash'));
            localStorage.removeItem('dataBaseProductsTrash');
            Admin.dataBaseProductsTrash.push(objP);
            localStorage.setItem('dataBaseProductsTrash',JSON.stringify(Admin.dataBaseProductsTrash));
            
            if(wordName === 'categories'){  //remove product when sideBar 2 active
              const category = document.querySelectorAll(`body #container #main > section.leftSection .categories .category`);
              const subCategory = category[objProduct.arrIndex[0]].querySelectorAll(`body #container #main > section.leftSection .categories .category .subCategory`);
              const subSubCategory = subCategory[objProduct.arrIndex[1]].querySelectorAll(`body #container #main > section.leftSection .categories .category .subCategory div.subSubCategory`);
              const subSubCategoryElemnt = subSubCategory[objProduct.arrIndex[2]];
              for(let i = 0;i<subSubCategoryElemnt.childElementCount;i++){
                if(subSubCategoryElemnt.children[i].idProduct === objProduct.idProduct){
                  subSubCategoryElemnt.children[i].remove();
                    break;
                }
              }
            }

            if(wordName === 'Add Product'){ //remove product when sideBar 4 active 
              const products = document.querySelector('body #container #main > section.leftSection .addProduct > .products');
              for(let i = 0;i<products.childElementCount;i++){
                  if(products.children[i].idProduct === objProduct.idProduct){
                      products.children[i].remove();
                      break;
                  }
              }
            }
            Admin.checkSubSubCategoryChildren();
        }
    }
    static displayTrashPopUpProduct = function(){
        if(localStorage.getItem('dataBaseProductsTrash') != null){
            Admin.dataBaseProductsTrash = JSON.parse(localStorage.getItem('dataBaseProductsTrash'));
            const products = document.querySelector('body #popUpTrash .containerPopUpTrash .products');
            Admin.dataBaseProductsTrash.forEach(function(obj,index){
                const article = document.createElement('article');
                article.setAttribute('class','product');
                article.idProduct = obj.idProduct;
                article.innerHTML =      
                    `<div class="imgProduct"><img src="${obj.imgSrc}" alt="photo product"></div>
                    <div class="info">
                      <h5 class="titleProduct">${obj.titleProduct}</h5>
                      <span class="priceProduct">${obj.priceProduct}$</span><span class="quantityProduct">${obj.quantityProduct}P</span>
                    </div>
                    <div class="btnsProducts">
                      <button class="btnRestore">Restore Product</button>
                      <button class="btnDelete">Delete Product</button>
                    </div>`;
                products.insertBefore(article,products.children[0]);
                Admin.btnRestoreProduct(obj,article.querySelector('.btnsProducts .btnRestore'));
                Admin.btnDeleteProduct(obj,article.querySelector('.btnsProducts .btnDelete'));
            });
        }
    }
    static btnRestoreProduct = function(objProduct,btnRestoreProduct){
        btnRestoreProduct.onclick = function(){
            Admin.dataBaseProductsTrash = JSON.parse(localStorage.getItem('dataBaseProductsTrash'));
            localStorage.removeItem('dataBaseProductsTrash');
            let objP = '';
            for(let i = 0;i<Admin.dataBaseProductsTrash.length;i++){
                if(objProduct.idProduct == Admin.dataBaseProductsTrash[i].idProduct){
                    objP = Admin.dataBaseProductsTrash[i];
                    Admin.dataBaseProductsTrash.splice(i,1);
                    break;
                }
            } 
            localStorage.setItem('dataBaseProductsTrash',JSON.stringify(Admin.dataBaseProductsTrash));
            const products = document.querySelector('body #popUpTrash .containerPopUpTrash .products');
            for(let i = 0;i<products.childElementCount;i++){
                if(products.children[i].idProduct === objProduct.idProduct){
                    products.children[i].remove();
                    break;
                }
            }
            Admin.dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
            localStorage.removeItem('dataBaseProducts');
            Admin.dataBaseProducts.push(objP);
            localStorage.setItem('dataBaseProducts',JSON.stringify(Admin.dataBaseProducts));
            Admin.displayProduct(objP,4);
        }
    }
    static btnDeleteProduct = function(objProduct,btnDeleteProduct){
        btnDeleteProduct.onclick = function(){
            const popUpDeleteProduct = document.createElement('div');
            popUpDeleteProduct.setAttribute('id','popUpDeleteProduct');
            document.body.appendChild(popUpDeleteProduct);
            popUpDeleteProduct.innerHTML = `
                <!-- start popUp delete product -->
                  <div class="containerPopUpDeleteProduct">
                    <h4>Are you sure you want to delete this product ?</h4>
                    <div class="btns">
                      <input type="button" title="Yes" value="Yes"><input type="button" title="No" value="No">
                    </div>
                  </div>`;
            const btnYes = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:first-of-type');
            btnYes.onclick = function(){    
                Admin.dataBaseProductsTrash = JSON.parse(localStorage.getItem('dataBaseProductsTrash'));
                localStorage.removeItem('dataBaseProductsTrash');
                for(let i = 0;i<Admin.dataBaseProductsTrash.length;i++){
                    if(objProduct.idProduct == Admin.dataBaseProductsTrash[i].idProduct){
                        Admin.dataBaseProductsTrash.splice(i,1);
                        break;
                    }
                } 
                localStorage.setItem('dataBaseProductsTrash',JSON.stringify(Admin.dataBaseProductsTrash));
                const products = document.querySelector('body #popUpTrash .containerPopUpTrash .products');
                for(let i = 0;i<products.childElementCount;i++){
                    if(products.children[i].idProduct === objProduct.idProduct){
                        products.children[i].remove();
                        break;
                    }
                } 
                Admin.idProducts = JSON.parse(localStorage.getItem('idProducts'));
                localStorage.removeItem('idProducts');
                for(let i = 0;i<Admin.idProducts.length;i++){
                    if(Admin.idProducts[i] === objProduct.idProduct){
                        Admin.idProducts.splice(i,1);
                        break;
                    }
                }
                localStorage.setItem('idProducts',JSON.stringify(Admin.idProducts));
                popUpDeleteProduct.remove();   
            }
            const btnNo = popUpDeleteProduct.querySelector('.containerPopUpDeleteProduct > .btns > input:last-of-type');
            btnNo.onclick = function(){
                popUpDeleteProduct.remove();
            }
        }
    }
    static addCustomer = function(){
        Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        const user = Admin.dataBaseUser[Admin.dataBaseUser.length-1];
        const users = document.querySelector('body #container #main > section.leftSection .customers .users');
        const article = document.createElement('div');
            article.setAttribute('class','user');
            article.id = user.id;
            article.innerHTML = `
                <div class="userHead">
                  <div class="img">
                    <a><i class="bx bx-camera"></i></a>
                    <img src="${user.imgSrc == undefined ? '' : user.imgSrc}">
                  </div>
                  <div class="btns-edite-delete-user">
                    <button class="btnEdite" title="Edite User">Edite</button>
                    <button class="btnDelete" title="Delete User">Delete</button>
                  </div>
                </div>
                <div class="infoUser">
                  <div>
                    <label class="keyUser">Id : </label><label class="idValue">${user.id}</label>
                  </div>
                  <div>
                    <label class="keyUser">FullName : </label><label class="fullNameValue">${user.firstName} ${user.LastName}</label>
                  </div>
                  <div>
                    <label class="keyUser">UserName : </label><label class="userNameValue">${user.UserName}</label>
                  </div>
                  <div>
                    <label class="keyUser">Email : </label><label class="emailValue">${user.Email}</label>
                  </div>
                  <div>
                    <label class="keyUser">Gender : </label><label class="genderValue">${user.Gender}</label>
                  </div>
                  <div>
                    <label class="keyUser">Birthday : </label><label class="birthDayValue">${user.BirthDay}</label>
                  </div>
                  <div>
                    <label class="keyUser">Account Creation : </label><label class="accountCreationvALUE">${user.accountCreation}</label>
                  </div>
                </div>`;
            users.insertBefore(article,users.children[0]);
            Admin.btnEditeCustomer(user,article.querySelector('.userHead .btns-edite-delete-user .btnEdite'));
            Admin.btnDeleteCustomer(user,article.querySelector('.userHead .btns-edite-delete-user .btnDelete'));
    }
    static displayCustomers = function(){
        Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        const users = document.querySelector('body #container #main > section.leftSection .customers .users');
        users.innerHTML = ``;
        if(Admin.dataBaseUser != null){
          Admin.dataBaseUser.forEach(function(user){
              const article = document.createElement('div');
              article.setAttribute('class','user');
              article.id = user.id;
              article.innerHTML = `
                  <div class="userHead">
                    <div class="img">
                      <a><i class="bx bx-camera"></i></a>
                      <img src="${user.imgSrc == undefined ? '' : user.imgSrc}">
                    </div>
                    <div class="btns-edite-delete-user">
                      <button class="btnEdite" title="Edite User">Edite</button>
                      <button class="btnDelete" title="Delete User">Delete</button>
                    </div>
                  </div>
                  <div class="infoUser">
                    <div>
                      <label class="keyUser">Id : </label><label class="idValue">${user.id}</label>
                    </div>
                    <div>
                      <label class="keyUser">FullName : </label><label class="fullNameValue">${user.firstName} ${user.LastName}</label>
                    </div>
                    <div>
                      <label class="keyUser">UserName : </label><label class="userNameValue">${user.UserName}</label>
                    </div>
                    <div>
                      <label class="keyUser">Email : </label><label class="emailValue">${user.Email}</label>
                    </div>
                    <div>
                      <label class="keyUser">Gender : </label><label class="genderValue">${user.Gender}</label>
                    </div>
                    <div>
                      <label class="keyUser">Birthday : </label><label class="birthDayValue">${user.BirthDay}</label>
                    </div>
                    <div>
                      <label class="keyUser">Account Creation : </label><label class="accountCreationvALUE">${user.accountCreation}</label>
                    </div>
                  </div>`;
              users.insertBefore(article,users.children[0]);
              Admin.btnEditeCustomer(user,article.querySelector('.userHead .btns-edite-delete-user .btnEdite'));
              Admin.btnDeleteCustomer(user,article.querySelector('.userHead .btns-edite-delete-user .btnDelete'));
          });
        }
    }
    static btnEditeCustomer = function(user,btnEdite){
      btnEdite.onclick = function(){
        const popUpEditeUser = document.querySelector('body #popUpEditeUser');
            popUpEditeUser.classList.remove('hidden');
             popUpEditeUser.querySelector('.formEditeUser div .inpFirstName').value = user.firstName;
             popUpEditeUser.querySelector('.formEditeUser div .inpFirstName').classList.add('invalid');
             popUpEditeUser.querySelector('.formEditeUser div .inpLastName').value = user.LastName;
             popUpEditeUser.querySelector('.formEditeUser div .inpLastName').classList.add('invalid');
             popUpEditeUser.querySelector('.formEditeUser div .inpUserName').value = user.UserName;
             popUpEditeUser.querySelector('.formEditeUser div .inpUserName').classList.add('invalid');
             popUpEditeUser.querySelector('.formEditeUser div .inpEmail').value = user.Email;
             popUpEditeUser.querySelector('.formEditeUser div .inpEmail').classList.add('invalid');
            if(popUpEditeUser.querySelector('.formEditeUser div input[name="gender"].male').value === user.Gender){
                popUpEditeUser.querySelector('.formEditeUser div input[name="gender"].male').checked = true;
            }
            else if(popUpEditeUser.querySelector('.formEditeUser div input[name="gender"].female').value === user.Gender){
                popUpEditeUser.querySelector('.formEditeUser div input[name="gender"].female').checked = true;
            }
            popUpEditeUser.querySelector('.formEditeUser  div:nth-of-type(5) > div > input.inpPassWord').value = user.PassWord;
            popUpEditeUser.querySelector('.formEditeUser  div:nth-of-type(5) > div > input.inpPassWord').classList.add('invalid');
            popUpEditeUser.querySelector('.formEditeUser  div:nth-of-type(6) > input.inpConfirmPassWord').value = user.PassWord;
            popUpEditeUser.querySelector('.formEditeUser  div:nth-of-type(6) > input.inpConfirmPassWord').classList.add('invalid');
            popUpEditeUser.querySelector('.formEditeUser div .inpBirthDay').value = user.BirthDay;
            popUpEditeUser.querySelector('.formEditeUser div .inpBirthDay').classList.add('valid');
            Admin.customer = user;
          }
        }
        // btn Delete Customer
        static btnDeleteCustomer = function(user,btnEdite){
          btnEdite.onclick = function(){
            const popUpDeleteCustomer = document.createElement('div');
            popUpDeleteCustomer.className = 'popUpDeleteCustomer';
            popUpDeleteCustomer.setAttribute('id','popUpDeleteCustomer');
            popUpDeleteCustomer.innerHTML = `
              <div class="containerPopUpDeleteCustomer">
              <h4>Are you sure you want to delete this Account ?</h4>
              <div class="btns">
                <input type="button" title="Yes" value="Yes"><input type="button" title="No" value="No">
              </div>
              </div>`;
            document.body.appendChild(popUpDeleteCustomer);
            // if click btn yes >> delete account
            popUpDeleteCustomer.querySelector(' .containerPopUpDeleteCustomer > .btns > input:first-of-type').onclick = function(){
              Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser')); 
              localStorage.removeItem('dataBaseUser');
              for(let i = 0;i<Admin.dataBaseUser.length;i++){
                if(Admin.dataBaseUser[i].id === user.id){
                  // add customer to dataBaseUserTrash 
                  Admin.dataBaseUserTrash = JSON.parse(localStorage.getItem('dataBaseUserTrash'));
                  localStorage.removeItem('dataBaseUserTrash');
                  Admin.dataBaseUser[i].status = false;
                  Admin.dataBaseUserTrash.push(Admin.dataBaseUser[i]);
                  localStorage.setItem('dataBaseUserTrash',JSON.stringify(Admin.dataBaseUserTrash));
                  // remove customer from dataBaseUser
                  Admin.dataBaseUser.splice(i,1);
                  break;
                }
              };
              // for(let i = 0;i<Admin.dataBaseUserEdite.length;i++){
              //   if(Admin.dataBaseUserEdite[i].id === user.id){
              //     Admin.dataBaseUserEdite.splice(i,1);
              //     break;
              //   }
              // };

              // set new data in local storage [dataBaseUser & dataBaseEdite]
              localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));
              // localStorage.setItem('dataBaseUserEdite',JSON.stringify(Admin.dataBaseUserEdite));

              // remove element 
              const users = document.querySelector('body #container #main > section.leftSection .customers .users');
              for(let i = 0;i<users.childElementCount;i++){
                if(user.id === users.children[i].id){
                  users.children[i].remove();
                  break;
                };
              }
              popUpDeleteCustomer.remove();
            }
            // if click btn no delete account
            popUpDeleteCustomer.querySelector('body #popUpDeleteCustomer .containerPopUpDeleteCustomer > .btns > input:last-of-type').onclick = function(){
              popUpDeleteCustomer.remove();
            }  
          }
        }
        // btn update Info Customer
        static updateInfoCustomer = function(user){
          let bool = false;
          // up date database Edite
          Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
          Admin.dataBaseUserEdite = JSON.parse(localStorage.getItem('dataBaseUserEdite'));
          Admin.dataBaseUserEdite.forEach(function(obj,index){
              if(obj.id === user.id){
                  Admin.dataBaseUserEdite.splice(index,1,user);
                  bool = true;
              }
          });
          if(bool === false){
              Admin.dataBaseUserEdite.push(user);
          }
          localStorage.removeItem('dataBaseUserEdite');
          localStorage.setItem('dataBaseUserEdite',JSON.stringify(Admin.dataBaseUserEdite));
          if(user.upDateDataLogin === true){    // if admin upDate info data login user
            Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            localStorage.removeItem('dataBaseUser');
            const {firstName,LastName,Gender,BirthDay,upDateDataLogin} = user;
            for(let i = 0;i<Admin.dataBaseUser.length;i++){
              if(Admin.dataBaseUser[i].id === user.id){
                Admin.dataBaseUser[i].firstName = firstName;
                Admin.dataBaseUser[i].LastName = LastName;
                Admin.dataBaseUser[i].Gender = Gender;
                Admin.dataBaseUser[i].BirthDay = BirthDay;
                Admin.dataBaseUser[i].upDateDataLogin = upDateDataLogin;
                
                // add notification to user about 'dataLogin' 
                  // set date to the notification 
                const date = new Date();
                let hour = Number(date.getHours());
                hour < 10 ? `0${hour}` : hour;
                let minutes = Number(date.getMinutes());
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                let day = Number(date.getDate());
                day = day < 10 ? `0${day}` : day;
                let month = Number(date.getMonth()+1);
                month = month < 10 ? `0${month}` : month;
                let year = date.getFullYear();
                
                
                const onjNotification = {
                  id: user.id,
                  sender: `Admin`,
                  msg: `The administrator has changed the login information,<br><b>Email</b> : ${user.Email} , <b>UserName</b> : ${user.UserName} , <b>Password</b> : ${user.PassWord}`,
                  read: false,
                  type: 'dataLogin',
                  year: year,
                  month: month,
                  day: day,
                  hour: hour,
                  minutes: minutes
                }
                Admin.dataBaseUser[i].notifications.push(onjNotification);
                
                break;
              }
            }
            localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));
          }
          else{   // if admin not upDate info data login user 

            Admin.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            localStorage.removeItem('dataBaseUser');
            for(let i = 0;i<Admin.dataBaseUser.length;i++){
              if(Admin.dataBaseUser[i].id === user.id){
                Admin.dataBaseUser.splice(i,1,user);
                break;
              }
            }
            localStorage.setItem('dataBaseUser',JSON.stringify(Admin.dataBaseUser));
          }

          const users = document.querySelector('body #container #main > section.leftSection .customers .users');
          for(let i = 0;i<users.childElementCount;i++){
            if(users.children[i].id === user.id){
                users.children[i].innerHTML = `
                <div class="userHead">
                  <div class="img">
                    <a><i class="bx bx-camera"></i></a>
                    <img src="${user.imgSrc == undefined ? '' : user.imgSrc}">
                  </div>
                  <div class="btns-edite-delete-user">
                    <button class="btnEdite" title="Edite User">Edite</button>
                    <button class="btnDelete" title="Delete User">Delete</button>
                  </div>
                </div>
                <div class="infoUser">
                  <div>
                    <label class="keyUser">Id : </label><label class="idValue">${user.id}</label>
                  </div>
                  <div>
                    <label class="keyUser">FullName : </label><label class="fullNameValue">${user.firstName} ${user.LastName}</label>
                  </div>
                  <div>
                    <label class="keyUser">UserName : </label><label class="userNameValue">${user.UserName}</label>
                  </div>
                  <div>
                    <label class="keyUser">Email : </label><label class="emailValue">${user.Email}</label>
                  </div>
                  <div>
                    <label class="keyUser">Gender : </label><label class="genderValue">${user.Gender}</label>
                  </div>
                  <div>
                    <label class="keyUser">Birthday : </label><label class="birthDayValue">${user.BirthDay}</label>
                  </div>
                  <div>
                    <label class="keyUser">Account Creation : </label><label class="accountCreationvALUE">${user.accountCreation}</label>
                  </div>
                </div>`;
                Admin.btnEditeCustomer(user,users.children[i].querySelector('.userHead .btns-edite-delete-user .btnEdite'));
                Admin.btnDeleteCustomer(user,users.children[i].querySelector('.userHead .btns-edite-delete-user .btnDelete'));
                break;
            }
        }
    }
}
export {Admin};

// arithmetic calculator  => 'BIDMAS' =>=> Bracket Indices Division Multiplication Addition Subtraction
