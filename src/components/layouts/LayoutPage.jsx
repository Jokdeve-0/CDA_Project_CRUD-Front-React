import React from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Main } from './Main';
import { Section } from './Section';

export function LayoutPage({children}) {
    
    return (<>
    <div className='flex flex-col min-h-screen'>
        <Header />
        {children}
        <Footer />
    </div>
        
    </>);
  }
  LayoutPage.Main = Main;
  LayoutPage.Section = Section;
