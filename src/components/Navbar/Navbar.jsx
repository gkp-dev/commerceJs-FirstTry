import React,{Fragment} from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import useStyles from './styles'
import {Link,useLocation} from 'react-router-dom'

function Navbar({ totalItems }) {
    const location = useLocation()
    
    const classes = useStyles()
    return (
        <Fragment>
            <AppBar position='fixed' className="classes.appBar" color='inherit'>
                <Toolbar>
                    <Typography variant='h6' component={Link} to="/" className={classes.title} color="inherit">
                        <img src='/assets/images/commerce.png' alt="Commerce.js" height="25px" className={classes.image}/>
                        GKP-Commerce
                    </Typography>

                    <div className={classes.grow}></div>

                    {location.pathname === '/' && <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit'>
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                            </IconButton>
                    </div>}
                </Toolbar>
                
            </AppBar>
            
        </Fragment>
    )
}

export default Navbar
