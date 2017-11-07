import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { setAddressThunk } from '../store'
import { AddAddress } from './index'

/**
 * COMPONENT
 */
export class UserDetails extends Component {
  constructor(){
    super();
    this.state = {
      addAddress: false
    }
    this.hideAdd = this.hideAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchAddresses(this.props.id);
  }

  hideAdd() {
    this.setState({ addAddress: false })
  }

  render() {
    return (
      <div>
        {
          this.props.addresses.map(address => {
            return address && <p key={address.id}>{address.street1}
            {address.street2 && <span><br />{address.street2}</span>}
            <br />{address.city}, {address.state} {address.zipcode}
            <br />{address.country} </p>
          })
        }
        <button
          onClick={() => {
            this.setState({ addAddress: !this.state.addAddress })
          }}>
          Add Address
          </button>
        {this.state.addAddress && <AddAddress hide={this.hideAdd} />}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.user.id,
    addresses: state.addresses
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddresses (id) {
      dispatch(setAddressThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserDetails)
