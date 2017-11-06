const router = require('express').Router()
const stripeKey = require('../../secrets')
var stripe = require('stripe')(stripeKey)
const { Order } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log('req.session.cartId: ', req.session.cartId)
  console.log('req.cart: ', req.cart);
  delete req.session.cartId;
  req.session.save();
  delete req.cart;
  return stripe.tokens.create({
    card: {
      'number': req.body.cardDetails.cardNumber,
      'exp_month': req.body.cardDetails.expMonth,
      'exp_year': req.body.cardDetails.expYear,
      'cvc': req.body.cardDetails.cvc
    }
  })
    .then(token => {
      console.log(token)
      console.log('req.session.cartId: ', req.session.cartId)
      console.log('req.cart: ', req.cart);
      return stripe.charges.create({
        amount: Math.round(req.body.amount * 100),
        currency: 'usd',
        source: token.id,
        description: 'new order for borgPets'
      })
        .then(charge => {
          if (!charge.failure_code){
            return Order.findById(req.body.orderId)
              .then(order => {
                order.update({status: 'confirmed'})
              })
              .catch(next);
          }
          res.status(200).redirect('/')
        })
        .catch(next)
    })
    .catch(next);
})
