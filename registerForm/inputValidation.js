import {inpValidFullName, validInpUserName, showPassWord, hiddPassWord, validInpEamil, validInpPassword, validInpPasswordConfirm, validInpBirthDay,  setAttrMaxMinBirthDay,clearDataInpts, UserTest} from '../registerForm/patterns&validInp.js';
import {Admin} from '../adminPage/classAdmin.js';

 

// select elements fullName
const inpFullName = document.querySelectorAll('body #container #areaForm .wrapperForm > .formRegister >  div > input.name');
// add event for valid inp [firstName,lastName]
inpFullName.forEach(function(inpName,index,arr){
    inpName.addEventListener('keyup',function(){inpValidFullName(inpName,arr);});    
    inpName.addEventListener('keydown',function(){inpValidFullName(inpName,arr);});    
});

// event for inpUserName
const inpUserName = document.querySelector('body #container #areaForm .Register .formRegister > div:nth-of-type(3) > input.inpUserName');
inpUserName.onkeyup = function(){
    validInpUserName(this,inpFullName)
};


// event for icon [show,hidden] password
const iconShowHiddenPassword = document.querySelector('body #container #areaForm .Register .formRegister > div:nth-child(5) > div > input.inpPassWord + a.iconShowPassword');
const inputsPassword = document.querySelectorAll('body #container #areaForm .Register .formRegister > :is(div:nth-child(5), div:nth-child(6)) input[type="password"]');
iconShowHiddenPassword.addEventListener('mousedown',function(){showPassWord(this,inputsPassword)});
iconShowHiddenPassword.addEventListener('mouseup',function(){hiddPassWord(this,inputsPassword)});

// add event for valid inp [email]
const inpEmail = document.querySelector('body #container #areaForm .Register .formRegister > div:nth-child(4) > input.inpEmail');
inpEmail.addEventListener('keyup',function(){validInpEamil(this)});


// add event for valid inp [password]
const inpPassWord = document.querySelector('body #container #areaForm .Register .formRegister  :is(div:nth-child(5) > div > input.inpPassWord');
inpPassWord.addEventListener('keyup',function(){validInpPassword(this,inpConfirmPassWord)});


// add event for valid inp [Confirm password]
const inpConfirmPassWord = document.querySelector('body #container #areaForm .Register .formRegister > div:nth-child(6) > input.inpConfirmPassWord');
inpConfirmPassWord.addEventListener('keyup',function(){validInpPasswordConfirm(inpPassWord,this)});


// add event for valid inp inpBirthDay
const inpBirthDay = document.querySelector('body #container #areaForm .Register .formRegister > div:nth-child(8) > input.inpBirthDay');
inpBirthDay.addEventListener('change',function(){validInpBirthDay(inpBirthDay)});


// event for button SignUp
const btnSignUp = document.querySelector('body #container #areaForm .Register .formRegister  div > input.btnSignUp');
const inpsClassValidForm = document.querySelectorAll('body #container #areaForm .Register .formRegister div input:not(input[type="radio"], input[type="submit"], input[type="checkbox"])');
const inpsRadio = document.querySelectorAll('body #container #areaForm .Register .formRegister div:nth-child(7) > input[type="radio"]');
const inpCheck = document.querySelector('body #container #areaForm .Register .formRegister div:nth-child(9) > input');
btnSignUp.onclick = function(e){ 
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
                if(admin.UserName == obj.UserName || admin.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return admin;
                };
            });
        }
        const dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        if(dataBaseUser != null){
            resultUser = dataBaseUser.find(function(user){
                if(user.UserName == obj.UserName || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        const dataBaseUserTrash = JSON.parse(localStorage.getItem('dataBaseUserTrash'));
        if(dataBaseUserTrash != null){
            resultUserTrash = dataBaseUserTrash.find(function(user){
                if(user.UserName == obj.UserName || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        const dataBaseUserEdite = JSON.parse(localStorage.getItem('dataBaseUserEdite'));
        if(dataBaseUserEdite != null){
            resultUserEdite = dataBaseUserEdite.find(function(user){
                if(user.UserName == obj.UserName || user.Email.toLowerCase() == obj.Email.toLowerCase()){
                    return user;
                };
            });
        }
        bool = (resultUser != undefined ) || (resultAdmin != undefined ) || (resultUserTrash != undefined) || (resultUserEdite != undefined) ? true : false;
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
            let month = Number(date.getMonth()+1);
            let day = date.getDate();
            month = Number(month) > 9 ? month : `0${month}`;
            day = Number(day) > 9 ? day : `0${day}`;
            const hour = Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`;
            const minutes = Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
            obj.accountCreation = `${year}-${Number(month)+1}-${day}/${hour}:${minutes}`;

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

            // notification if new user sign up
            Admin.dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin'));
            const admin = {...Admin.dataBaseAdmin[0]};                    
            admin.notifications.push({
                id:obj.id,
                sender: `${obj.firstName} ${obj.LastName}`,
                FullName: `${obj.firstName} ${obj.LastName}`,
                msg: `A new customer <b>${obj.id}</b> has registered`,
                read: false,
                type: 'newUser',
                year: year,
                month: month,
                day: day,
                hour: hour,
                minutes: minutes,
            });
            
            // upDate dataIn database admin
            localStorage.removeItem('dataBaseAdmin');
            localStorage.setItem('dataBaseAdmin',JSON.stringify([admin]));

            // run Login page
            window.location.pathname = 'loginForm/login.html';
        }
    }
}

window.addEventListener('DOMContentLoaded',function(){
    // function clear Data form register Form  
    const inputs =  document.querySelectorAll('body #container #areaForm .Register .formRegister  div > input:not(input[type="submit"])');
    clearDataInpts(inputs);
    setAttrMaxMinBirthDay(inpBirthDay);
});