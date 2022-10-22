import React from 'react';
import { Login } from '../../components/app/Login/Login';

import { LayoutPage } from '../../components/layouts/LayoutPage';

export function LoginPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <Login/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}