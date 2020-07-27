import React from 'react';
import Uploader from './Uploader';
import Switcher from './Switcher';
import List from './List';
import Reconciliation from './Reconciliation';

export default class Matcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      savedRecon: null,
    };
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
  }

  handleViewSwitch(e, savedRecon) {
    if (savedRecon) {
      this.setState({
        view: 'reconciliation',
        savedRecon,
      });
    } else {
      const view = e.target.id.slice(0, -4);
      this.setState({
        view,
      });
    }
  }

  render() {
    const { view, savedRecon } = this.state;
    if (view === 'home') {
      return (
        <div>
          <p>Welcome to Matcher</p>
          <Switcher view="uploader" viewNum={1} handleViewSwitch={this.handleViewSwitch} />
          <Switcher view="list" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
        </div>
      );
    }
    if (view === 'uploader') {
      return <Uploader handleViewSwitch={this.handleViewSwitch} />;
    }
    if (view === 'list') {
      return (
        <List handleViewSwitch={this.handleViewSwitch} />
      );
    }
    if (view === 'reconciliation') {
      return (
        <Reconciliation handleViewSwitch={this.handleViewSwitch} targetRecon={savedRecon} />
      );
    }
  }
}
