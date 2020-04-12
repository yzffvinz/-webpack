'use strict'

import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
// import './lesssearch.less'
import logo from '../images/test-logo.png'
import CommonIndex from '../common/util'
import { treeShakingA } from '../common/tree-shaking'

class Search extends React.Component {
  render () {
    return <div className="search-font">
      Search Text HotTest<img src={ logo }/>
      <br />
      { CommonIndex }
      <br />
      { treeShakingA() }
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);

