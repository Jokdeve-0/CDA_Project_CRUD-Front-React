/* eslint-disable no-mixed-operators */
import { selectAll, showTables } from "../requests";

export async function handleStateDB(datas) {
    const tables = await showTables();
    // console.log(tables)
    if(tables.data.infos && tables.data.infos.length > 0){
      datas.stateDb[1]('ready');
      const users = await selectAll('user');
      if(users.data.infos && users.data.infos.length > 0){
          datas.stateDb[1]('full');
      }
    }
    if(tables.data.infos && tables.data.infos.length === 0){
      datas.stateDb[1]('empty');
    }
    if(tables.data.message === 'The database not exist'){
        datas.stateDb[1]('not exist');
    }
}