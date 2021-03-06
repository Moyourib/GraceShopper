import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSingleProductThunk, addProductToCart } from '../store'
import { EditProduct, MakeReview } from './index.js'

/**
*  COMPONENT: From All Products Page, the singleProduct's state is set when a single product is clicked on
*/

export class SingleProduct extends Component {
  constructor(){
    super();
    this.state = {
      value: 1,
      showEditForm: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateToggle = this.updateToggle.bind(this);
  }

  componentDidMount(){
    this.props.fetchSingleProduct();
  }

  handleChange(evt) {
    this.setState({value: evt.target.value});
  }

  handleSubmit(evt) {
    const { singleProduct } = this.props
    evt.preventDefault();
    const handleAdd = this.props.handleAdd;
    return handleAdd({
      productId: singleProduct.id,
      quantity: this.state.value,
      currentPrice: singleProduct.price
    })
  }

  updateToggle() {
    console.log(this.state.showEditForm)
    this.setState({ showEditForm: !this.state.showEditForm })
  }

  render() {
    const { singleProduct, isAdmin } = this.props
    var quantities = [];
    for (let i = 1; i <= singleProduct.stock; i++){
      quantities.push(<option key={i} value={i}>{i}</option>)
    }
    return (

      <div>
        { isAdmin &&
          <button type="submit" onClick={this.updateToggle}>{this.state.showEditForm ? 'Close Edit' : 'Edit Product Details'}</button>
        }
        {isAdmin && this.state.showEditForm && <EditProduct />
        }
        <div className="row single-product">
        <div className="col-md-6">
          <img src={singleProduct.image} />
        </div>



        <div className="col-md-6">
          <h1>{singleProduct.name}</h1>
          <h3>Price: <small>$</small>{singleProduct.price}</h3>
          {/* Tells customers if product is in stock */}
          {
            singleProduct.isAvailable ?
            (<form
              onSubmit={this.handleSubmit}>
              <label>
                In Stock
                <select
                  value={this.state.value}
                  onChange={this.handleChange}>
                  {quantities}
                </select>
                <input type="submit" value="Add" />
              </label>
            </form>) :
            <span>Currently Out of Stock</span>
          }
          <p>Categories: {singleProduct.categories && singleProduct.categories.map(category => category.name).join(', ')}</p>
          <p>Details: {singleProduct.description}</p>
        </div>
      </div>
        <h2> Reviews </h2>
        {singleProduct && singleProduct.reviews && singleProduct.reviews.map(review => {
          return (
            <p key={review.id}> {review.reviewText} </p>)
        })}
        <MakeReview history={this.props.history} />
      </div>
    )
  }
}

/**
* CONTAINER
*/
const mapState = (state) => {
  console.log('the state', state)
  return {
    singleProduct: state.singleProduct,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchSingleProduct () {
      dispatch(setSingleProductThunk(ownProps.match.params.productId))
    },
    handleAdd(productInfo) {
      dispatch(addProductToCart(productInfo));
    }
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
