import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { OurTeam } from './index.js'

/**
 * COMPONENT
 */
const Homepage = props => {
  const {handleClick, isLoggedIn, handleSubmit} = props
  // eventually find a few products from all products and display them on home?
  return (
    <div className="homepage">
      <div className="page-header header-filter">
        <div className="row">
            <div className="col-md-6">
              <h1 className="title">Buy Our Robot Pals</h1>
              <h4>
                 Humanely raised and created to be humanely loved and cherished.
                 Our borg companions are loving and come with their own personalities,
                 to contribute to a more organic bonding process as you learn how your
                 pet reacts to and interacts with its environment. Namely, you.
              </h4>
              <br />
              <Link to="/products">
                <div className="btn btn-primary btn-raised btn-lg">
                  See Our Robots
                </div>
              </Link>
            </div>
          </div>
      </div>
      <hr />
      <OurTeam />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id //coerces empty objects to boolean
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Homepage))

Homepage.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
