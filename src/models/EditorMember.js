export class BaseEditorMember{
    constructor(params){
        this.editor_id = params.editor_id;
        this.user_id = params.user_id;
    }
}


export class EditorMember extends BaseEditorMember{
    constructor(params){
        super(params);
        this.id = params.id;
        this.created_at = params.created_at;
        this.updated_at = params.updated_at;
    }
}
