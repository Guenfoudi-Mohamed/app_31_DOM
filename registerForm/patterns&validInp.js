

// PATTERNS
const patterns = {
    FullName: /^[a-zA-Z]$/,
    Email: /^[a-zA-Z0-9]+([_\-\.]?[a-zA-Z0-9]{1,})*@(hotmail|gmail|yahoo)\.[a-z]{2,3}$/i,
    UserName: /^([a-zA-Z0-9]{2,})*[A-Z]+[a-z0-9]*$/, 
    PassWord : /^(([a-zA-Z0-9\*\-\_\?\!\=\+])*[A-Z]+([a-zA-Z0-9\*\-\_\?\!\=\+])*)$/,
    BirthDay: /^\d{4}\-\d{2}\-\d{2}$/,
    QuantityProduct: /^[0-9]+$/  
}


// function Valid inpts FullName [valid input firstName & lastName]
function inpValidFullName(inpName,inpFullName){
    if(inpName.value.length > 0){
        const testInp = patterns.FullName.test(inpName.value[inpName.value.length-1]);
        const FirstName = (inpName.value[0].toUpperCase()+inpName.value.slice(1,inpName.value.length).toLowerCase()).trim();

        inpName.value = FirstName;

        if(testInp === true && inpName.value.length >= 3){
            inpName.classList.add('valid');
            inpName.classList.remove('invalid');
        }
        else if(testInp === false){
            inpName.value = inpName.value.slice(0,inpName.value.length-1);
        }
        else if(inpName.value.length < 3){
            inpName.classList.remove('valid');
            inpName.classList.add('invalid');
        }
        if(inpFullName[0].value == inpFullName[1].value){
            inpName.classList.remove('valid');
            inpName.classList.add('invalid');
        }
    }
    else if(inpName.value.length == 0){inpName.classList.remove('valid');inpName.classList.add('invalid');}
}

//function valid input Email
function validInpEamil(inp){
    switch(patterns.Email.test(inp.value)){
        case true:
            inp.classList.add('valid');
            inp.classList.remove('invalid');    
            break;
        case false:
            inp.classList.remove('valid');
            inp.classList.add('invalid');
            break;
    }
}

// function valid inp userName
function validInpUserName(inpUserName,inpFullName){
    const regEx = patterns.UserName.test(inpUserName.value);
    if(regEx && inpUserName.value.toLowerCase() != inpFullName[0].value.toLowerCase() && inpUserName.value.toLowerCase() != inpFullName[1].value.toLowerCase()){
        inpUserName.classList.add('valid');
        inpUserName.classList.remove('invalid');
    }
    else{
        inpUserName.classList.remove('valid');
        inpUserName.classList.add('invalid');
    }
}

// function show PassWord value
function showPassWord(iconShowHiddenPassword,inputsPassword){
    iconShowHiddenPassword.querySelector('i').className = 'bx bx-show';
    inputsPassword.forEach(function(inp,index){
        inp.setAttribute('type','text');
    })
}
// function hidd Password value
function hiddPassWord(iconShowHiddenPassword,inputsPassword){
    iconShowHiddenPassword.querySelector('i').className = 'bx bx-low-vision';
    inputsPassword.forEach(function(inp,index){
        inp.setAttribute('type','password');
    })
    inputsPassword[0].focus();
}

// function valid Inp Password 
function validInpPassword(inpPassWord,inpConfirmPassWord){
    if(patterns.PassWord.test(inpPassWord.value) && inpPassWord.value.length >= 8){
        inpPassWord.classList.add('valid');
        inpPassWord.classList.remove('invalid');
        if(inpConfirmPassWord.value.length && (inpConfirmPassWord.value !== inpPassWord.value)){
            inpConfirmPassWord.classList.remove('valid');
            inpConfirmPassWord.classList.add('invalid');
        }
        else if(inpConfirmPassWord.value.length && (inpConfirmPassWord.value === inpPassWord.value)){
            inpConfirmPassWord.classList.add('valid');
            inpConfirmPassWord.classList.remove('invalid');
        }
    }
    else if(patterns.PassWord.test(inpPassWord.value) == false || inpPassWord.value.length < 8){
        inpPassWord.classList.remove('valid');
        inpPassWord.classList.add('invalid');
    }
    if((inpConfirmPassWord.value != inpPassWord.value) && (inpConfirmPassWord.value.length > 0)){
        inpConfirmPassWord.classList.remove('valid');
        inpConfirmPassWord.classList.add('invalid');
    }
};

// function valid Inp Password confirm
function validInpPasswordConfirm(inpPassWord,inpConfirmPassWord){
    if(inpPassWord.value === inpConfirmPassWord.value && inpConfirmPassWord.value.length >= 8 && (inpPassWord.classList.contains('invalid') == false)){
        inpConfirmPassWord.classList.add('valid');
        inpConfirmPassWord.classList.remove('invalid');
    }
    else{
        inpConfirmPassWord.classList.remove('valid');
        inpConfirmPassWord.classList.add('invalid');
    }
}

// function valid birthDay
function validInpBirthDay(inpBirthDay){
    const regEx = (patterns.BirthDay.test(inpBirthDay.value));
    if(regEx){
        inpBirthDay.classList.add('valid');
        inpBirthDay.classList.remove('invalid');
    }
    else if(regEx === false){
        inpBirthDay.classList.remove('valid');
        inpBirthDay.classList.add('invalid');
    }
} 

// function set Attr Max Min BirthDay
function setAttrMaxMinBirthDay(inp){
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    day = Number(day) > 9 ? Number(day+1) : `0${Number(day)}`; 
    month = Number(month) > 9 ? Number(month+1) : `0${Number(month+1)}`; 
    
    inp.setAttribute('max',`${year-18}-${month}-${day}`);
    inp.setAttribute('min',`${year-100}-${month}-${day}`);
}

// function clear data in form Edite Info User Admin
function clearDataFormEdite(inpFirstName,inpLastName,inpUserName,inpEmail,inpsRadioGender,inpBirthDay){
    [inpFirstName,inpLastName,inpUserName,inpEmail,inpsRadioGender,inpBirthDay].forEach(function(inp,index){
        if(inp == inpsRadioGender){
            inpsRadioGender[0].checked = false;inpsRadioGender[1].checked = false;
        }else{inp.value = '';inp.classList.remove('valid');inp.classList.remove('invalid');}
    });
}

// upload img [inp file]
function upLoadImgProfile(inpFile,img){
    const reader = new FileReader();
    reader.addEventListener('load',function(){
        // arrImgs.forEach(function(img){
            img[0].src = reader.result;
        // });
    });
    if(inpFile.files[0]){
        reader.readAsDataURL(inpFile.files[0]);
    }
}

// clear data from form
function clearDataInpts(inputs){
    inputs.forEach(function(inp){
        if(inp.getAttribute('type')  == 'checkbox' || inp.getAttribute('type')  == 'radio'){inp.checked = false;}
        else{
            inp.value = '';
            inp.classList.remove('invalid');
            inp.classList.remove('valid');
        }
    });
}

// function create object User
function UserTest(firstName,lastName,userName,email,PassWord,gender,birthDay){
    const user = {};
    user.id = idUser(firstName);
    user.firstName = firstName;
    user.LastName = lastName;
    user.UserName = userName;
    user.Email = email;
    user.PassWord = PassWord;
    user.Gender = gender;
    user.BirthDay = birthDay;
    const arrNotification = [];
    const orders = [];
    arrNotification.push({id:user.id,FullName: `${firstName} ${lastName}`,msg:`We wish you the beginning of an outstanding <b>${firstName} ${lastName}</b> experience,<br>Welcome to our store.`,read:false,type:'greeting',sender:'Admin'});
    user.notifications = arrNotification;
    user.orders = orders;
    return user;
}

//function set idUser > 'User'
function idUser(firstName){
    let idUser = `${firstName[0]}`;
    for(let i = 0;i<6;i++){
        idUser += Math.floor(Math.random() * 6);
        if(i == 5){
            const doubleId = [...localStorage.getItem('dataBaseIdUsers&Admin')].find(function(id){
                if(id === idUser){
                    return id;
                }
            });         
            if(doubleId != undefined){
                idUser = `${firstName[0]}`;
                i = -1;
            }
        }            
    }
    return idUser;
}

// export 
export {inpValidFullName, validInpUserName, showPassWord, hiddPassWord, validInpEamil, validInpPassword, validInpPasswordConfirm, validInpBirthDay,  setAttrMaxMinBirthDay , patterns, clearDataFormEdite, upLoadImgProfile,clearDataInpts, UserTest};
