import { axiosInstance } from "./resources/axiosInstance";

export async function createDatabase(){
    return axiosInstance.get('database/create');
}
export async function addFixtures(){
    return axiosInstance.get('database/addFixtures');
}

export async function deleteDatabase(){
    return axiosInstance.get('database/delete');
}
export async function showTables(){
    return axiosInstance.get('database/tables');
}
export async function tablesReset(){
    return axiosInstance.get('database/clear');
}
// AUTH
export async function signup(table,entity){
    return axiosInstance.post(`${table}/signup`,entity);
}
export async function login(table,entity){
    return axiosInstance.post(`${table}/login`,entity);
}

// GEN
export async function selectAll(table){
    return axiosInstance.get(`${table}/all`);

}

export async function addEntity(table,entity){
    return axiosInstance.post(`${table}/add`,entity);
}

export async function editEntity(table,entity){
    return axiosInstance.patch(`${table}/edit`,entity);
}

export async function selectEntity(table,id){
    return axiosInstance.post(`${table}/show`,id);
}

export async function deleteEntity(table,id){
    return axiosInstance.delete(`${table}/delete/${id}`);
}