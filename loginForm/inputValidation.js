import { validInpEamil, patterns} from '../registerForm/patterns&validInp.js';

// add event for inpEmail 
const inpEmail = document.querySelector('body #container #areaForm .Login .formLogin  div > input.inpEmail');
inpEmail.addEventListener('keyup',function(){validInpEamil(this);});
inpEmail.addEventListener('change',function(){validInpEamil(this);});
inpEmail.addEventListener('click',function(){validInpEamil(this);});

// add event for passWord 
const inpUserName = document.querySelector('body #container #areaForm .Login .formLogin  div > input.inpUserName');
inpUserName.addEventListener('keyup',function(){
    const regEx = patterns.UserName.test(this.value);
    if(regEx){
        inpUserName.classList.add('valid');
        inpUserName.classList.remove('invalid');
    }
    else{
        inpUserName.classList.remove('valid');
        inpUserName.classList.add('invalid');
    }
});

// add event for inpEmail 
const inpPassWord = document.querySelector('body #container #areaForm .Login .formLogin  div:nth-child(3) input.inpPassWord');
inpPassWord.addEventListener('keyup',function(){
    if(patterns.PassWord.test(inpPassWord.value) && inpPassWord.value.length >= 8){
        inpPassWord.classList.add('valid');
        inpPassWord.classList.remove('invalid');
    }
    else if(patterns.PassWord.test(inpPassWord.value) == false || inpPassWord.value.length < 8){
        inpPassWord.classList.remove('valid');
        inpPassWord.classList.add('invalid');
    }  
});

// EVENT iconShowHiddenPassword
const iconShowHiddenPassword = document.querySelector('body #container #areaForm .Login .formLogin  div:nth-child(3) > div > input.inpPassWord + a.iconShowPassWord');
iconShowHiddenPassword.addEventListener('mousedown',function(){
    iconShowHiddenPassword.querySelector('i').className = 'bx bx-show';
    inpPassWord.setAttribute('type','text');
});
iconShowHiddenPassword.addEventListener('mouseup',function(){
    iconShowHiddenPassword.querySelector('i').className = 'bx bx-low-vision';
    inpPassWord.setAttribute('type','password');
    inpPassWord.focus();
});

// 
const btnSignIn = document.querySelector('body #container #areaForm .Login .formLogin  div:nth-child(4) input.btn');
btnSignIn.onclick = function(e){
    e.preventDefault();
    if(inpEmail.classList.contains('valid') && inpUserName.classList.contains('valid') && inpPassWord.classList.contains('valid')){
        const dataBaseAdmin = JSON.parse(localStorage.getItem('dataBaseAdmin')); 
        console.log(dataBaseAdmin);
        let bool = false; 
        let resultAdmin;
        let resultUser;
        let resultUserTrash;
        const arrStock = [] ;
        if(dataBaseAdmin != null){
            // search if this account in dataBaseAdmin
            resultAdmin = dataBaseAdmin.find(function(admin){
                if(admin.UserName === inpUserName.value && admin.Email.toLowerCase() === inpEmail.value.toLowerCase() && admin.PassWord === inpPassWord.value){
                    return admin;
                };
            });
        }
        bool = resultAdmin != undefined ? true : false;
        console.log(resultAdmin);
        if(bool === false){
            // search if this account in dataBaseUser
            const dataBaseUser = JSON.parse(localStorage.getItem('dataBaseUser'));
            if(dataBaseUser != null){
                resultUser = dataBaseUser.find(function(user){
                    if(user.UserName === inpUserName.value && user.Email.toLowerCase() === inpEmail.value.toLowerCase() && user.PassWord === inpPassWord.value){
                        return user;
                    };
                });
            }
            bool = resultUser != undefined  ? true : false;
            if(bool){
                arrStock.push(resultUser);
                console.log(resultUser);
                dataBaseActiveToggle(arrStock);
                window.location.pathname = 'userPage/user.html'; 
            }
            else if(bool === false){
                // search if this account in dataBaseUserTrash
                const dataBaseUserTrash = JSON.parse(localStorage.getItem('dataBaseUserTrash'));
                if(dataBaseUserTrash != null){
                    resultUserTrash = dataBaseUserTrash.find(function(user){
                        if(user.UserName === inpUserName.value && user.Email.toLowerCase() === inpEmail.value.toLowerCase() && user.PassWord === inpPassWord.value){
                            return user;
                        };
                    });
                }
                bool = resultUserTrash != undefined ? true : false;
                if(bool){
                    console.log('Your account has been banned by the administrator !');
                }
                else if(bool === false){
                    console.log('UserName or Email OR PassWord are incorrect !');
                }
                [inpEmail,inpUserName,inpPassWord].forEach(function(inp){
                    inp.classList.add('invalid');
                    inp.classList.remove('valid');
                });
            }    
        }
        else if(bool === true){

            arrStock.push(resultAdmin);
            dataBaseActiveToggle(arrStock);
            window.location.pathname = 'adminPage/admin.html';
        }
    }
}

// function dataBaseActive if == null ? create & set data : delete & create [set data]
function dataBaseActiveToggle(arr){
    if(localStorage.getItem('dataBaseActive') == null){
        localStorage.setItem('dataBaseActive',JSON.stringify(arr));
    }
    else{
        localStorage.removeItem('dataBaseActive');
        localStorage.setItem('dataBaseActive',JSON.stringify(arr));
    }
}

// function clear Data form register Form  
function clearDataInpts(){
    const inputs =  document.querySelectorAll('body #container #areaForm .Login .formLogin  div:not(div:last-of-type) > input');
    inputs.forEach(function(inp){
        inp.value = '';
    });
}

window.addEventListener('DOMContentLoaded',function(){
    clearDataInpts();
});


