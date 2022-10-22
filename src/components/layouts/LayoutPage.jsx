import React from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main';
import { Section } from './Section';
import { H1 } from '../base/Title/H1';

export function LayoutPage({children}) {
    
    return (<>
        <H1 title="PROJET BONUS CDA" />
        <Header />
        {children}
        <Footer />
    </>);
  }
  LayoutPage.Main = Main;
  LayoutPage.Section = Section;
