import { axiosInstance } from "./resources/axiosInstance";
import { datasStore } from "./resources/DatasStore";

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
export async function signup(entity){
    return axiosInstance.post(`auth/signup`,entity);
}
export async function login(entity){
    return axiosInstance.post(`auth/login`,entity);
}

// GEN
export async function selectAll(table){
    return axiosInstance.get(`${table}/all`);

}

export async function addEntity(table,entity){
    return axiosInstance.post(`${table}/add`,entity,{headers: {
        "Authorization": `Bearer ${datasStore.getToken()}`
    }});
}

export async function editEntity(table,entity){
    return axiosInstance.patch(`${table}/edit`,entity,
    {headers: {
        "Authorization": `Bearer ${datasStore.getToken()}`
    }});
}

export async function selectEntity(table,id){
    return axiosInstance.post(`${table}/show`,id,{headers: {
        "Authorization": `Bearer ${datasStore.getToken()}`
    }});
}

export async function deleteEntity(table,id){
    return axiosInstance.delete(`${table}/delete/${id}`,{headers: {
        "Authorization": `Bearer ${datasStore.getToken()}`
    }});
}