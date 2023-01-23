
import {inpValidFullName , validInpUserName, showPassWord, hiddPassWord, validInpEamil, validInpPassword, validInpPasswordConfirm , validInpBirthDay, setAttrMaxMinBirthDay, clearDataFormEdite} from '../registerForm/patterns&validInp.js'
import {inpUploadPhotoProfileAccount, arrImgs} from '../userPage/upLoadPhoto.js';
import {User} from '../userPage/classUser.js';

// add event for valid [input firstName & lastname ]
const inpFirstName = document.querySelector('body #container #main .section .Account .infoUser > form > input.inpFirstName');
const inpLastName = document.querySelector('body #container #main .section .Account .infoUser > form > input.inpLastName');
[inpFirstName,inpLastName].forEach(function(inpName,index,arr){
    inpName.addEventListener('keyup',function(){inpValidFullName(inpName,arr);});    
    inpName.addEventListener('keydown',function(){inpValidFullName(inpName,arr);})
});

// add event for valid [input UserName]
const inpUserName = document.querySelector('body #container #main .section .Account .infoUser > form > input.inpUserName');
inpUserName.addEventListener('keyup',function(){validInpUserName(this,[inpFirstName,inpLastName])});


// add event for valid [input email ]
const inpEmail = document.querySelector('body #container #main .section .Account .infoUser > form > input.inpEmail');
inpEmail.addEventListener('keyup',function(){validInpEamil(this)});


// add event for show and hidd << value >>  [input password ]
const iconShowHiddPassWord = document.querySelector('body #container #main .section .Account .infoUser > form > div > input.inpPassWord + a.iconShowHiddPassWord');
const inputsPassword = document.querySelectorAll('body #container #main .section .Account .infoUser > form :is(div > .inpPassWord, input.inpPasswordConfirm)');
iconShowHiddPassWord.addEventListener('mousedown',function(){showPassWord(this,inputsPassword);});
iconShowHiddPassWord.addEventListener('mouseup',function(){hiddPassWord(this,inputsPassword);});


// add event for valid  [input password ]
const inpPassWord = document.querySelector('body #container #main .section .Account .infoUser > form > div > input.inpPassWord');
inpPassWord.addEventListener('keyup',function(){validInpPassword(this,inpConfirmPassWord)});

// add event for valid  [input confirm password ]
const inpConfirmPassWord = document.querySelector('body #container #main .section .Account .infoUser > form > input.inpPasswordConfirm');
inpConfirmPassWord.addEventListener('keyup',function(){validInpPasswordConfirm(inpPassWord,this)});

const inpsRadioGender = document.querySelectorAll('body #container #main .section .Account .infoUser > form  input[name="gender"]');  

// add event for valid  [input birthDay ]
const inpBirthDay = document.querySelector('body #container #main .section .Account .infoUser > form div input.inpBirthDay');
setAttrMaxMinBirthDay(inpBirthDay);      // setAttrMaxMinBirthDay
inpBirthDay.addEventListener('change',function(){validInpBirthDay(this)});


// add event for btn Save Info User
const btnSaveInfoUser = document.querySelector('body #container #main .section .Account .infoUser > form > input.btnSaveInfoUser');
btnSaveInfoUser.onclick = function(){
    let inpGender = '';
    const obj = {};
    if(arrImgs[0].getAttribute('src') != ''){obj.imgSrc = arrImgs[0].getAttribute('src');}
    [inpFirstName,inpLastName,inpUserName,inpEmail,inpPassWord,inpConfirmPassWord,inpBirthDay].forEach(function(inp,index){
        if(inp.classList.contains('valid')){
            // const attName = inp.getAttribute('data-text');
            switch(index){
                case 0:
                    obj.firstName = inp.value;
                    break;
                case 1:
                    obj.LastName = inp.value;
                    break;
                case 2:
                    obj.UserName = inp.value;
                    break;
                case 3:
                    obj.Email = inp.value;
                    break;
                case 4:
                    if(inputsPassword[0].value===inputsPassword[1].value){
                        obj.PassWord = inp.value;
                        inputsPassword[0].classList.remove('invalid');
                        inputsPassword[0].classList.add('valid');
                        inputsPassword[1].classList.remove('invalid');
                        inputsPassword[1].classList.add('valid');
                    }
                    else{
                        inputsPassword[0].classList.add('invalid');
                        inputsPassword[0].classList.remove('valid');
                        inputsPassword[1].classList.add('invalid');
                        inputsPassword[1].classList.remove('valid');
                    }
                    break;
                case 6:
                    obj.BirthDay = inp.value;
                    break;
            }
        }
    });
    if(inpsRadioGender[0].checked == true && inpsRadioGender[1].checked == false){
        inpGender = inpsRadioGender[0];
        obj.Gender = inpGender.value;
    }
    else if(inpsRadioGender[0].checked == false && inpsRadioGender[1].checked == true){
        inpGender = inpsRadioGender[1];
        obj.Gender = inpGender.value;
    }
    if(Object.keys(obj).length){
        User.editeInfoUser(obj,inpUserName,inpEmail);
    }
    clearDataFormEdite(inpFirstName,inpLastName,inpUserName,inpEmail,inpsRadioGender,inpBirthDay);
}


window.addEventListener('DOMContentLoaded',function(){
    clearDataFormEdite(inpFirstName,inpLastName,inpUserName,inpEmail,inpsRadioGender,inpBirthDay);
});