import React from 'react';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { TablesTable } from 'src/components/app/tables/TablesTable';
import { RolesTable } from 'src/components/app/roles/RolesTables';
import { UsersTable } from 'src/components/app/users/UsersTable';
import { EditorsTable } from 'src/components/app/editors/EditorsTable';
import { MembersTable } from 'src/components/app/members/MembersTable';
import { BooksTable } from 'src/components/app/books/BooksTable';
export function HomePage() {
    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                   <TablesTable />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <RolesTable />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <UsersTable />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <EditorsTable />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <MembersTable />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <BooksTable />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}