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
    };
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
  }

  handleViewSwitch(e) {
    const view = e.target.id.slice(0, -4);
    this.setState({
      view,
    });
  }

  render() {
    const { view } = this.state;
    if (view === 'home') {
      return (
        <div>
          <p>Welcome to Matcher</p>
          <Switcher
            view="uploader"
            text="Start a New Reconciliation"
            handleViewSwitch={this.handleViewSwitch}
          />
          <Switcher
            view="list"
            text="See All Reconciliations"
            handleViewSwitch={this.handleViewSwitch}
          />
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
        <Reconciliation handleViewSwitch={this.handleViewSwitch} />
      );
    }
  }
}
