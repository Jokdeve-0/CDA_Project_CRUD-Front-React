import React from 'react';

import { RoleAdd } from '../../components/app/roles/RoleAdd';
import { LayoutPage } from '../../components/layouts/LayoutPage';

export function RoleAddPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <RoleAdd/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}