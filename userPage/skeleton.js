// start 
function checkDOMContentLoaded(){
    
        const skeleton = document.querySelectorAll('body .skeleton');
        skeleton.forEach(function(elem){
            elem.classList.remove('skeleton');
        });
    
}

window.onload = function(){
    checkDOMContentLoaded();
};


export {checkDOMContentLoaded};