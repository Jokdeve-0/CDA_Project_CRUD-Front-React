import React, {useState,useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes, redirect} from 'react-router-dom';
import { indigo } from 'tailwindcss/colors';
import { BookAddPage } from './pages/books/BookAddPage';
import { BookDetailsPage } from './pages/books/BookDetailsPage';
import { EditorAddPage } from './pages/editors/EditorAddPage';
import { EditorDetailsPage } from './pages/editors/EditorDetailsPage';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/login/LoginPage';
import { MemberAddPage } from './pages/members/MemberAddPage';
import { MemberDetailsPage } from './pages/members/MemberDetailsPage';
import { RoleAddPage } from './pages/roles/RoleAddPage';
import { RoleDetailsPage } from './pages/roles/RoleDetailsPage';
import { UserAddPage } from './pages/users/UserAddPage';
import { UserDetailsPage } from './pages/users/UserDetailsPage';

import { authentification } from './store/resources/authentification';
import { datasStore } from './store/resources/DatasStore';

const DatasContext = React.createContext({}); 

export function Application() {
    const datas = useContext(DatasContext);

    //check token is valid (initApp)
    const [isTokenValid,setIsTokenValid]= useState(authentification());
    // init datasStore
    const tables = useState();
    const users = useState();
    const editors = useState();
    const books = useState();
    const roles = useState();
    const editorMembers = useState();
    const token = useState();
    //init Tables
    const stateDb = React.useState();
    React.useEffect(()=>{
        if(isTokenValid === undefined){
            if(authentification()){
                setIsTokenValid(true);
                token[1](datasStore.getToken());
                datasStore.getAllDatas();
                document.location.href='/home';
            }else{
                setIsTokenValid(false);
                document.location.href='/login';
            }
        }

        if(!stateDb){
            if(localStorage.getItem('tables')
                && localStorage.getItem('tables').length > 0){
                    stateDb[1]("ready");
                    if(localStorage.getItem('users')
                        && localStorage.getItem('users').length > 0){
                            stateDb[1]("full")
                    }
            }else{stateDb[1]("empty")}
        }
    },[datas, token, isTokenValid, stateDb]);
 

   
    return (
        <DatasContext.Provider value={
            {tables,users,editors,books,roles,editorMembers,token,isTokenValid:[isTokenValid,setIsTokenValid],stateDb}
            }>
            <BrowserRouter>
            <Routes>
                <Route path="signup" element={<UserAddPage />} />
                <Route path="login" element={<LoginPage />} />
            {!isTokenValid && <Route path="*" element={<Navigate to="/login" replace />} />}

            {isTokenValid && (<>
                <Route path="logout" element={<LoginPage />} />
                <Route path="home" element={<HomePage />} />

                <Route path="user/add" element={<UserAddPage />} />
                <Route path="user/edit&id=:id" element={<UserAddPage />} />
                <Route path="user&id=:id" element={<UserDetailsPage />} />
                <Route path="editor/add" element={<EditorAddPage />} />
                <Route path="editor/edit&id=:id" element={<EditorAddPage />} />
                <Route path="editor&id=:id" element={<EditorDetailsPage />} />

                <Route path="role/add" element={<RoleAddPage />} />
                <Route path="role/edit&id=:id" element={<RoleAddPage />} />
                <Route path="role&id=:id" element={<RoleDetailsPage />} />

                <Route path="member/add" element={<MemberAddPage />} />
                <Route path="member/edit&id=:id" element={<MemberAddPage />} />
                <Route path="member&id=:id" element={<MemberDetailsPage />} />

                <Route path="book/add" element={<BookAddPage />} />
                <Route path="book/edit&id=:id" element={<BookAddPage />} />
                <Route path="book&id=:id" element={<BookDetailsPage />} />
        
                <Route path="*" element={<Navigate to="/home" replace />} />
            </>)}

            </Routes>
            </BrowserRouter>
        </DatasContext.Provider>
    );
  }
  export {DatasContext}