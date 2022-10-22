export class BaseUser{
    constructor(params){
        this.username = params.username;
        this.mail = params.mail;
        this.password = params.password; 
    }
}


export class User extends BaseUser{
    constructor(params){
        super(params);
        this.id = params.id;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
    }
}
