import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, 
  FormLabel, Grid, Button, Card } from '@material-ui/core';

const PurchaseStock = ({ handleUserStockLookUp, handleUserInputChange, 
  handleUserPurchase, stockFound, stockPrice, stockSymbol, 
  calculateStockPurchaseCost, userAccountBalance, userQuantity,
  handleUserQuantityChange, typeError }) => {
	
  return (

    <div>
      <Card className="Card">
        <Grid container spacing={4}>

          <Grid item xs={12}>
            <FormLabel>Purchase stock</FormLabel>
          </Grid>

            <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="symbol">Symbol</InputLabel>
              <Input 
                id="symbol" 
                type="text"
                name="symbol"
                aria-describedby="my-helper-text"
                onChange={ handleUserInputChange } 
               />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
               <Button 
                variant="outlined" 
                  onClick={ handleUserStockLookUp }
                  type="submit" 
                  value="search"
                  >Find Stock
                </Button>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
           <InputLabel htmlFor="quanity">Price Per Stock</InputLabel>
              <Input 
                id="quanity" 
                type="number"
                name="quanity"
                value={stockPrice ?
                  stockPrice : ''}
                readOnly
               />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <Input 
                id="quantity" 
                type="text"
                name="quantity"
                aria-describedby="my-helper-text"
                onChange={ handleUserQuantityChange } 
               />
            </FormControl>
          </Grid>

            <Grid 
              container
              direction="row"
              alignItems= "center"
              justify="center"
                >  { typeError
               
                ? ( <FormHelperText 
                      style={{'color': 'red',
                      'fontSize': '0.9rem'}}
                      id="helper-text">
                    {'Enter a whole number'}
                  </FormHelperText>

              ) : userQuantity
                ? ( null
                
              ) : null}

            </Grid>

           <Grid item xs={12}>
            <FormControl>
             <InputLabel htmlFor="total-cost">Total Cost</InputLabel>
                <Input 
                  id="total-cost" 
                  type="number"
                  name="total-cost"
                  value={ stockPrice && userQuantity ? 
                    Number(stockPrice) * Number(userQuantity) : ''}
                  readOnly
                 />
              </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
               <Button 
                variant="outlined" 
                  onClick={ handleUserPurchase }
                  type="submit" 
                  value="search"
                  disabled={typeError || !stockPrice 
                    || !userQuantity || (Number(stockPrice) * Number(userQuantity)) 
                    > Number(userAccountBalance)}
                  >Purchase
                </Button>
            </FormControl>
          </Grid>

      </Grid>
    </Card>
    </div>

	);
}

export default PurchaseStock;
