import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Dev from './classtest';
// import Comp from './classtest1';
// import Dev from './classtest2';
// import App from './classtest3-demo';
import registerServiceWorker from './registerServiceWorker';

// const robin = new dev('Robin', 'Wieruch');
// console.log(robin.getName());


ReactDOM.render(
    <App />,
    //<Comp/>,
    //<Dev/>,
    document.getElementById('root')
);
registerServiceWorker();
if (module.hot) {
    module.hot.accept();
}