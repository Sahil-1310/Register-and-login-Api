const joi =require('@hapi/joi');


//Register validation
const registerValidation = data=>{
const schema= {
name:joi.string().min(6).required(),
email:joi.string().min(6).required().email(),
password:joi.string().min(6).required().regex(/^[\w]{8,30}$@#/)
} ;
return joi.Validate(data,schema);
};

const loginValidation =data=>{
    const schema= {
    name:joi.string().min(6).required(),
    email:joi.string().min(6).required().email(),
    password:joi.string().min(6).required().regex(/^[\w]{8,30}$@#/)
    };
    return joi.Validate(data,schema);
    };
module.exports.registerValidation = registerValidation;
module.exports.loginValidation=loginValidation;

