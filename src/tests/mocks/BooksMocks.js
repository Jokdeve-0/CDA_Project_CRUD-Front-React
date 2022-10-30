const { BaseBook } = require("../../models/Book");

class BookMocks {
    constructor(){
        this.uuid = 1234567;       
        this.isbn_article = 1234567;
        this.title = 'SuperTilte';  
        this.authors =  'authorOne, authorTwo';
        this.metadata = JSON.stringify({pages:250});
        this.nav = JSON.stringify({chapitres:23});
        this.editor_id = 1;
        this.wrongUuid = 'x';       
        this.wrongIsbn_article = 'x';
        this.wrongTitle = '>SuperTilte<';  
        this.wrongAuthors =  '>authorOne, authorTwo<';
        this.wrongMetadata = 'x';
        this.wrongNav = 'x';
        this.wrongEditor_id = 'x';
    }
    bookWithAllValid(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithAllInvalid(){
        return new BaseBook({
            uuid: this.wrongUuid,
            isbn_article: this.wrongIsbn_article ,
            title: this.wrongTitle,
            authors: this.wrongAuthors,
            metadata: this.wrongMetadata,
            nav: this.wrongNav,
            editor_id: this.wrongEditor_id
        });
    }
    bookWithInvalidUuid(){
        return new BaseBook({
            uuid: this.wrongUuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidArticle(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.wrongIsbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidTitle(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.wrongTitle,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidAuthors(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.wrongAuthors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidMetadata(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.wrongMetadata,
            nav: this.nav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidNav(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.wrongNav,
            editor_id: this.editor_id
        });
    }
    bookWithInvalidEditor(){
        return new BaseBook({
            uuid: this.uuid,
            isbn_article: this.isbn_article ,
            title: this.title,
            authors: this.authors,
            metadata: this.metadata,
            nav: this.nav,
            editor_id: this.wrongEditor_id
        });
    }

}
const bookMocks = new BookMocks();
module.exports = bookMocks;