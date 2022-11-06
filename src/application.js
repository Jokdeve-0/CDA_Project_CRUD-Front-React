import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
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
import { getCSRFToken } from './store/requests';
import { authentification, getToken } from './store/resources/authentification';
import { handleStateDB } from './store/resources/handlerStateDB';

const DatasContext = React.createContext({}); 

export function Application() {
    //check token is valid (initApp)
    const isTokenValid = useState(authentification());
    // init datasStore (state variable)
    const tables = useState();
    const users = useState();
    const editors = useState();
    const books = useState();
    const roles = useState();
    const editorMembers = useState();

    const token = useState(getToken());
    const stateDb = useState();
    getCSRFToken();

    React.useEffect(()=>{
        const initApp = async (stateDb) => {
            await handleStateDB({stateDb});
        }
        if(!stateDb[0]){
            initApp(stateDb);
        }
    },[isTokenValid, stateDb]);

    const variablesContext = {
      tables,
      users,
      editors,
      books,
      roles,
      editorMembers,
      token,
      isTokenValid,
      stateDb,
    }

    return (
        <DatasContext.Provider value={variablesContext}>
            <BrowserRouter>
            <Routes>

            {!isTokenValid[0] && <>
                <Route path="signup" element={<UserAddPage />} />
                <Route path="login" element={<LoginPage />} />
               <Route path="*" element={<Navigate to="/login" replace />} />
              </>}

            {isTokenValid[0] && (<>
                <Route path="home" element={<HomePage />} />
                <Route path="signup" element={<UserAddPage />} />

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