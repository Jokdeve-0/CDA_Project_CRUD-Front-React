const { BaseRole } = require("../../models/Role");

class RoleMocks {
    constructor(){
        this.name = 'Boss';
        this.wrongName = '>Boss<';
    }
    roleWithValidName(){
        return new BaseRole({
            name:this.name,
        });
    }
    roleWithInvalidName(){
        return new BaseRole({
            name:this.wrongName,
        });
    }

}
const roleMocks = new RoleMocks();
module.exports = roleMocks;