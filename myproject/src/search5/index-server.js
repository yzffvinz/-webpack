const React =  require('react');
require('./index.css');
const vincentTwoSum = require('vincent-two-sum');
const logo = require('../images/test-logo.png');
const CommonIndex = require('../common/util');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
  }


  loadComponent() {
    require('../common/dynamic-import').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const arr = vincentTwoSum([1, 2, 3, 4], 3);
    return (
      <div className="search-font">
        Search Text HotTest
        {
          Text ? <Text /> : null
        }
        <img src={ logo.default } onClick={ this.loadComponent.bind(this) } />
        { CommonIndex.default }
        This is vincent two sum answer
        { arr.toString() }
      </div>
      );
  }
}

module.exports = <Search />;
