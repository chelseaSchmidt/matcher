import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import Switcher from './Switcher';
import '../styles/List.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reconciliations: [],
    };
    this.handleViewSwitch = props.handleViewSwitch;
  }

  componentDidMount() {
    axios.get('/recons')
      .then(({ data }) => {
        this.setState({
          reconciliations: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { reconciliations } = this.state;
    return (
      <div>
        <Switcher view="uploader" viewNum={1} handleViewSwitch={this.handleViewSwitch} />
        <Switcher view="home" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        <div id="list-area">
          {reconciliations.map((recon) => (
            <button
              type="button"
              className="saved-recon-btn"
              key={recon.createdAt}
              onClick={(e) => { this.handleViewSwitch(e, recon); }}
            >
              {`${recon.name} | ${recon.createdAt}`}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  handleViewSwitch: func.isRequired,
};
