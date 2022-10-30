class Log {

  log(file,line,message,variable){
    console.log(`File : ${file}, Line : ${line},${console.table(message)}\nDEF: ${variable}`)
  }

}
const l = new Log();
module.exports = l;