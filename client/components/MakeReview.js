import React, { Component } from "react";
import axios from 'axios'
import { connect } from 'react-redux'
import { getReviewsThunk, makeReviewsThunk} from '../store'


class MakeReview extends Component {
  constructor() {
    super()
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({reviewText: e.target.value})
  }

  handleSubmit(){
    this.props.writeReviews(this.state, this.props.singleProduct.id)
    console.log('props', this.props)
    this.props.history.push(`/products`)
    this.setState({reviewText: ''})
  }
  render() {

  return (
    <div className="col-md-12">
      <div className="table-responsive">
        <div className="tim-typo">
          <h3 className="tim-note"> Review Item
          </h3>
          <br />
           <div className="media-body">
            <div className="form-group">
              <textarea className="form-control" name="review" onChange={this.handleChange} placeholder="Leave a review" rows="6"></textarea>

            </div>
          </div>
          <div className="media-footer">
            <span onClick={this.handleSubmit} className="btn btn-primary btn-wd pull-right">Submit Review</span>
            </div>
          </div>
      </div>
    </div>
  )}
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    review: state.review,
    singleProduct: state.singleProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchReviews (id) {
      dispatch(getReviewsThunk(id))
    },
    writeReviews (review, id) {
      dispatch(makeReviewsThunk(review, id))
    }
  }
}

export default connect(mapState, mapDispatch)(MakeReview)
