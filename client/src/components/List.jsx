import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import moment from 'moment';
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
      <div id="list-container">
        <div id="list-btn-area">
          <Switcher view="uploader" page="list" viewNum={1} handleViewSwitch={this.handleViewSwitch} />
          <Switcher view="home" page="list" viewNum={0} handleViewSwitch={this.handleViewSwitch} />
        </div>
        <div id="list-area">
          {reconciliations.map((recon) => (
            <button
              type="button"
              className="saved-recon-btn"
              key={recon.createdAt}
              onClick={(e) => { this.handleViewSwitch(e, recon); }}
            >
              {`${recon.name} | ${moment(recon.createdAt).format('MMM Do YY')}`}
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
