import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function PaymentForm({
  shippingData,
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
}) {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log(error)
    } else {
      const orderData = {
        list_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'International',
          street: shippingData.address1,
          town_city: shippingData.City,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      }
      await onCaptureCheckout(checkoutToken.id, orderData)

      console.log(orderData)
      await nextStep()
      console.log('Done')
    }
  }

  return (
    <div style={{ padding: '10px' }}>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm
