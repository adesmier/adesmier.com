import React    from "react";
import ReactDOM from 'react-dom';

import Header   from './components/sections/Header';
import Blog     from './pages/Blog';


//expose react api globally in order to call react comps from legacy js
window.React    = React;
window.ReactDOM = ReactDOM;

//setup react comps globally in order to be called later from legacy js
window.searchComponent = require('./pages/Search').default;


//site header
const siteHeaderEl = document.getElementById('site-header__react-root');
if(siteHeaderEl) ReactDOM.render(<Header />, siteHeaderEl);

//load the blog post grid
const blogGridEl = document.getElementById('blog__react-root');
if(blogGridEl) ReactDOM.render(<Blog />, blogGridEl);
