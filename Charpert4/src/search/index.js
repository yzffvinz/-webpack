
import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import './lesssearch.less'
import vincentTwoSum from 'vincent-two-sum';
import logo from '../images/test-logo.png';
import CommonIndex from '../common/util';
import { treeShakingA } from '../common/tree-shaking';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }


  loadComponent() {
    import('../common/dynamic-import').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const arr = vincentTwoSum([1, 2, 3, 4, 5], 9);
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div className="search-font">
        Search Text HotTest
        <br />
        {
          Text ? <Text /> : null
        }
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/alt-text,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */ }
       + <img src={logo} onClick={this.loadComponent.bind(this)} />
        <br />
        { CommonIndex }
        <br />
        { treeShakingA() }
        <br />
        This is vincent two sum answer
        { arr }
      </div>
    );
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root'),
);
