import { getToken } from "./resources/authentification";
import { axiosInstance } from "./resources/axiosInstance";
import { axiosInstanceStarting } from "./resources/axiosInstanceStarting";

export async function createDatabase(){
    return axiosInstanceStarting.get('create/database',{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
export async function createTables(){
    return axiosInstance.get('database/create/tables',{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
export async function showTables(){   
    return axiosInstance.patch('database/show/tables',{},{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
export async function addFixtures(){
    return axiosInstance.post('database/add/entities',{},{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
export async function tablesReset(){
    return axiosInstance.post('database/delete/entities',{},{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
export async function deleteTables(){
    return axiosInstance.delete('database/delete/tables',{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}
// AUTH
export async function signup(entity){
    return axiosInstance.post(`auth/signup`,entity);
}
export async function login(entity){
    return axiosInstance.post(`auth/login`,entity);
}
export async function logout(entity){
    return axiosInstance.get(`auth/logout`,entity);
}
export async function getCSRFToken() {
    await axiosInstance.get('/csrfToken');
 };

// GEN
export async function selectAll(table){
    return axiosInstance.get(`${table}/all`,{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}

export async function addEntity(table,entity){
    return axiosInstance.post(`${table}/add`,entity,{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}

export async function editEntity(table,entity){
    return axiosInstance.patch(`${table}/edit`,entity,
    {headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}

export async function selectEntity(table,id){
    return axiosInstance.post(`${table}/show`,id,{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}

export async function deleteEntity(table,id){
    return axiosInstance.delete(`${table}/delete/${id}`,{headers: {
        "Authorization": `Bearer ${getToken()}`
    }});
}