/* eslint-disable no-mixed-operators */
import { selectAll, showTables } from "../requests";

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