import React from 'react';

import { UserAdd } from '../../components/app/users/UserAdd';
import { LayoutPage } from '../../components/layouts/LayoutPage';

export function UserAddPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <UserAdd/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}