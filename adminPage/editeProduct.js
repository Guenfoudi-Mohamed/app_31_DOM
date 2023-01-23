import {itemsSideBar, itemSubCategoryList} from '../adminPage/sideBarItemDisplaySections.js';
import {upLoadImgProfile} from '../registerForm/patterns&validInp.js';
import {validSelect,patternsInputProduct,validInputFormProduct,fillInputCategoryProduct,clearDataFormProduct,inpSelectClear} from '../adminPage/addProduct.js';
import { Admin } from './classAdmin.js';

const popUpEditeProduct = document.querySelector('body #popUpEditeProduct');
// event for close Window 'popUpEditeProduct'
const btnClosePopUpEditeProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > .btnClosePopUpEditeProduct');
btnClosePopUpEditeProduct.onclick = function(){
    clearDataFormProduct(inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory)
    popUpEditeProduct.classList.add('hidden');
};


// event input [Title Product]
const inpTitleProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > input.inpTitleProduct');
inpTitleProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.TitleProduct);
});

// event for input file
const inpUploadPhotoProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > .uploadImageProduct .img > input[type="file"]');
const arrImgs = [document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > .uploadImageProduct .img > .imgProduct')];
inpUploadPhotoProduct.onchange = function(){
    upLoadImgProfile(inpUploadPhotoProduct,arrImgs);
}

// event input [Price Product]
const inpPriceProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > input.inpPriceProduct');
inpPriceProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.PriceProduct);
});

// event input [Quantity Product]
const inpQuantityProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > input.inpQuantityProduct');
inpQuantityProduct.addEventListener('keyup',function(){
    validInputFormProduct(this,patternsInputProduct.QuantityProduct);
});

// inps select [category subCategory subSubCategory]
const inpSelectCategory = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > select.selectCategory');
const inpSelectSubCategory = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > select.selectSubCategory');
const inpSelectSubSubCategory = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > select.selectSubSubCategory');

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

// event for button Edite Product
const btnSaveProduct = document.querySelector('body #popUpEditeProduct .containerPopUpEditeProduct > form > input.btnSaveProduct');
btnSaveProduct.onclick = function(){
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
        Admin.updateInfoProduct({idProduct:Admin.idProduct,imgSrc:arrImgs[0].getAttribute('src'),titleProduct:inpTitleProduct.value,priceProduct:inpPriceProduct.value,quantityProduct:inpQuantityProduct.value,Category:inpSelectCategory.value,subCategory:inpSelectSubCategory.value,subSubCategory:inpSelectSubSubCategory.value,arrIndex:[inpSelectCategory[inpSelectCategory.selectedIndex].matricule,inpSelectSubCategory[inpSelectSubCategory.selectedIndex].matricule,inpSelectSubSubCategory[inpSelectSubSubCategory.selectedIndex].matricule]},itemsSideBar);
        btnClosePopUpEditeProduct.click();
    }
}

window.addEventListener('DOMContentLoaded',function(){
    fillInputCategoryProduct(inpSelectCategory,itemSubCategoryList);
    clearDataFormProduct(inpTitleProduct,inpPriceProduct,inpQuantityProduct,inpSelectCategory,inpSelectSubCategory,inpSelectSubSubCategory)
});
// localStorage.setItem('dataBaseProductsTrash',JSON.stringify([]));