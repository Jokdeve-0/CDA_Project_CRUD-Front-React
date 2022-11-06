import React from "react";
import {Alert} from 'flowbite-react';

export function AlertCmpt({type,icon,title,children}){
  // find all type https://flowbite-react.com/alerts
  return( 
  <Alert
    color={type}
    icon={icon}
  >
    <p className="text-base">
    {title} {children}
    </p>
      
     
  </Alert>);
}