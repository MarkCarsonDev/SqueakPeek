import React from 'react';
import './Button.css';
import './contentsec.css';
import '../App.css';
import {Button} from './Button'

export default function Contentsec(){
return(
<div className='bodycontainer'>
    <div className='bodytext'>
    <h1>READY TO GET WORKING!</h1>
    <p>
        Lets get your start with an account
    </p>
    </div>
    <Button buttonStyle>Sign up!</Button>
</div>
);



}

