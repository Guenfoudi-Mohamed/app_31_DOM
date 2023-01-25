import {User} from '../userPage/classUser.js';
import {UserActive} from '../userPage/classUserActive.js';

class userNotifications{

    static countNotifications = function(){
        User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const id = UserActive.dataBaseUserActive[0].id;
        let user = ''; 
        for(let i = 0;i<User.dataBaseUser.length;i++){
            if(User.dataBaseUser[i].id === id){
                user = User.dataBaseUser[i];
                break;
            }
        }

        let count = 0;
        user.notifications.forEach(function(notification,index){
            if(notification.read === false){
                count++;
            }
        });

        const countNotificationsElement = document.querySelector('body #container section#sideBar nav .list > li:nth-of-type(4) > kbd');
        if(count > 0){
            countNotificationsElement.style.setProperty('display','block');
            countNotificationsElement.textContent = count;
        }
        else if(count === 0){
            countNotificationsElement.style.setProperty('display','none');
            countNotificationsElement.textContent = '';
        }
    }

    static displayNotification = function(){
        User.dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        UserActive.dataBaseUserActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const id = UserActive.dataBaseUserActive[0].id;
        let user = ''; 
        for(let i = 0;i<User.dataBaseUser.length;i++){
            if(User.dataBaseUser[i].id === id){
                user = User.dataBaseUser[i];
                break;
            }
        }


        const containerNotifications = document.querySelector('body #container #main .section .notifications .containerNotifications');
        containerNotifications.innerHTML = '';
        user.notifications.forEach(function(notification,inex){

            // set date
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

            const article = document.createElement('article');
            article.setAttribute('id',`${notification.id}`);
            article.setAttribute('class',`notification`);
            article.setAttribute('data-read',`${notification.read}`);
            article.classList.add(`${notification.type}`);
            // type of notification
            switch(notification.type){
                case 'greeting':
                    notification.FullName = `${user.firstName} ${user.LastName}`;
                    const msg = `We wish you the beginning of an outstanding <b>${notification.FullName}</b> experience,<br>Welcome to our store.`;
                    notification.msg = msg;
                    if(notification.read === false){
                        notification.day = day; 
                        notification.month = month; 
                        notification.year = year; 
                        notification.hour = hour; 
                        notification.minutes = minutes; 
                        notification.read = true;
                    }
                    article.innerHTML = `<div class="msg">     
                    <p class="msgNotification">${notification.msg}</p>
                    </div>
                    <div class="infoNotification">
                      <span class="date">${notification.day}/${notification.month}/${notification.year} - ${notification.hour}:${notification.minutes}</span>
                      <span class="sender">${notification.sender}</span>
                    </div>`;
                    break;
                case 'order':       // order
                case 'product':     // product
                case 'dataAccount':     // dataAccount
                    article.innerHTML = `
                    <div class="msg">     
                        <p class="msgNotification">${notification.msg}</p>
                    </div>
                    <div class="infoNotification">
                      <span class="date">${notification.day}/${notification.month}/${notification.year} - ${notification.hour}:${notification.minutes}</span>
                      <span class="sender">${notification.sender}</span>
                    </div>`;
                    article.querySelector('.msgNotification').innerHTML = `${notification.msg}`;
                    notification.read = true;
                    break;
                case 'dataLogin':   // data Login
                    article.innerHTML = `
                    <div class="msg">     
                        <p class="msgNotification">${notification.msg}</p>
                    </div>
                    <div class="infoNotification">
                      <span class="date">${notification.day}/${notification.month}/${notification.year} - ${notification.hour}:${notification.minutes}</span>
                      <span class="sender">${notification.sender}</span>
                    </div>`;
                    article.querySelector('.msgNotification').innerHTML = `${notification.msg}`;

                    notification.read = true;
                    if(user.upDateDataLogin === true){
                        user.upDateDataLogin = false;
                        const dataBaseUserEdite = JSON.parse(localStorage.getItem('dataBaseUserEdite'));
                        for(let i = 0;i<dataBaseUserEdite.length;i++){
                            if(dataBaseUserEdite[i].id === user.id){
                                const {Email ,UserName ,PassWord} = dataBaseUserEdite[i];
                                user.Email = Email;
                                user.UserName = UserName; 
                                user.PassWord = PassWord;
                                dataBaseUserEdite[i].upDateDataLogin = false;
                                break;
                            }
                        }
                        localStorage.removeItem('dataBaseUserEdite');
                        localStorage.setItem('dataBaseUserEdite',JSON.stringify(dataBaseUserEdite));
                    }
                    break;
            }
            containerNotifications.insertBefore(article,containerNotifications.children[0]);
        });

        // upDate database 
        localStorage.removeItem('dataBaseActive');
        localStorage.setItem('dataBaseActive',JSON.stringify([user]));

        for(let i = 0;i<User.dataBaseUser.length;i++){
            if(User.dataBaseUser[i].id === user.id){
                User.dataBaseUser.splice(i,1,user);
            }
        }
        localStorage.removeItem('dataBaseUser');
        localStorage.setItem('dataBaseUser',JSON.stringify(User.dataBaseUser));
        
        userNotifications.countNotifications();
    }
}

export {userNotifications};

window.addEventListener('DOMContentLoaded',function(){
    userNotifications.countNotifications();
});
