import React from 'react'
import ReactDom from 'react-dom/client'
import Uploader from './uploader'
import Grid from './grid';

import './index.scss';

function App (){ 
    return (<div>
            <Uploader/>
            <Grid/>
        </div>);
}

const root = ReactDom.createRoot( document.getElementById('root') );
root.render( <App/> );