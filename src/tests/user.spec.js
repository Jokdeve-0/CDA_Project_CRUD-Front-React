const validations = require("../resources/Validation");
const { validate } = require("./helpers/validateMocks");
const userMocks = require("./mocks/UserMocks");
const passwordConfirme = 'Aa@1Aa@1';


describe('Test of User model',()=>{
    
    test('adding a user with invalid username should return one error message in the response',async ()=>{
        const user = userMocks.userWithInvalidUsername();
        const response = validations.registrationCheck(user,passwordConfirme);
        validate(response,'username');
    })

    test('adding a user with invalid mail should return one error message in the response',async ()=>{
        const user = userMocks.userWithInvalidMail();
        const response = validations.registrationCheck(user,passwordConfirme);
        validate(response,'mail');
    })
    test('adding a user with invalid password should return one error message in the response',async ()=>{
        const user = userMocks.userWithInvalidPassword();
        const response = validations.registrationCheck(user,user.password);
        validate(response,'password');
    })
    test('adding a user with invalid passwordConfirme should return one error message in the response',async ()=>{
        const user = userMocks.userWithAllOfValid();
        const response = validations.registrationCheck(user,'$$$$$');
        validate(response,'passwordConfirme');
        
    })
    test('adding a user with invalid entries should return four error messages in the response',async ()=>{
        const user = userMocks.userWithAllOfInvalid();
        const response = validations.registrationCheck(user,passwordConfirme);
        expect(typeof(response.username)).toBe('string');
        expect(typeof(response.mail)).toBe('string');
        expect(typeof(response.password)).toBe('string');
        expect(typeof(response.passwordConfirme)).toBe('string');
    })
    test('adding a user with valid entries should return zero error message in the response',async ()=>{
        const user = userMocks.userWithAllOfValid();
        const response = validations.registrationCheck(user,passwordConfirme);
        validate(response,'');
        
    })
})