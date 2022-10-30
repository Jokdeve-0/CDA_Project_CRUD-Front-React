const validations = require("../resources/Validation");
const roleMocks = require("./mocks/RoleMocks");


describe('Test of Role model',()=>{
    
    test('adding a role with invalid name should return one error messages in the response',async ()=>{
        const role = roleMocks.roleWithInvalidName();
        const response = validations.checkers(role,['name']);
        expect(typeof(response.name)).toBe('string');
    })
    test('adding a role with valid name should return zero error message in the response',async ()=>{
        const role = roleMocks.roleWithValidName();
        const response = validations.checkers(role,['name']);
        expect(response.name).toBe(false);
        
    })
})