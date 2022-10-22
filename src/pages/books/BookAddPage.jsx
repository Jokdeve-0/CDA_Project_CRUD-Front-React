import React from 'react';

import { BookAdd } from '../../components/app/books/BookAdd';
import { LayoutPage } from '../../components/layouts/LayoutPage';

export function BookAddPage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                    <BookAdd/>
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}