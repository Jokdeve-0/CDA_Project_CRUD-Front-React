import React from 'react';
import { DatasContext } from 'src/application';
import { Login } from '../../components/app/Login/Login';

import { LayoutPage } from '../../components/layouts/LayoutPage';

export function LoginPage() {
const datas = React.useContext(DatasContext);
   console.log(datas.stateDb)
    return (
        <LayoutPage>
            <LayoutPage.Main>
            <LayoutPage.Section>
            {// eslint-disable-next-line no-mixed-operators
            (!datas.stateDb[0] || datas.stateDb[0] === 'empty')  && 
                <p>1ère étape : Dans le menu base de données > créer les tables</p>
            }
            {// eslint-disable-next-line no-mixed-operators
            (datas.stateDb[0] === 'ready')  && 
                <p>2ère étape : Dans le menu Ajouter des entités > Ajouter les fixtures</p>
            }
            {// eslint-disable-next-line no-mixed-operators
            (datas.stateDb[0] === 'full')  && 
                <p>Dernière étape : Il ne vous reste plus qu'a vous connecter</p>
            }
            </LayoutPage.Section>
                <LayoutPage.Section>
                    <Login/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}