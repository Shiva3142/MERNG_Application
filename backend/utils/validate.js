function validateRegisterInput(name,email,password) {
    let errors={}
    if (name.trim()==="") {
        errors.name="name should not be empty"
    }
    if(password.trim().length<8){
        errors.password="password should be of length 8 or greater"
    }
    if (email.trim()==="") {
        errors.email="email should not be empty"
    }
    return {
        errors,
        valid:Object.keys(errors).length===0
    }
}


module.exports={validateRegisterInput}