import React from "react";
import { LinkMenu } from "../../layouts/Header/LinkMenu";
import {Dropdown} from 'flowbite-react'
import styles from './Dropdown.module.scss'
import { DatasContext } from "src/application";
export function DropAddEntity() {
    const datas = React.useContext(DatasContext);
    const {isTokenValid} = datas;

    return (<>
      <div className={styles.dropdownBox}>
        <Dropdown label="Ajouter des entités">
          
          {isTokenValid[0] && 
          (<>
              <Dropdown.Item>
                  <LinkMenu url={'/role/add'} title={'Rôle'}/>
              </Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item>
                  <LinkMenu url={'/user/add'} title={'Utilisateur'}/>
              </Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item>
                  <LinkMenu url={'/editor/add'} title={'Éditeur'}/>
              </Dropdown.Item>
              <Dropdown.Divider />
              
              <Dropdown.Item>
                  <LinkMenu url={'/member/add'} title={'Membre'}/>
              </Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item>
                  <LinkMenu url={'/book/add'} title={'Ouvrage'}/>
              </Dropdown.Item>
          </>)
          }
        </Dropdown>
        
      </div>
   </> );
}