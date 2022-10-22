const {
    showTables,
    selectAll
} = require("../requests");

class DatasStore {

    retrieveTablesNames = async () => {
        const response = await showTables();
        const tables = response.data.infos;
        if (tables) {
            localStorage.setItem('tables', JSON.stringify(tables));
            return tables;
        }
        return [];
    }

    retrieveAll = async (table) => {
        const response = await selectAll(table);
        if (response.data.infos) {
            localStorage.setItem(`${table}s`, JSON.stringify(response.data.infos));
            return response.data.infos;
        }else{
            localStorage.setItem(`${table}s`, JSON.stringify([]));
            return [];
        }
    }

    getAllDatas = async () => {
        const tables = await this.retrieveTablesNames();
        for(let i = 0; i<tables.length; i++){
            let tableName = '';
            // separates table names with underscore and hangs them up in camelCase
            if(tables[i].Tables_in_moovleendb.indexOf('_') !== -1){
                const tableNames = tables[i].Tables_in_moovleendb.split('_');
                tableName = `${tableNames[0]}${tableNames[1].charAt(0).toUpperCase()}${tableNames[1].slice(1)}`;
            }else{
                tableName = tables[i].Tables_in_moovleendb;
            }
            await this.retrieveAll(tableName);
        }
    }

    updateDatasStore = (datas) => {
        datas.users[1](JSON.parse(localStorage.getItem('users')));
        datas.editors[1](JSON.parse(localStorage.getItem('editors')));
        datas.editorMembers[1](JSON.parse(localStorage.getItem('editorMembers')));
        datas.roles[1](JSON.parse(localStorage.getItem('roles')));
        datas.books[1](JSON.parse(localStorage.getItem('books')));
    }

    initializeStoreByStorage(entity){
        return JSON.parse(localStorage.getItem(entity))
        ? JSON.parse(localStorage.getItem(entity))
        : [];
    }


}
export const datasStore = new DatasStore();