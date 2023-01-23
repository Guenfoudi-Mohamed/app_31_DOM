class AdminActive{

    static dataBaseAdminActive = [];
    static updateAdminInDataBaseActive = function(){
        AdminActive.dataBaseAdminActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        AdminActive.displayAdminInfo(AdminActive.dataBaseAdminActive[0]);
    }
    static displayAdminInfo = function(user){
        document.querySelector('body #container #main > section.rightSection .profileAdmin-mode-DL .profileAdmin .content span.greetingPerson > b').textContent = `${user.firstName}`;
        document.querySelector('body #container #main > section.rightSection .profileAdmin-mode-DL .profileAdmin > div > img').src = `${user.imgSrc}`;
    }
}

export {AdminActive};

window.addEventListener('DOMContentLoaded',function(){
    AdminActive.updateAdminInDataBaseActive();
})