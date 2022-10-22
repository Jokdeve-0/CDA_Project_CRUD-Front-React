import React from 'react';

import { EditorAdd } from '../../components/app/editors/EditorAdd';
import { LayoutPage } from '../../components/layouts/LayoutPage';

export function EditorAddPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <EditorAdd/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}