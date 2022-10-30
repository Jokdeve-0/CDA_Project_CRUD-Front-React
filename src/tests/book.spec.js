const validations = require("../resources/Validation");
const { validate } = require("./helpers/validateMocks");
const bookMocks = require("./mocks/BooksMocks");


describe('Test of Book model',()=>{
    
    test('adding a book with invalid UUID should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidUuid();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'uuid')
        
    })

    test('adding a book with invalid ISBN Article should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidArticle();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'isbn_article')
        
    })

    test('adding a book with invalid title should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidTitle();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'title')
        
    })

    test('adding a book with invalid authors should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidAuthors();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'authors')
        
    })

    test('adding a book with invalid metadata should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidMetadata();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'metadata')
        
    })

    
    test('adding a book with valid nav should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidNav();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'nav')
        
    })

    
    test('adding a book with valid editor Id should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithInvalidEditor();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'editor_id')
        
    })

    test('adding a book with invalid entries should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithAllInvalid();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        expect(typeof(response.uuid)).toBe("string");
        expect(typeof(response.isbn_article)).toBe("string");
        expect(typeof(response.title)).toBe("string");
        expect(typeof(response.authors)).toBe("string");
        expect(typeof(response.metadata)).toBe("string");
        expect(typeof(response.nav)).toBe("string");
        
    })
    test('adding a book with valid entries should return one error message in the response',async ()=>{
        const book = bookMocks.bookWithAllValid();
        const response = validations.checkers(book,[
            'uuid',
            'isbn_article', 
            'title',
            'authors',
            'metadata',
            'nav',
            'editor_id']);
        validate(response,'')
        
    })
})