/* eslint-disable no-underscore-dangle */
import React from 'react';
import { func } from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import Switcher from './Switcher';
import { deleteRecon } from '../utilities/httpRequests';
import '../styles/List.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reconciliations: [],
    };
    this.handleViewSwitch = props.handleViewSwitch;
    this.deleteTargetRecon = this.deleteTargetRecon.bind(this);
  }

  componentDidMount() {
    this.getListOfRecons();
  }

  getListOfRecons() {
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

  deleteTargetRecon(e) {
    deleteRecon(e.target.id, (err) => {
      if (err) { return console.error(err); }
      return this.getListOfRecons();
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
            <div className="list-row" key={recon.createdAt}>
              <button
                type="button"
                className="saved-recon-btn"
                onClick={(e) => { this.handleViewSwitch(e, recon); }}
              >
                {`${recon.name} | ${moment(recon.createdAt).format('MMM Do YY')}`}
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={this.deleteTargetRecon}
                id={recon._id}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  handleViewSwitch: func.isRequired,
};
