import {userNotifications} from '../userPage/userNotifications.js';

//  class UserActive
class UserActive{
    static dataBaseUserActive = [];
    static updateUserInDataBaseActive = function(){
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        UserActive.displayUserInfo({...UserActive.dataBaseUserActive[0]});
        userNotifications.countNotifications();
    }
    static displayUserInfo = function(user){
        document.querySelector('body #container #main > .profileUser-mode-DL .profileUser .content span.greetingPerson > b').textContent = `${user.firstName}`;
        document.querySelector('body #container #main > .profileUser-mode-DL .profileUser > div > img').src = `${user.imgSrc != undefined ? user.imgSrc : ''}`;
    }
}

export {UserActive};

window.addEventListener('DOMContentLoaded',function(){
    UserActive.updateUserInDataBaseActive();
})