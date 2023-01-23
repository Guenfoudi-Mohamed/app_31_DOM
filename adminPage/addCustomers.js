import {inpValidFullName, validInpUserName, showPassWord, hiddPassWord, validInpEamil, validInpPassword, validInpPasswordConfirm, validInpBirthDay,  setAttrMaxMinBirthDay, clearDataInpts, UserTest} from '../registerForm/patterns&validInp.js';
import {Admin} from '../adminPage/classAdmin.js';


// btn for display popUp add costumer
const popUpAddUser = document.querySelector('body #popUpAddUser');
const btnAddCustomer = document.querySelector('body #container #main > section.leftSection .customers .btns-add-filter-user button.addUser');
btnAddCustomer.onclick = function(){
    popUpAddUser.classList.remove('hidden');
    clearDataInpts(inputs);
    inpFullName[0].focus();
}

// btn for close PopUp Add User
const btnClosePopUpAddUser = document.querySelector('body #popUpAddUser .formAddUser > .btnClosePopUpAddUser');
btnClosePopUpAddUser.onclick = function(){
    popUpAddUser.classList.add('hidden');
}

// select elements fullName
const inpFullName = document.querySelectorAll('body #popUpAddUser .formAddUser  div > input.name');
// add event for valid inp [firstName,lastName]
inpFullName.forEach(function(inpName,index,arr){
    inpName.addEventListener('keyup',function(){inpValidFullName(inpName,arr);});    
    inpName.addEventListener('keydown',function(){inpValidFullName(inpName,arr);});    
});

// event for inpUserName
const inpUserName = document.querySelector('body #popUpAddUser .formAddUser > div:nth-of-type(3) > input.inpUserName');
inpUserName.addEventListener('keyup',function(){validInpUserName(this,inpFullName)});


// event for icon [show,hidden] password
const iconShowHiddenPassword = document.querySelector('body #popUpAddUser .formAddUser > div:nth-of-type(5) > div > input.inpPassWord + a.iconShowPassword');
const inputsPassword = document.querySelectorAll('body #popUpAddUser .formAddUser > :is(div:nth-of-type(5), div:nth-of-type(6)) input[type="password"]');
iconShowHiddenPassword.addEventListener('mousedown',function(){showPassWord(this,inputsPassword)});
iconShowHiddenPassword.addEventListener('mouseup',function(){hiddPassWord(this,inputsPassword)});

// add event for valid inp [email]
const inpEmail = document.querySelector('body #popUpAddUser .formAddUser > div:nth-of-type(4) > input.inpEmail');
inpEmail.addEventListener('keyup',function(){validInpEamil(this)});


// add event for valid inp [password]
const inpPassWord = document.querySelector('body #popUpAddUser .formAddUser > div:nth-of-type(5) > div > input.inpPassWord');
inpPassWord.addEventListener('keyup',function(){validInpPassword(this,inpConfirmPassWord)});


// add event for valid inp [Confirm password]
const inpConfirmPassWord = document.querySelector('body #popUpAddUser .formAddUser > div:nth-of-type(6) > input.inpConfirmPassWord');
inpConfirmPassWord.addEventListener('keyup',function(){validInpPasswordConfirm(inpPassWord,this)});


// add event for valid inp inpBirthDay
const inpBirthDay = document.querySelector('body #popUpAddUser .formAddUser div:nth-of-type(8) > input.inpBirthDay');
inpBirthDay.addEventListener('change',function(){validInpBirthDay(inpBirthDay)});

// function clear Data form register Form  
const inputs =  document.querySelectorAll('body #popUpAddUser .formAddUser > div input:not(input[type="submit"])');

// add function for create user 'admine'
const btnCreateUser = document.querySelector('body #popUpAddUser .formAddUser div input.btnAddUser');
const inpsClassValidForm = document.querySelectorAll('body #popUpAddUser .formAddUser div input:not(input[type="radio"], input[type="submit"], input[type="checkbox"])');
const inpsRadio = document.querySelectorAll('body #popUpAddUser .formAddUser div:nth-of-type(7) > input[type="radio"]');
const inpCheck = document.querySelector('body #popUpAddUser .formAddUser div:nth-of-type(9) > input');
btnCreateUser.onclick = function(e){ 
    e.preventDefault();
    let counter = 0;                                                      
    let inpRadioCheck;
    if(inpsRadio[0].checked == true || inpsRadio[1].checked == true){
        counter++;
        inpRadioCheck = inpsRadio[0].checked == true ? inpsRadio[0] : inpsRadio[1];
    }
    if(inpCheck.checked == true){counter++;}
    
    inpsClassValidForm.forEach(function(inp,index){
        if(inp.classList.contains('valid')){
            counter++;
        }
    });

    if(counter === 9){
        const obj = UserTest(inpFullName[0].value,inpFullName[1].value,inpUserName.value,inpEmail.value,inpPassWord.value,inpRadioCheck.value,inpBirthDay.value);
        const dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin')); 
        let bool = false; 
        let resultAdmin;
        let resultUser;
        let resultUserTrash;
        let resultUserEdite;
        if(dataBaseAdmin != null){
            resultAdmin = dataBaseAdmin.find(function(admin){
                if(admin.UserName.toLowerCase() == obj.UserName.toLowerCase() || admin.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return admin;
                };
            });
        }
        const dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        if(dataBaseUser != null){
            resultUser = dataBaseUser.find(function(user){
                if(user.UserName.toLowerCase() == obj.UserName.toLowerCase() || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        const dataBaseUserTrash = JSON.parse(localStorage.getItem('dataBaseUserTrash'));
        if(dataBaseUserTrash != null){
            resultUserTrash = dataBaseUserTrash.find(function(user){
                if(user.UserName.toLowerCase() == obj.UserName.toLowerCase() || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        const dataBaseUserEdite = JSON.parse(localStorage.getItem('dataBaseUserEdite'));
        if(dataBaseUserEdite != null){
            resultUserEdite = dataBaseUserEdite.find(function(user){
                if(user.UserName.toLowerCase() == obj.UserName.toLowerCase() || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        bool = (resultUser != undefined ) || (resultAdmin != undefined ) || (resultUserTrash != undefined ) || (resultUserEdite != undefined ) ? true : false;
        if(bool){
            console.log('Email or UserName are already taken');
            inpEmail.classList.add('invalid'); 
            inpUserName.classList.add('invalid'); 
            inpEmail.classList.remove('valid'); 
            inpUserName.classList.remove('valid'); 
        }
        else if(bool == false){
            
            // set date of creation account
            const date = new Date();
            const year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            month = Number(month) > 9 ? Number(month)+1 : `0${Number(month)+1}`;
            day = Number(day) > 9 ? day : `0${day}`;
            const hour = Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`;
            const Minutes = Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
            obj.accountCreation = `${year}-${month}-${day}/${hour}:${Minutes}`;

            // add id user to database
            let dataBaseIdUserAdmin = JSON.parse(localStorage.getItem('dataBaseIdUsers&Admin'));
            localStorage.removeItem('dataBaseIdUsers&Admin');
            dataBaseIdUserAdmin.push(obj.id);
            localStorage.setItem('dataBaseIdUsers&Admin',JSON.stringify(dataBaseIdUserAdmin));

            // add obj to database users
            let dataBaseUser = [];
            switch(localStorage.getItem('dataBaseUser')){
                case null: localStorage.setItem('dataBaseUser',JSON.stringify(dataBaseUser));
                break;
            }
            dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            localStorage.removeItem('dataBaseUser');
            dataBaseUser.push(obj);
            localStorage.setItem('dataBaseUser',JSON.stringify(dataBaseUser));
            btnClosePopUpAddUser.click();
            Admin.addCustomer();
        }
    }
}

// Filter customers
const selectFilter = document.querySelector('body #container #main > section.leftSection .customers .btns-add-filter-user select.filter');
selectFilter.onchange = function (){
    const dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
    const usersArr = [];
    // const obj = {};
    dataBaseUser.forEach(function(user){
        const obj = {
            id: user.id,
            fullName: `${user.firstName+user.LastName}`,
            BirthDay: user.BirthDay.slice(0,4)+user.BirthDay.slice(5,7)+user.BirthDay.slice(8,10),
            accountCreation: user.accountCreation.slice(0,4)+user.accountCreation.slice(5,7)+user.accountCreation.slice(8,10)+user.accountCreation.slice(11,13)+user.accountCreation.slice(14,16)
        }
        usersArr.push(obj);
    });
    switch(Number(this.selectedIndex)){
        case 1:  
        //sort by fullName
            usersArr.sort((a, b) => {
                const nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
                const nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                // names must be equal
                return 0;
            });
            sortElementCustomer(usersArr);
            break;
        case 2:
        //sort by birthDay
            usersArr.sort((a, b) =>  Number(b.BirthDay) - Number(a.BirthDay));
            sortElementCustomer(usersArr);
            break;
        case 3:
        //sort by accountCreation
            usersArr.sort((a, b) =>  Number(b.accountCreation) - Number(a.accountCreation));
            sortElementCustomer(usersArr);
            break;
    }
}

function sortElementCustomer(usersArr){
    const users = document.querySelector('body #container #main > section.leftSection .customers .users');
    usersArr.forEach(function(user,index){
        for(let i = 0;i<users.childElementCount;i++){
         if(user.id == users.children[i].id){
             users.children[i].style.setProperty('order',`${(index+1)}`);
         }
        } 
    });
}
export {selectFilter};

window.addEventListener('DOMContentLoaded',function(){
    // function clear Data form register Form  
    clearDataInpts(inputs);
    // function set Attr Max Min BirthDay 
    setAttrMaxMinBirthDay(inpBirthDay);
});