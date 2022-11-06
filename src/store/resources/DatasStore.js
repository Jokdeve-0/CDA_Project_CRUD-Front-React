const l = require('../../resources/Log')
const {
    showTables,
    selectAll
} = require("../requests");

class DatasStore {

    constructor() {
        this.tablesNames = ['users', 'editors',
         'editorMembers', 'roles', 'books','tables'];
         this.DbTables = undefined;
    }
    /**
     * manages the update of the store
     * @param {store(DatasContext)} datas 
     */
    // 
    initializeDatasStore = async (datas) => {
        const response = await this.getAllDatas();
        if(response){
          this.updateDatasStore(datas);
        }
    }
    /**
     * (get all database data)
     * 1. use retrieveTablesNames() to retrieve table names that exist in the database
     * 2. loop over the array of table names and use retrieveAll() to retrieve all database data
     * 3. reallocate new data in localstorage
     * return void 
     */
    getAllDatas = async () => {
        try {
          // if tables exists
          if(!this.DbTables){
            const tables = await this.retrieveTablesNames();
            this.DbTables = tables;
          }
            if (this.DbTables.length > 0) {
                for (let i = 0; i < this.DbTables.length; i++) {
                    let tableName = '';
                    // separates table names with underscore and hangs them up in camelCase
                    if (this.DbTables[i].Tables_in_moovleendb.indexOf('_') !== -1) {
                        const tableNames = this.DbTables[i].Tables_in_moovleendb.split('_');
                        tableName = `${tableNames[0]}${tableNames[1].charAt(0).toUpperCase()}${tableNames[1].slice(1)}`;
                    } else {
                        tableName = this.DbTables[i].Tables_in_moovleendb;
                    }
                    await this.retrieveAll(tableName);
                }
            }
          return true;

        } catch (error) {
            l.log('DatasStore', 57, error, "getAllDatas");
            return false;
        }
    }
    // get all tables name
    retrieveTablesNames = async () => {
        try {
            const response = await showTables();
            const tables = response.data.results;
            if (tables) {
                localStorage.setItem('tables', JSON.stringify(tables));
                return tables;
            }
            return [];
        } catch (error) {
            l.log('DatasStore', 20, error.response.error, "showTables");
        }
    }
    // all database data
    retrieveAll = async (table) => {
        const response = await selectAll(table);
        if (response.data.results) {
            localStorage.setItem(`${table}s`, JSON.stringify(response.data.results));
            return response.data.results;
        } else {
            localStorage.setItem(`${table}s`, JSON.stringify([]));
            return [];
        }
    }
    /**
     * manages the update of the store 
     * and the refreshing of the components
     * @param {store(DatasContext)} datas 
     */
    // set context datas (state variable)
    updateDatasStore = (datas) => {
        this.tablesNames.forEach((table) => {
            if(localStorage.getItem(table))
                datas[table][1](JSON.parse(localStorage.getItem(table)));
        })
        datas.tables[1](JSON.parse(localStorage.getItem('tables')));
    }

    // remove items context (localstorage)
    resetDatasStoreItems = () => {
        this.tablesNames.forEach((table) => {
            localStorage.setItem(table, JSON.stringify([]));
        })
    }

    getToken() {
        return localStorage.getItem('token') && localStorage.getItem('token').length > 0 ?
            JSON.parse(localStorage.getItem('token')) :
            undefined;
    }
    setStateToken(datas) {
        datas.token[1](JSON.parse(localStorage.getItem('token')));
    }


}
export const datasStore = new DatasStore();