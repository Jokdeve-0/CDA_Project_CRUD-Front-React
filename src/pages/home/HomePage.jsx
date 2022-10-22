import React from 'react';
import { BooksTable } from '../../components/app/books/BooksTable';
import { MembersTable } from '../../components/app/members/MembersTable';
import { EditorsTable } from '../../components/app/editors/EditorsTable';
import { RolesTable } from '../../components/app/roles/RolesTables';
import { TablesTable } from '../../components/app/tables/TablesTable';
import { UsersTable } from '../../components/app/users/UsersTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
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