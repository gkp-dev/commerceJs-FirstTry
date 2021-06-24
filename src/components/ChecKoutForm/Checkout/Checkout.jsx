import React, { useState, useEffect } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core'
import { commerce } from '../../../lib/commerce'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setChekoutToken] = useState({})
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()

  useEffect(() => {
    async function generateToken() {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        })
        setChekoutToken(token)
      } catch (err) {
        console.log(err)
      }
    }
    generateToken()
  }, [cart])

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }

  const Confirmation = () => {
    return <div>Confirmation</div>
  }
  // const Form = () =>
  //   activeStep === 0 ? (
  //     <AddressForm checkoutToken={checkoutToken} />
  //   ) : (
  //     <PaymentForm />
  //   )

  const Form = () => {
    if (activeStep === 0) {
      if (checkoutToken.id) {
        return <AddressForm checkoutToken={checkoutToken} next={next} />
      }
      return null
    } else {
      if (checkoutToken.id) {
        return (
          <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
          />
        )
      }
      return null
    }
  }

  return (
    <div style={{ padding: '10px' }}>
      <div className={classes.toolbar}></div>
      <main className={classes.layout}>
        <Paper clasName={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  )
}

export default Checkout
