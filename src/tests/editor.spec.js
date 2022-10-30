const validations = require("../resources/Validation");
const { validate } = require("./helpers/validateMocks");
const editorMocks = require("./mocks/EditorMocks");
const fields = ['name','isbn_product','isbn_country','isbn_editor'];

describe('Test of Editor model',()=>{
    
    test('adding a editor with invalid name should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithInvalidName();
        const response = validations.checkers(editor, fields);
        validate(response,'name');
    })
    
    test('adding a editor with invalid ISBN Product should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithInvalidProduct();
        const response = validations.checkers(editor, fields);
        validate(response,'isbn_product');
    })
    
    test('adding a editor with invalid ISBN Country should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithInvalidCountry();
        const response = validations.checkers(editor, fields);
        validate(response,'isbn_country');
    })
    
    test('adding a editor with invalid ISBN Editor should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithInvalidEditor();
        const response = validations.checkers(editor, fields);
        validate(response,'isbn_editor');
    })
    
    test('adding a editor with invalid entries should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithAllInvalid();
        const response = validations.checkers(editor, fields);
        expect(typeof(response.name)).toBe('string');
        expect(typeof(response.isbn_product)).toBe('string');
        expect(typeof(response.isbn_country)).toBe('string');
        expect(typeof(response.isbn_editor)).toBe('string');
    })
    
    test('adding a editor with valid entries should return one error messages in the response',async ()=>{
        const editor = editorMocks.editorWithAllValid();
        const response = validations.checkers(editor, fields);
        validate(response,'');
    })

})