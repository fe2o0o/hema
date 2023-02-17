
var regName = document.getElementById("regName");
var regMail = document.getElementById("regMail");
var regPass = document.getElementById("regPass");
var signBut = document.querySelector(".signbut");
var logMail = document.getElementById("logMail");
var logPass = document.getElementById("logPass");
var logBut = document.getElementById("logbut");
var accountContainer = [];

if (localStorage.getItem("accounts") != null) {
    accountContainer = JSON.parse(localStorage.getItem("accounts"));
}



function addAccount() {
    account = {
        accName: regName.value,
        accMail: regMail.value,
        accPass: regPass.value
    };
    if (validateName(regName.value) == true&&validateMail(regMail.value)==true&&isFound(regMail.value)==true&&validatePassword(regPass.value)==true) {
        accountContainer.push(account);
        localStorage.setItem("accounts", JSON.stringify(accountContainer));
        document.getElementById("suc").classList.replace("d-none", "d-block");
        clearAccData();
    } else {
        if (validateName(regName.value) == false) {
            document.getElementById("nameErorr").classList.replace("d-none", "d-block");
            document.getElementById("nameErorr").innerHTML = "Name Field is Required";
            regName.addEventListener("input", function () {
                document.getElementById("nameErorr").classList.replace("d-block", "d-none");
            })
        }
        if (validateMail(regMail.value) == false) {
            if (regMail.value.length==0) {
                document.getElementById("mailErorr").classList.replace("d-none", "d-block");
                document.getElementById("mailErorr").innerHTML = "Email Filed is Required";
                regMail.addEventListener("input", function () {
                    document.getElementById("mailErorr").classList.replace("d-block","d-none");
                })
            } else {
                document.getElementById("mailErorr").innerHTML = "Email is Wrong";
                document.getElementById("mailErorr").classList.replace("d-none", "d-block");
                regMail.addEventListener("input", function () {
                    document.getElementById("mailErorr").classList.replace("d-block","d-none");
                })
            }
        }
        if (isFound(regMail.value) == false) {
            document.getElementById("mailErorr").innerHTML = "Email is already saved";
            document.getElementById("mailErorr").classList.replace("d-none", "d-block");
            regMail.addEventListener("input", function () {
                document.getElementById("mailErorr").classList.replace("d-block","d-none");
            })
        }
        if (validatePassword(regPass.value) == false) {
            if (regPass.value.length==0) {
                document.getElementById("passErorr").classList.replace("d-none", "d-block");
                document.getElementById("passErorr").innerHTML = "password Is Required";
                regPass.addEventListener("input", function () {
                    document.getElementById("passErorr").classList.replace("d-block","d-none");
                })
            }
            else {
                document.getElementById("passErorr").classList.replace("d-none", "d-block");
                document.getElementById("passErorr").innerHTML = "password Is invalid please insert one cappital char and one small char";
                regPass.addEventListener("input", function () {
                    document.getElementById("passErorr").classList.replace("d-block","d-none");
                })
            }
        }
    }
    
};




function loginAcc() {
    var mailLog = logMail.value;
    var passLog = logPass.value;
    if (mailLog.length == 0 || passLog.length == 0) {
        document.getElementById("logErorr").classList.replace("d-none", "d-block");
        document.getElementById("logbut").setAttribute("href", "#");
        logMail.addEventListener("input", function () {
            document.getElementById("logErorr").classList.replace("d-block", "d-none");
        })
        
        logPass.addEventListener("input", function () {
            document.getElementById("logErorr").classList.replace("d-block", "d-none");
        })
    } else {
        if (chekMailAndPass(mailLog, passLog) == true) {
            document.getElementById("logbut").setAttribute("href", "homePage.html");
            // alert(accN);
        } else {
            document.getElementById("logErorr").classList.replace("d-none", "d-block");
            document.getElementById("logErorr").innerHTML = "Yor Email or Password was wrong ";
            logMail.addEventListener("input", function () {
                document.getElementById("logErorr").classList.replace("d-block", "d-none");
            })
            
            logPass.addEventListener("input", function () {
                document.getElementById("logErorr").classList.replace("d-block", "d-none");
            })
        }
    }
    
};




function clearAccData() {
    regName.value = "";
    regMail.value = "";
    regPass.value = "";
};





function validateName(name) {
    regExp = /^\w{4,}$/;
    return regExp.test(name);
};

function validateMail(mail) {
    regExp = /^([a-z]|[A-Z])+(\w)*@[a-z]+\.[a-z]+$/;
    return regExp.test(mail);
};


function isFound(mail) {
    var test=0;
    for (var i = 0; i < accountContainer.length; i++){
        if (accountContainer[i].accMail == mail) {
            test++;
        }
    }
    if (test == 0) {
        return true;
    } else {
        return false;
    }
};

function validatePassword(pass) {
    regExp = /^\w{1,}[A-Z]{1,}[a-z]{1,}\w{0,}$/;
    return regExp.test(pass);
};



function chekMailAndPass(mail, pass) {
    var test = 0;
    for (var i = 0; i < accountContainer.length; i++){
        if (accountContainer[i].accMail == mail && accountContainer[i].accPass == pass) {
            test++;
            localStorage.setItem("name", JSON.stringify(accountContainer[i].accName));
        }
    }
    if (test != 0) {
        return true;
    } else {
        return false;
    }
};



if (logBut != null) {
    logBut.addEventListener("click", function () {
        loginAcc();
    });
}


if (signBut != null) {
    signBut.addEventListener("click", function () {
        addAccount();
        console.log(accountContainer);
    });
}

if (document.querySelector(".phome #userName") != null) {
    document.querySelector(".phome #userName").innerHTML = JSON.parse(localStorage.getItem("name"));
}
