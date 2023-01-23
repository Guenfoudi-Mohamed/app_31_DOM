import {inpValidFullName, validInpUserName, showPassWord, hiddPassWord, validInpEamil, validInpPassword, validInpPasswordConfirm, validInpBirthDay,  setAttrMaxMinBirthDay, clearDataInpts, UserTest} from '../registerForm/patterns&validInp.js';
import {Admin} from '../adminPage/classAdmin.js';


// btn for display popUp add costumer
const popUpEditeUser = document.querySelector('body #popUpEditeUser');
const btnAddCustomer = document.querySelector('body #container #main > section.leftSection .customers .btns-add-filter-user button.addUser');
btnAddCustomer.onclick = function(){
    popUpAddUser.classList.remove('hidden');
    clearDataInpts(inputs);
    inpFullName[0].focus();
}

// btn for close PopUp Add User
const btnClosePopUpEditeUser = document.querySelector('body #popUpEditeUser .formEditeUser > .btnClosePopUpEditeUser');
btnClosePopUpEditeUser.onclick = function(){
    popUpEditeUser.classList.add('hidden');
}

// select elements fullName
const inpFullName = document.querySelectorAll('body #popUpEditeUser .formEditeUser  div > input.name');
// add event for valid inp [firstName,lastName]
inpFullName.forEach(function(inpName,index,arr){
    inpName.addEventListener('keyup',function(){inpValidFullName(inpName,arr);});    
    inpName.addEventListener('keydown',function(){inpValidFullName(inpName,arr);});    
});

// event for inpUserName
const inpUserName = document.querySelector('body #popUpEditeUser .formEditeUser > div:nth-of-type(3) > input.inpUserName');
inpUserName.addEventListener('keyup',function(){validInpUserName(this,inpFullName)});


// event for icon [show,hidden] password
const iconShowHiddenPassword = document.querySelector('body #popUpEditeUser .formEditeUser > div:nth-of-type(5) > div > input.inpPassWord + a.iconShowPassword');
const inputsPassword = document.querySelectorAll('body #popUpEditeUser .formEditeUser > :is(div:nth-of-type(5), div:nth-of-type(6)) input[type="password"]');
iconShowHiddenPassword.addEventListener('mousedown',function(){showPassWord(this,inputsPassword)});
iconShowHiddenPassword.addEventListener('mouseup',function(){hiddPassWord(this,inputsPassword)});

// add event for valid inp [email]
const inpEmail = document.querySelector('body #popUpEditeUser .formEditeUser > div:nth-of-type(4) > input.inpEmail');
inpEmail.addEventListener('keyup',function(){validInpEamil(this)});


// add event for valid inp [password]
const inpPassWord = document.querySelector('body #popUpEditeUser .formEditeUser > div:nth-of-type(5) > div > input.inpPassWord');
inpPassWord.addEventListener('keyup',function(){validInpPassword(this,inpConfirmPassWord)});


// add event for valid inp [Confirm password]
const inpConfirmPassWord = document.querySelector('body #popUpEditeUser .formEditeUser > div:nth-of-type(6) > input.inpConfirmPassWord');
inpConfirmPassWord.addEventListener('keyup',function(){validInpPasswordConfirm(inpPassWord,this)});


// add event for valid inp inpBirthDay
const inpBirthDay = document.querySelector('body #popUpEditeUser .formEditeUser div:nth-of-type(8) > input.inpBirthDay');
inpBirthDay.addEventListener('change',function(){validInpBirthDay(inpBirthDay)});

// function clear Data form register Form  
const inputs =  document.querySelectorAll('body #popUpEditeUser .formEditeUser > div input:not(input[type="submit"])');

// add function for create user 'admine'
const btnEditeUser = document.querySelector('body #popUpEditeUser .formEditeUser div input.btnEditeUser');
const inpsClassValidForm = document.querySelectorAll('body #popUpEditeUser .formEditeUser div input:not(input[type="radio"], input[type="submit"], input[type="checkbox"])');
const inpsRadio = document.querySelectorAll('body #popUpEditeUser .formEditeUser div:nth-of-type(7) > input[type="radio"]');
const inpCheck = document.querySelector('body #popUpEditeUser .formEditeUser div:nth-of-type(9) > input');
btnEditeUser.onclick = function(e){ 
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

    if(counter === 8){
        const obj = Admin.customer;
        const dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin')); 
        let bool = true; 
        let resultAdmin = undefined;
        let resultUser = undefined;
        if(dataBaseAdmin != null){
            resultAdmin = dataBaseAdmin.find(function(admin){
                if(admin.UserName.toLowerCase() == inpUserName.value.toLowerCase() || admin.Email.toLowerCase() == inpEmail.value.toLowerCase()){
                    return admin;
                };
            });
        }
        const dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
        if(dataBaseUser != null){
            resultUser = dataBaseUser.find(function(user){
                if(obj.id != user.id){
                    if((user.UserName.toLowerCase() === inpUserName.value.toLowerCase()) || (user.Email.toLowerCase() === inpEmail.value.toLowerCase())){
                        return user;
                    };
                }
            });
        }
        bool = (resultUser != undefined ) || (resultAdmin != undefined ) ? false : true;
        if(bool === false){
            console.log('Email or UserName are already taken');
            inpEmail.classList.add('invalid'); 
            inpUserName.classList.add('invalid'); 
            inpEmail.classList.remove('valid'); 
            inpUserName.classList.remove('valid'); 
        }
        else if(bool){
            
            // set date of last edite info account
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            let day = date.getDate();
            day = Number(day) > 9 ? day : `0${day}`;
            obj.lastEditeInfoAccount = `${year}-${Number(month)+1}-${day}/${date.getHours()}:${date.getMinutes()}`;

            obj.firstName = inpFullName[0].value;
            obj.LastName = inpFullName[1].value;
            obj.UserName = inpUserName.value;
            obj.Email = inpEmail.value;
            obj.PassWord = inpPassWord.value;
            obj.Gender = inpRadioCheck.value;
            obj.BirthDay = inpBirthDay.value;
            obj.status = true;
            dataBaseUser.find(function(user){   /// this step after user login and show his notification and database user change
                if(obj.id === user.id){
                    if((user.UserName.toLowerCase() !== obj.UserName.toLowerCase()) || (user.Email.toLowerCase() !== obj.Email.toLowerCase()) || (user.PassWord.toLowerCase() !== obj.PassWord.toLowerCase())){
                        obj.upDateDataLogin = true;
                    }
                    else{
                        obj.upDateDataLogin = false;
                    }
                }
            });
            Admin.updateInfoCustomer(obj);
            btnClosePopUpEditeUser.click();
        }
    }
}

window.addEventListener('DOMContentLoaded',function(){
    // function clear Data form register Form  
    clearDataInpts(inputs);
    // function set Attr Max Min BirthDay 
    setAttrMaxMinBirthDay(inpBirthDay);
});