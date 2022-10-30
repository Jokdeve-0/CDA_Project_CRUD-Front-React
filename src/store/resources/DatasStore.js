const l = require('../../resources/Log')
const {
    showTables,
    selectAll
} = require("../requests");

class DatasStore {

    constructor() {
        this.tablesNames = ['users', 'editors', 'editorMembers', 'roles', 'books']
    }

    // init context
    initializeDatasStore = async (datas) => {
        await this.getAllDatas();
        this.updateDatasStore(datas);
    }
    // get all datas in DB
    getAllDatas = async () => {
        try {
            const tables = await this.retrieveTablesNames();

            if (tables.length > 0) {
                for (let i = 0; i < tables.length; i++) {
                    let tableName = '';
                    // separates table names with underscore and hangs them up in camelCase
                    if (tables[i].Tables_in_moovleendb.indexOf('_') !== -1) {
                        const tableNames = tables[i].Tables_in_moovleendb.split('_');
                        tableName = `${tableNames[0]}${tableNames[1].charAt(0).toUpperCase()}${tableNames[1].slice(1)}`;
                    } else {
                        tableName = tables[i].Tables_in_moovleendb;
                    }
                    await this.retrieveAll(tableName);
                }
            }

        } catch (error) {
            l.log('DatasStore', 57, error, "getAllDatas");
        }
    }
    // get all tables name
    retrieveTablesNames = async () => {
        try {
            const response = await showTables();
            const tables = response.data.infos;
            if (tables) {
                localStorage.setItem('tables', JSON.stringify(tables));
                return tables;
            }
            return [];
        } catch (error) {
            l.log('DatasStore', 20, error.response.error, "showTables");
        }
    }
    // get all datas in all tables
    retrieveAll = async (table) => {
        const response = await selectAll(table);
        if (response.data.infos) {
            localStorage.setItem(`${table}s`, JSON.stringify(response.data.infos));
            return response.data.infos;
        } else {
            localStorage.setItem(`${table}s`, JSON.stringify([]));
            return [];
        }
    }
    // set context datas 
    updateDatasStore = (datas) => {
        this.tablesNames.forEach((table) => {
            datas[table][1](JSON.parse(localStorage.getItem(table)));
        })
        datas.tables[1](JSON.parse(localStorage.getItem('tables')));
        datas.token[1](JSON.parse(localStorage.getItem('token')));
    }

    // remove items context 
    resetDatasStoreItems = () => {
        this.tablesNames.forEach((table) => {
            localStorage.setItem(table, []);
        })
    }
    // update context datas
    updateDatasStoreItems = () => {
        this.tablesNames.forEach((table) => {
            localStorage.setItem(table, JSON.parse(localStorage.getItem(table)));
        })
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token')) ?
            JSON.parse(localStorage.getItem('token')) :
            undefined;
    }


}
export const datasStore = new DatasStore();