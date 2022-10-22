import React from 'react';

import { MemberAdd } from '../../components/app/members/MemberAdd';
import { LayoutPage } from '../../components/layouts/LayoutPage';

export function MemberAddPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <MemberAdd/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}