/* eslint-disable no-mixed-operators */
import { selectAll, showTables } from "../requests";
/**
 * returns the current state of the db
 * 4 states
 * 'not exist' : the database does not exist
 *     'empty' : the database does not contain any tables
 *     'ready' : the database is ready to receive data
 *      'full' : the database contains users
 * @param {store} datas 
 */
export async function handleStateDB(datas) {
    const tables = await showTables();
    // console.log(tables)
    if(tables.data.results && tables.data.results.length > 0){
      datas.stateDb[1]('ready');
      const users = await selectAll('user');
      // console.log(users)
      if(users.data.results && users.data.results.length > 0){
          datas.stateDb[1]('full');
      }
    }
    if(tables.data.results && tables.data.results.length === 0){
      datas.stateDb[1]('empty');
    }
    if(tables.data.message === 'The database not exist'){
        datas.stateDb[1]('not exist');
    }
}