const { BaseEditorMember } = require("../../models/EditorMember");

class EditorMemberMocks {
    constructor(){
        this.editor_id = 1;
        this.user_id = 1;
        this.wrongEditor_id ='x';
        this.wrongUser_id ='x';
    }
    editorMemberWithAllValid(){
        return new BaseEditorMember({
            editor_id:this.editor_id,
            user_id:this.user_id
        });
    }
    editorMemberWithAllInvalid(){
        return new BaseEditorMember({
            editor_id:this.wrongEditor_id,
            user_id:this.wrongUser_id
        });
    }
    editorMemberWithInvalidEditorId(){
        return new BaseEditorMember({
            editor_id:this.wrongEditor_id,
            user_id:this.user_id
        });
    }
    editorMemberWithInvalidUserId(){
        return new BaseEditorMember({
            editor_id:this.editor_id,
            user_id:this.wrongUser_id
        });
    }

}
const editorMemberMocks = new EditorMemberMocks();
module.exports = editorMemberMocks;