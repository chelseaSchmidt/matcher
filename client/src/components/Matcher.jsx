import React from 'react';
import Uploader from './Uploader';
import Switcher from './Switcher';
import List from './List';
import Reconciliation from './Reconciliation';
import '../styles/Main.css';

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
        savedRecon: null,
      });
    }
  }

  render() {
    const { view, savedRecon } = this.state;
    if (view === 'home') {
      return (
        <div id="home-container">
          <div id="welcome">Welcome to Matcher</div>
          <Switcher view="uploader" page="home" viewNum={1} handleViewSwitch={this.handleViewSwitch} />
          <Switcher view="list" page="home" viewNum={3} handleViewSwitch={this.handleViewSwitch} />
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
    return (
      <Reconciliation
        handleViewSwitch={this.handleViewSwitch}
        targetRecon={savedRecon}
      />
    );
  }
}
