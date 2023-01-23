import {Admin} from '../adminPage/classAdmin.js';
import {AdminActive} from '../adminPage/classAdminActive.js';

class adminNotifications{
    static countNotifications = function(){
        Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
        AdminActive.dataBaseAdminActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const id = AdminActive.dataBaseAdminActive[0].id;
        let admin = ''; 

        admin = {...Admin.dataBaseAdmin[0]};

        let count = 0;
        admin.notifications.forEach(function(notification,index){
            if(notification.read === false){
                count++;
            }
        });
        const countNotificationsElement = document.querySelector('body #container section#sideBar nav .list li:nth-of-type(6) > .countNotifications');
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
        Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
        AdminActive.dataBaseAdminActive = JSON.parse(localStorage.getItem('dataBaseActive'));
        const id = AdminActive.dataBaseAdminActive[0].id;
        let admin = ''; 

        admin = {...Admin.dataBaseAdmin[0]};

        const containerNotifications = document.querySelector('body #container #main > section.leftSection .notifications .containerNotifications');
        containerNotifications.innerHTML = '';
        admin.notifications.forEach(function(notification,inex){

            // set date
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

            const article = document.createElement('article');
            article.setAttribute('id',`${notification.id}`);
            article.setAttribute('class',`notification`);
            article.setAttribute('data-read',`${notification.read}`);
            article.classList.add(`${notification.type}`);
            // type of notification
            switch(notification.type){
                case 'greeting':
                    notification.FullName = `${admin.firstName} ${admin.LastName}`;
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
                      <span class="sender">${notification.FullName}</span>
                    </div>`;
                    break;
                case 'order':
                    article.innerHTML = `<div class="msg">     
                    <p class="msgNotification">${notification.msg}</p>
                    </div>
                    <div class="infoNotification">
                      <span class="date">${notification.day}/${notification.month}/${notification.year} - ${notification.hour}:${notification.minutes}</span>
                      <span class="sender">${notification.sender}</span>
                    </div>`;
                    notification.read = true;
                    break;
                case 'newUser':
                        article.innerHTML = `<div class="msg">     
                        <p class="msgNotification">${notification.msg}</p>
                        </div>
                        <div class="infoNotification">
                          <span class="date">${notification.day}/${notification.month}/${notification.year} - ${notification.hour}:${notification.minutes}</span>
                          <span class="sender">${notification.sender}</span>
                        </div>`;
                        notification.read = true;
                        break;
            }
            containerNotifications.insertBefore(article,containerNotifications.children[0]);
        });

        localStorage.removeItem('dataBaseActive');
        localStorage.setItem('dataBaseActive',JSON.stringify([admin]));
        localStorage.removeItem('dataBaseAdmin');
        localStorage.setItem('dataBaseAdmin',JSON.stringify([admin]));
        
        adminNotifications.countNotifications();
    }
}

export {adminNotifications};

window.addEventListener('DOMContentLoaded',function(){
    adminNotifications.countNotifications();
});