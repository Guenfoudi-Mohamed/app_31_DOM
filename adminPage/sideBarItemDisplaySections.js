
import {Admin} from '../adminPage/classAdmin.js';
import {adminNotifications} from '../adminPage/adminNotifications.js';
import {AdminDashBoard} from '../adminPage/dashBoard.js';
import {selectFilter} from '../adminPage/addCustomers.js';

            
// event for display sections
const itemsSideBar = document.querySelectorAll('body #container section#sideBar > nav > .list > li.item > a');
const sectionChildren = document.querySelectorAll('body #container #main > section.leftSection > div');
itemsSideBar.forEach(function(value,index,arr){
    if(index !== 2){
        value.addEventListener('click',function(){
            for(let i = 0;i<itemsSideBar.length;i++){
                if(i != index){
                    itemsSideBar[i].classList.remove('active');
                    sectionChildren[i].style.setProperty('display','none');
                }
                else if(i == index){
                    itemsSideBar[i].classList.add('active');
                    sectionChildren[i].style.setProperty('display','flex'); 
                    sectionChildren[i].style.setProperty('flex-direction','column'); 
                    if(itemsSideBar[2].querySelector('i:nth-child(2)').className == 'bx bxs-chevron-up'){
                        itemsSideBar[2].click();
                        itemsSideBar[i].click();
                    } 
                    if(i === 0){
                        selectFilter.selectedIndex = 0;
                        AdminDashBoard.displayDataDashBoard();
                        AdminDashBoard.DisplayRecentOrders();
                        AdminDashBoard.RecentUpdate();
                    }
                    if(i === 1){
                        selectFilter.selectedIndex = 0;
                        Admin.displayCustomers();
                    }
                    if(i === 3){
                        Admin.displayOrders();
                    }
                    if(i === 4){ //item sideBar number 4 > display products
                        Admin.displayProductFromItemsSideBar(document.querySelector('body #container #main > section.leftSection .addProduct > .products'),'Add Product');
                    }
                    if(i === 5){
                        adminNotifications.displayNotification();
                    }
                    if(i === 6){
                        Admin.displayInfoAdminFormEdite();
                    }
                }
            }
        });
    }
})



// // add event for third item in sideBar
itemsSideBar[2].addEventListener('click',function(){
    const icon = itemsSideBar[2].querySelector("i:nth-child(2)");
    const CategoryList = document.querySelector('body #container section#sideBar nav .list li:nth-child(3) > ul.CategoryList');
    if(icon.classList == 'bx bxs-chevron-down'){
        icon.classList = 'bx bxs-chevron-up';
        CategoryList.style.setProperty('display','block');
    }
    else if(icon.classList == 'bx bxs-chevron-up'){
        itemsSideBar[2].querySelector("i:nth-child(2)").className = 'bx bxs-chevron-down';
        CategoryList.style.setProperty('display','none');
    }
    for(let i = 0;i<itemsSideBar.length;i++){
        if(i == 2){
            itemsSideBar[i].classList.add('active');
            sectionChildren[i].style.setProperty('display','block');
        }else if(i != 2){
            itemsSideBar[i].classList.remove('active');
            sectionChildren[i].style.setProperty('display','none');
        }
    }
    itemSubCategoryList[0].click();
    Admin.displayProductFromItemsSideBar(document.querySelectorAll('body #container #main > section.leftSection .categories .category'),'categories');
    Admin.checkSubSubCategoryChildren();
});


// // event for item SubCategoryList
const itemSubCategoryList = document.querySelectorAll('body #container section#sideBar nav .list li:nth-child(3) > ul.CategoryList > li > a');
const categorys = document.querySelectorAll('body #container #main > section.leftSection .categories .category');
const itemSubCategoryListSub = document.querySelectorAll('body #container section#sideBar nav .list li:nth-child(3) > ul.CategoryList > li > a.sub');
itemSubCategoryList.forEach(function(value,index,arr){
    if(index == 0){
        value.addEventListener('click',function(){
            for(let i = 0;i<categorys.length;i++){
                categorys[i].style.setProperty('display','block');
                categorys[i].previousElementSibling.style.setProperty('display','block'); 
            }
        });
    }
    else if(index > 0){
        value.addEventListener('click',function(){
            const icon = value.querySelector('i');
            for(let i = 0;i<categorys.length;i++){
                if(index-1 == i){
                    if(itemSubCategoryListSub[index-1].querySelector('i').className == 'bx bxs-chevron-up'){
                        itemSubCategoryListSub[index-1].querySelector('i').className = 'bx bxs-chevron-down';
                        itemSubCategoryListSub[index-1].nextElementSibling.style.setProperty('display','none');
                        break;
                    }
                    categorys[index-1].previousElementSibling.style.setProperty('display','block'); 
                    categorys[index-1].style.setProperty('display','block');
                    itemSubCategoryListSub[index-1].querySelector('i').className = 'bx bxs-chevron-up'; 
                    itemSubCategoryListSub[index-1].nextElementSibling.style.setProperty('display','block');
                }
                else if(index-1 != i){
                    categorys[i].style.setProperty('display','none');
                    categorys[i].previousElementSibling.style.setProperty('display','none'); 
                    itemSubCategoryListSub[i].nextElementSibling.style.setProperty('display','none');
                    itemSubCategoryListSub[i].querySelector('i').className = 'bx bxs-chevron-down'; 
                }
            }
        });
    }
});

// // event for item subSubCategoryList
const itemSubSubCategoryList = document.querySelectorAll('body #container section#sideBar nav .list li:nth-child(3) > ul.CategoryList > li > ul.SubCategoryList > li > a');
const subSubCategoryList = document.querySelectorAll('body #container section#sideBar nav .list li:nth-child(3) > ul.CategoryList > li > ul.SubCategoryList > li > ul.subSubCategoryList');
itemSubSubCategoryList.forEach(function(value,index,arr){
    value.addEventListener('click',function(){
        for(let i = 0;i<subSubCategoryList.length;i++){
            if(i == index){
                if(value.querySelector('i').className == 'bx bxs-chevron-up'){
                    value.querySelector('i').className = 'bx bxs-chevron-down';
                    subSubCategoryList[i].style.setProperty('display','none');
                    break;    
                }
                if(value.querySelector('i').className == 'bx bxs-chevron-down'){
                    value.querySelector('i').className = 'bx bxs-chevron-up';
                } 
                subSubCategoryList[i].style.setProperty('display','block');
            }
            else if(i != index){
                if(itemSubSubCategoryList[i].querySelector('i').className == 'bx bxs-chevron-up'){
                    itemSubSubCategoryList[i].querySelector('i').className = 'bx bxs-chevron-down';
                }
                subSubCategoryList[i].style.setProperty('display','none');
            }
        }
    });
});

export {itemSubCategoryList,itemsSideBar};

window.addEventListener('DOMContentLoaded',function(){
    // display 'default section' 
    itemsSideBar[0].click();
    itemsSideBar[0].click();
});