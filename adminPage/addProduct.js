import {itemSubCategoryList,itemsSideBar} from '../adminPage/sideBarItemDisplaySections.js';
import {upLoadImgProfile} from '../registerForm/patterns&validInp.js';
import {Admin} from '../adminPage/classAdmin.js';

const inpSelectCategory = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > select.selectCategory');
const inpSelectSubCategory = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > select.selectSubCategory');
const inpSelectSubSubCategory = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > select.selectSubSubCategory');

const popUpAddProduct = document.querySelector('body #popUpAddProduct');
// event for display 'popUpAddProduct'
const btnsAddProduct = [document.querySelector('body #container #main > section.leftSection .addProduct > .btn-addProduct-trash > button.btnAddProduct'),document.querySelector('body #container #main > section.rightSection .btnAddProduct')];
btnsAddProduct.forEach(function(value){
    value.onclick = function(){
        popUpAddProduct.classList.remove('hidden');
    }
});

// event for close Window 'popUpAddProduct'
const btnClosePopUpAddProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > .btnClosePopUpAddProduct');
btnClosePopUpAddProduct.onclick = function(){
    popUpAddProduct.classList.add('hidden');
    clearDataFormProduct(inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory)
};

// event for display 'popUpTrash'
const btnTrash = document.querySelector('body #container #main > section.leftSection .addProduct > .btn-addProduct-trash > button.btnTrash');
const popUpTrash = document.querySelector('body #popUpTrash');
btnTrash.onclick = function(){
    popUpTrash.classList.remove('hidden');
    popUpTrash.querySelector('.products').innerHTML = '';
    Admin.displayTrashPopUpProduct();
}

const btnClosePopUpTrash = popUpTrash.querySelector('.containerPopUpTrash > .btnClosePopUpTrash');
btnClosePopUpTrash.onclick = function(){
    popUpTrash.classList.add('hidden');
}


// event change > for inpSelectCategory
inpSelectCategory.onchange = function(){
    inpSelectClear(inpSelectSubCategory);
    const arrInpSelectSubCategory = itemSubCategoryList[Number(inpSelectCategory.selectedIndex)].parentElement.querySelectorAll('.SubCategoryList > li > a');
    inpSelectSubCategory.selectedIndex = 0;
    inpSelectSubSubCategory.selectedIndex = 0;

    for(let i = 0;i<arrInpSelectSubCategory.length;i++){
        const option = document.createElement('option');
        option.textContent = arrInpSelectSubCategory[i].textContent;
        // set matricule
        option['matricule'] = i;
        inpSelectSubCategory.appendChild(option);
    }
    inpSelectClear(inpSelectSubSubCategory);
    validSelect(this,inpSelectSubCategory,inpSelectSubSubCategory);
}

// event change > for inpSelectSubCategory
inpSelectSubCategory.onchange = function(){
    inpSelectClear(inpSelectSubSubCategory);
    const arrInpSelectSubSubCategory = itemSubCategoryList[Number(inpSelectCategory.selectedIndex)].parentElement.querySelectorAll('.SubCategoryList > li > a')[inpSelectSubCategory.selectedIndex-1].parentElement.querySelectorAll('.subSubCategoryList > li > a');
    inpSelectSubSubCategory.selectedIndex = 0;
    for(let i = 0;i<arrInpSelectSubSubCategory.length;i++){
        const option = document.createElement('option');
        option.textContent = arrInpSelectSubSubCategory[i].textContent;
        // set matricule
        option['matricule'] = i;
        inpSelectSubSubCategory.appendChild(option);
    }
    validSelect(inpSelectCategory,this,inpSelectSubSubCategory);
}

// event change > for inpSelectSubSubCategory
inpSelectSubSubCategory.onchange = function(){
    validSelect(inpSelectCategory,inpSelectSubCategory,this);
}

// function valid Select inp categorys 
function validSelect(inpSelectC,inpSelectSC,inpSelectSSC){
    [inpSelectC,inpSelectSC,inpSelectSSC].forEach(function(inpSelect){
        if(inpSelect.selectedIndex === 0){
            inpSelect.classList.remove('valid');
            inpSelect.classList.add('invalid');
        }
        else if(inpSelect.selectedIndex !== 0){
            inpSelect.classList.add('valid');
            inpSelect.classList.remove('invalid');
        }
    })
}

// function clear Option from inp select
function inpSelectClear(inpSelect){
    for(let i = inpSelect.length-1;i>0;i--){
        inpSelect.children[i].remove();
    }
    inpSelect.selectedIndex = 0;
}

// function clear Data Form [Add Product]
function clearDataFormProduct(inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory){
    // inpSelectClear(inpSelectCategory);
    arrImgs[0].src = '';
    inpSelectClear(inpSelectSubCategory);
    inpSelectClear(inpSelectSubSubCategory);
    inpSelectCategory.selectedIndex = 0;
    [inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory].forEach(function(inp,index){
        if(index < 3){
            inp.value = '';
        }
        inp.classList.remove('valid');
        inp.classList.remove('invalid')
    });
}

// patterns Input Add Product
const patternsInputProduct = {
    TitleProduct: /^([a-zA-Z]{1})([a-zA-Z \/\+\-]([0-9]{1,})?){4,70}$/,
    PriceProduct: /^([1-9]){1}(([0-9]){1,3})?(\.([0-9]{1,2}))?$/,
    QuantityProduct: /^([1-9]{1})([0-9]{1,2})?$/
}

// event input [Title Product]
const inpTitleProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > input.inpTitleProduct');
inpTitleProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.TitleProduct);
});

// event for input file
const inpUploadPhotoProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > .uploadImageProduct .img > input[type="file"]');
const arrImgs = [document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > .uploadImageProduct .img > .imgProduct')];
inpUploadPhotoProduct.onchange = function(){
    upLoadImgProfile(inpUploadPhotoProduct,arrImgs);
}

// event input [Price Product]
const inpPriceProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > input.inpPriceProduct');
inpPriceProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.PriceProduct);
});

// event input [Quantity Product]
const inpQuantityProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > input.inpQuantityProduct');
inpQuantityProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.QuantityProduct);
});

// function valid Input Form Add Product
function validInputFormProduct(inp,regEx){
    if(regEx.test(inp.value)){inp.classList.add('valid');inp.classList.remove('invalid');}
    else if(regEx.test(inp.value) === false){inp.classList.add('invalid');inp.classList.remove('valid');}
}


// event for button Create Product
const btnCreateProduct = document.querySelector('body #popUpAddProduct .containerPopUpAddProduct > form > input.btnCreateProduct');
btnCreateProduct.onclick = function(){
    let counter = 0;
    if(arrImgs[0].getAttribute('src') != ''){counter++;};
    [inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory].forEach(function(inp,index){
        if(inp.classList.contains('valid') && index < 3){
            counter++;
        }
        if(inp.classList.contains('valid') && index >= 3){
            counter++;
        }
    })
    if(counter === 7){
        Admin.addProductTolocalStorage(itemsSideBar, {idProduct:setIdProduct(inpTitleProduct.value,inpSelectCategory.value,inpSelectSubCategory.value,inpSelectSubSubCategory.value),imgSrc:arrImgs[0].getAttribute('src'),titleProduct:inpTitleProduct.value,priceProduct:inpPriceProduct.value,quantityProduct:inpQuantityProduct.value,Category:inpSelectCategory.value,subCategory:inpSelectSubCategory.value,subSubCategory:inpSelectSubSubCategory.value,arrIndex:[inpSelectCategory[inpSelectCategory.selectedIndex].matricule,inpSelectSubCategory[inpSelectSubCategory.selectedIndex].matricule,inpSelectSubSubCategory[inpSelectSubSubCategory.selectedIndex].matricule]});
        btnClosePopUpAddProduct.click();
    }
}

// *********************** fill products in database 

        // function fillProducts(){
            // const arrTitleProduct = ['Hp Dual Core/Core2 Duo PC + MONITOR Window 10 +Office 16','Smart TVs','Dvd Players & Recorders','Computers','Antivirus And Security','Computer Accesories','Mobile Phones','Tablets','Mobile Accesories','Foundation','Eyes hadow','Powder','Hair & Scalp Care','Shampoo & Conditioner','Hair Accessories','Face Protection','Lab, Safety & Work Gloves','mascara','Clothing Women','Dresses','Handbags & Wallets','Clothing Men','Traditional & CulturalWear','Shoes',"Boy's Fashion","Girl's Fashion"];
        //     const category = ['Technology & electronics','Health & Beauty','Fashion'];
        //     const subCategory = ['Television & video','Computing','Phones & Tablet','Make Up','Hair Care','Health Care',"Women's Fashion","Men's Fashion","Kid's Fashion"];
        //     const subSubCategory = ['Television','Smart TVs','Dvd Players & Recorders','Computers','Antivirus and security','Computer Accesories','Mobile Phones','Tablets','Mobile Accesories','Foundation','Eyeshadow','Powder','Hair & Scalp Care','Shampoo & Conditioner','Hair Accessories','Face Protection','Lab, Safety & Work Gloves','mascara','Clothing','Dresses','Handbags & Wallets','Clothing','Traditional & Cultural Wear','Shoes',"Boy's Fashion","Girl's Fashion"];
        //     const arr = [];
        //     let c,sC,ssC;
        //     let Quantity = 0;
        //     let Price = 0;
        //     c=0;
        //     sC=0;
        //     ssC=0;
        //     let titleCounter = 0;
        //     let i = 0;
        //     let x = 0;
        //     for(let y =0;y<subSubCategory.length;y++){
        //             //  i
        //         if(y >= 0 && y <= 8){i = 0;    if(y >= 0 && y <= 2){    x=0}else if(y >= 3 && y <= 5){    x=1}else if(y >= 6 && y <= 8){    x=2}}else if(y >= 9 && y <= 17){    i = 1;    if(y >= 9 && y <= 11){    x=0}else if(y >= 12 && y <= 14){    x=1}else if(y >= 15 && y <= 17){    x=2}    }else if(y >= 18 && y <= 26){    i = 2;    if(y >= 18 && y <= 20){    x=0}else if(y >= 21 && y <= 23){    x=1}else if(y >= 24 && y <= 26){    x=2}    }
        //         console.log(i,x,ssC);
        //         for(let p = 0;p<8;p++){
        //             Quantity = Math.ceil(Math.random() * 10);
        //             Price = Math.ceil(Math.random() * 250);
        //             const obj = {idProduct:setIdProduct(arrTitleProduct[titleCounter],category[i],subCategory[x],subSubCategory[y]),imgSrc:'',titleProduct:arrTitleProduct[titleCounter],priceProduct: Price,quantityProduct: Quantity,Category: category[i],subCategory: subCategory[x],subSubCategory: subSubCategory[y],arrIndex: [i,x,ssC]};
        //             arr.push(obj);
        //         }                       
        //         titleCounter++;        
        //         if(titleCounter >= 26){return arr;}
        //         ssC++   
        //         ssC = ssC >= 3 ? 0 : ssC;
        //     }
        // }

        // if(false){
        //     localStorage.removeItem('idProducts');
        //     localStorage.removeItem('dataBaseProducts');
        //     const arrProduct = [...fillProducts()];
        //     localStorage.setItem('dataBaseProducts',JSON.stringify(arrProduct));
        // }


    // Set photo to products
    // function setPhotoProducts(){    
    //     const arrProduct = ["../images/Television.jpg","../images/SmartTVs.jpg","../images/DvdPlayers&Recorders.jpg",
    //     "../images/Computers.jpg","../images/AntivirusAndSecurity.jpg","../images/ComputerAccesories.jpg",
    //     "../images/MobilePhones.jpg","../images/Tablets.jpg","../images/MobileAccesories.jpg",
    //     "../images/Foundation.jpg","../images/Eyeshadow.jpg","../images/Powder.jpg",
    //     "../images/Hair&ScalpCare.jpg","../images/Shampoo&Conditioner.jpg","../images/HairAccessories.jpg",
    //     "../images/FaceProtection.jpg","../images/Lab,Safety&WorkGloves.jpg","../images/mascara.jpg",
    //     "../images/ClothingWomen.jpg","../images/Dresses.jpg","../images/Handbags&Wallets.jpg",
    //     "../images/ClothingMen.jpg","../images/Traditional&CulturalWear.jpg","../images/Shoes.jpg",
    //     "../images/Boy'sFashion.jpg","../images/Girl'sFashion.jpg"];
    //     const dataBaseProducts = JSON.parse(localStorage.getItem('dataBaseProducts'));
    //     let counterBreak = 0;
    //     let x = 0;
    //     for(let i = 0;i<arrProduct.length;i++){
    //         for(;x<dataBaseProducts.length;x++){
    //             dataBaseProducts[x].imgSrc = arrProduct[i];
    //             console.log(x,i);
    //             counterBreak++;
    //             if(counterBreak == 8){
    //                 counterBreak = 0;
    //                 break;
    //             }
    //         }x++;
    //     }
    //     localStorage.setItem('dataBaseProducts',JSON.stringify(dataBaseProducts));
    // }
    // setPhotoProducts();

function setIdProduct(inpTitleProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory){
    // console.log(inpTitleProduct);
    let idProduct = `${inpTitleProduct[0]}/${inpSelectCategory[0]}-${inpSelectSubCategory[0]}-${inpSelectSubSubCategory[0]}-`;
    for(let i = 0;i<7;i++){
        idProduct += Math.floor(Math.random() * 10);
        if(i===5){
            if(localStorage.getItem('idProducts') == null){localStorage.setItem('idProducts',JSON.stringify([]))}
            const idProducts = JSON.parse (localStorage.getItem('idProducts'));
            const idProductDouble = idProducts.find(function(idProductsDouble){
                if(idProduct === idProductsDouble){
                    return idProductsDouble;
                }
           }); 
           if(idProductDouble === undefined){
                const item = JSON.parse(localStorage.getItem('idProducts'));
                const arr = [...item,idProduct];
                localStorage.removeItem('idProducts');
                localStorage.setItem('idProducts',JSON.stringify(arr));
                return idProduct;
            }
            else if(idProductDouble != undefined){
                idProduct = `${inpTitleProduct[0]}/${inpSelectCategory}-${inpSelectSubCategory}-${inpSelectSubSubCategory}-`;
                i = -1;
            }       
        }
    }
}

// fill input category product 
function fillInputCategoryProduct(inpSelectCategory,itemSubCategoryList){
    for(let i = 1;i<itemSubCategoryList.length;i++){
        const option = document.createElement('option');
        option.textContent = itemSubCategoryList[i].textContent;
        // set matricule
        option['matricule'] = i-1;
        inpSelectCategory.appendChild(option);
    }
}

window.addEventListener('DOMContentLoaded',function(){
    fillInputCategoryProduct(inpSelectCategory,itemSubCategoryList);
    clearDataFormProduct(inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory)
});

export {validSelect,patternsInputProduct,validInputFormProduct,fillInputCategoryProduct,clearDataFormProduct,inpSelectClear}
