const { BaseEditor } = require("../../models/Editor");

class EditorMocks {
    constructor(){
        this.name = 'Publishers';
        this.isbn_product = 123;
        this.isbn_country = 12;
        this.isbn_editor = 12345; 
        this.wrongName = '>Publishers<';
        this.wrongIsbn_product = 1;
        this.wrongIsbn_country = 1;
        this.wrongIsbn_editor = 1; 
    }
    editorWithAllValid(){
        return new BaseEditor({
            name:this.name,
            isbn_product:this.isbn_product,
            isbn_country:this.isbn_country,
            isbn_editor:this.isbn_editor 
        });
    }
    editorWithAllInvalid(){
        return new BaseEditor({
            name:this.wrongName,
            isbn_product:this.wrongIsbn_product,
            isbn_country:this.wrongIsbn_country,
            isbn_editor:this.wrongIsbn_editor 
        });
    }
    editorWithInvalidName(){
        return new BaseEditor({
            name:this.wrongName,
            isbn_product:this.isbn_product,
            isbn_country:this.isbn_country,
            isbn_editor:this.isbn_editor 
        });
    }
    editorWithInvalidProduct(){
        return new BaseEditor({
            name:this.name,
            isbn_product:this.wrongIsbn_product,
            isbn_country:this.isbn_country,
            isbn_editor:this.isbn_editor 
        });
    }
    editorWithInvalidCountry(){
        return new BaseEditor({
            name:this.name,
            isbn_product:this.isbn_product,
            isbn_country:this.wrongIsbn_country,
            isbn_editor:this.isbn_editor 
        });
    }
    editorWithInvalidEditor(){
        return new BaseEditor({
            name:this.name,
            isbn_product:this.isbn_product,
            isbn_country:this.isbn_country,
            isbn_editor:this.wrongIsbn_editor 
        });
    }

}
const editorMocks = new EditorMocks();
module.exports = editorMocks;