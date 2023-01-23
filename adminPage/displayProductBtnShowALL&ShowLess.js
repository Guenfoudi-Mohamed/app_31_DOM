
const btnsShowAll = document.querySelectorAll('body #container #main > section.leftSection .categories .category .subCategory .row-title-btn-subSubCategory > h5 > a.btnShowAll'); 
const subSubCategoryProducts = document.querySelectorAll('body #container #main > section.leftSection .categories .category .subCategory .subSubCategory');
btnsShowAll.forEach(function(value,index,arr){
    addEventBtnShow_All_Less(value,index);
});
function addEventBtnShow_All_Less(value,index){
    if(subSubCategoryProducts[index].childElementCount > 4){
        value.addEventListener('click',function(){
            if(value.textContent.toLowerCase() == 'Show All'.toLowerCase()){
                for(let i = 0;i<subSubCategoryProducts[index].childElementCount;i++){
                    subSubCategoryProducts[index].children[i].style.setProperty('display','block');
                }
                value.textContent = 'Show Less';
            }
            else if(value.textContent.toLowerCase() == 'Show Less'.toLowerCase()){
                for(let i = 4;i<subSubCategoryProducts[index].childElementCount;i++){
                    subSubCategoryProducts[index].children[i].style.setProperty('display','none');
                }
                value.textContent = 'Show All';
            }
        });
    }
    else if(subSubCategoryProducts[index].childElementCount <= 4){
        value.classList.add('hidden');
    }
}