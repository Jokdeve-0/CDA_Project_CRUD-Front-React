import React, {useState,useContext} from 'react';
import {BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { BookAddPage } from './pages/books/BookAddPage';
import { BookDetailsPage } from './pages/books/BookDetailsPage';
import { EditorAddPage } from './pages/editors/EditorAddPage';
import { EditorDetailsPage } from './pages/editors/EditorDetailsPage';
import { HomePage } from './pages/home/HomePage';
import { MemberAddPage } from './pages/members/MemberAddPage';
import { MemberDetailsPage } from './pages/members/MemberDetailsPage';
import { RoleAddPage } from './pages/roles/RoleAddPage';
import { RoleDetailsPage } from './pages/roles/RoleDetailsPage';
import { UserAddPage } from './pages/users/UserAddPage';
import { UserDetailsPage } from './pages/users/UserDetailsPage';
import { datasStore } from './store/resources/DatasStore';

const DatasContext = React.createContext({});


export function Application() {
    const datas = useContext(DatasContext);
    const initial = useState(false);
    React.useEffect(()=>{
        const init = async () => {
            datasStore.getAllDatas();
        }
        if(!initial[0]){
            init();
            initial[1](true);
        }
    },[initial,datas]);
    const tables = useState(datasStore.initializeStoreByStorage('tables'));
    const users = useState(datasStore.initializeStoreByStorage('users'));
    const editors = useState(datasStore.initializeStoreByStorage('editors'));
    const books = useState(datasStore.initializeStoreByStorage('books'));
    const roles = useState(datasStore.initializeStoreByStorage('roles'));
    const editorMembers = useState(datasStore.initializeStoreByStorage('editorMembers'));


    return (
        <DatasContext.Provider
        value={{tables,users,editors,books,roles,editorMembers}}
        >
        <BrowserRouter>
      <Routes>
        <Route path="home" element={<HomePage />} />

        <Route path="auth/signup" element={<UserAddPage />} />
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
      </Routes>
      </BrowserRouter>
      </DatasContext.Provider>
    );
  }
  export {DatasContext}