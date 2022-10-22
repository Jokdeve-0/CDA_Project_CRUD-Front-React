import React from 'react';
import { DropdownApp } from 'src/components/base/Dropdown/DropdownApp';
import { DropAddEntity } from '../../base/Dropdown/DropAddEntity';
import { DropDatabase } from '../../base/Dropdown/DropDatabase';
import { Nav } from '../../base/Nav/Nav';
import { LinkMenu } from './LinkMenu';

export function Header({children}) {
    return (
        <header>
            <Nav>
                <DropDatabase />
                <DropAddEntity />
                <DropdownApp />
            </Nav>
        </header>
    );
  }