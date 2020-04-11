'use strict'

import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
// import './lesssearch.less'
import logo from '../images/test-logo.png'

class Search extends React.Component {
  render () {
    return <div className="search-font">
      Search Text HotTest<img src={ logo }/>
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);

