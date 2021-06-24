import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

function Review({ checkoutToken }) {
  return (
    <>
      <Typography variant="h6" gutterButtom>
        {' '}
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Quantitity:${product.quantity}`}
            ></ListItemText>
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review
