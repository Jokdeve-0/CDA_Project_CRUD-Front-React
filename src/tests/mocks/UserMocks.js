const { BaseUser } = require("../../models/User");

class UserMocks {
    constructor(){
        this.username = 'James';
        this.mail = 'james@bond.fr';
        this.password = 'Aa@1Aa@1';
        this.wrongUsername = '>james<';
        this.wrongMail = 'james.bond';
        this.wrongPassword = '$$$$$$';
    }
    userWithAllOfValid(){
        return new BaseUser({
            username:this.username,
            mail:this.mail,
            password:this.password
        });
    }
    userWithInvalidUsername(){
        return new BaseUser({
            username:this.wrongUsername,
            mail:this.mail,
            password:this.password
        });
    }
    userWithInvalidMail(){
        return new BaseUser({
            username:this.username,
            mail:this.wrongMail,
            password:this.password
        });
    }
    userWithInvalidPassword(){
        return new BaseUser({
            username:this.username,
            mail:this.mail,
            password:this.wrongPassword
        });
    }
    userWithAllOfInvalid(){
        return new BaseUser({
            username:this.wrongUsername,
            mail:this.wrongMail,
            password:this.wrongPassword
        });
    }

}
const userMocks = new UserMocks();
module.exports = userMocks;