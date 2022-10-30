const validations = require("../resources/Validation");
const { validate } = require("./helpers/validateMocks");
const editorMemberMocks = require("./mocks/EditorMemberMocks");


describe('Test of EditorMember model',()=>{
    
    test('adding a editorMember with invalid editor id should return one error messages in the response',async ()=>{
        const editorMember = editorMemberMocks.editorMemberWithInvalidEditorId();
        const response = validations.checkers(editorMember, ['editor_id','user_id']);
        validate(response,'editor_id')
    })
    test('adding a editorMember with invalid user id should return one error message in the response',async ()=>{
        const editorMember = editorMemberMocks.editorMemberWithInvalidUserId();
        const response = validations.checkers(editorMember, ['editor_id','user_id']);
        validate(response,'user_id')
        
    })
    test('adding a editorMember with invalid entries should return one error message in the response',async ()=>{
        const editorMember = editorMemberMocks.editorMemberWithAllInvalid();
        const response = validations.checkers(editorMember, ['editor_id','user_id']);
        expect(typeof(response.editor_id)).toBe("string");
        expect(typeof(response.user_id)).toBe("string");
        
    })
    test('adding a editorMember with valid entries should return one error message in the response',async ()=>{
        const editorMember = editorMemberMocks.editorMemberWithAllValid();
        const response = validations.checkers(editorMember, ['editor_id','user_id']);
        validate(response,'')
        
    })
})