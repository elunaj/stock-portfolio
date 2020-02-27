import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import PortfolioView from './Components/PortfolioView/PortfolioView';
import PurchaseParent from './Components/PurchaseParent/PurchaseParent';
import Transactions from './Components/Transactions/Transactions';
import Footer from './Components/Footer/Footer';
import { Typography } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';

// Initial app state
const initialState = {
  userQuery: '',
  userQuantity: null,
  typeError: false,
  route: 'signin',
  isSignedIn: false,
  user: {
      id: "",
      accountBalance: null
  },
  userBalanceFound: false,
  stockSymbol: '',
  stockPrice: null,
  stockFound: false,
  totalCost: null,
  loading: false,
  transactionGetStatus: false,
  userTransCollection: [],
};

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
     userQuery: '',
    userQuantity: null,
    typeError: false,
    route: 'signin',
    isSignedIn: false,
    user: {
        id: "",
        accountBalance: null
    },
    stockSymbol: '',
    stockPrice: null,
    stockFound: false,
    totalCost: null,
    loading: false,
    transactionGetStatus: false,
    userTransCollection: [],
  };
}

// Loads user when signin or register is successful
loadUser = (data) => {
  console.log('user', data)
  this.setState({user: {
    id: data.id,
    accountBalance: Number(data.cash),
  }})
};

// Handle user quantity validation for stock purchase
handleUserQuantityChange = (event) => {
  let number = event.target.value;

  let convertedNum = Number(number);

  console.log(typeof number);
  if (Number.isInteger(convertedNum) && convertedNum >= 0) {
      this.setState({
        userQuantity: convertedNum,
        typeError: false
      })
  } else {
      this.setState({
        typeError: true
      })
  }
};

// Handle user input for stock search
handleUserInputChange = (event) => {
  this.setState({
    userQuery: event.target.value
  })
}

// Handle user stock purchase
handleUserStockLookUp = (event) => {
  event.preventDefault();
  this.findStock();
}


// Finds transaction info from user input
findStock() {
  fetch('http://localhost:5000/search/' + this.state.userQuery, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log('data' , data)
      return data;
    })
    .then(stockData => {
      this.setState({
        stockSymbol: stockData.symbol,
        stockPrice: Number(stockData.latestPrice),
        stockFound: true
      })
    })
    .catch(err => console.log(err));
}

  // Handles user purchase
handleUserPurchase = () => {
  fetch('http://localhost:5000/transactions', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: this.state.user.id,
      stockSymbol: this.state.stockSymbol,
      userQuantity: this.state.userQuantity,
      stockPrice: this.state.stockPrice,
      totalCost: this.state.stockPrice * this.state.userQuantity,
      userAccountBalance: this.state.user.accountBalance
    })
  })
  .then(response => response.json())
  .then(tr => {
    console.log('update user')
    this.setState({user: {
      id: this.state.user.id,
      accountBalance: Number(this.state.user.accountBalance) - (Number(this.state.stockPrice) * Number(this.state.userQuantity))
    }
    })
    

  })
  .catch(console.log)
};

//update user account balance after stock purchase
updateUserAccountInfo = () => {
  fetch('http://localhost:5000/profile/' + this.state.user.id, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log('user update', data)
    return data;
  })
  .then(user => {
    this.setState({user: {
      id: user.id[0],
      accountBalance: Number(user.cash[0])
    }})
  })
  .catch(err => console.log)
    
}

// Finds users transactions
findUserTransactions = () => {
  fetch('http://localhost:5000/transactions/' + this.state.user.id, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
  })
  .then(response => { 
    if (!response.ok) {
      throw response;
    }
    return response.json()
  })
  .then(transactions => {
    this.setState({
      userTransCollection: [...transactions],
      transactionGetStatus: true
    })
  })
  .catch(err => console.log)
}

// Handles views/routes depending on user clicks
onRouteChange = (route) => {
  if (route === 'signout' || route ==='signin' || 
    route ==='register') {
    this.setState(initialState);
  } else if (route === 'buy') {
    this.setState({
      isSignedIn: true,
      initialState: initialState
    })
  }  
  this.setState({
    route: route
  })
};

render() {
    return (
      <div className="App">
        <Navigation 
          isSignedIn={this.state.isSignedIn} 
          onRouteChange={this.onRouteChange}
          email={this.state.email} 
          />
        

      { this.state.route === 'signin' || this.state.route === 'signout'
         
          ? ( <div>
                <Signin 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange} /> 
                <Footer/>
              </div>

        ) : this.state.route ==='register' 
         
          ? ( <div>
                <Register 
                  loadUser={this.loadUser}
                  onRouteChange={this.onRouteChange} /> 
                <Footer/>
              </div>
          
        ) : this.state.route ==='buy' 
          
          ? ( 
              <div>
                <PurchaseParent
                  findUserTransactions={this.findUserTransactions}
                  userTransCollection={[...this.state.userTransCollection]} 
                  transactionGetStatus={this.state.transactionGetStatus}  
                  userId={this.state.user.id}
                  userAccountBalance={this.state.user.accountBalance}
                  handleUserInputChange={this.handleUserInputChange}
                  handleUserQuantityChange={this.handleUserQuantityChange}
                  handleUserStockLookUp={this.handleUserStockLookUp}
                  handleUserPurchase={this.handleUserPurchase}
                  stockFound={this.state.stockFound}
                  stockPrice={this.state.stockPrice}
                  stockSymbol={this.state.stockSymbol}
                  userQuantity={this.state.userQuantity}
                  typeError={this.state.typeError}
                  />
                <Footer/>
               </div>
          ) : this.state.route === 'portfolio'

          ? ( 
              <div>
                <Typography 
                  style={{
                    'marginTop': '2.5rem',
                    'display': 'block'
                  }}
                  variant="h3">Portfolio Holdings:
                  </Typography>
                <PortfolioView
                  findUserTransactions={this.findUserTransactions}
                  userTransCollection={[...this.state.userTransCollection]} 
                  transactionGetStatus={this.state.transactionGetStatus}  
                  />
                <Footer/>
               </div>
          ) : this.state.route === 'transactions'

            ? ( 
                <div>
                  <Typography 
                    style={{
                      'marginTop': '2.5rem',
                      'display': 'block'
                    }}
                    variant="h3">Transaction History:
                  </Typography>
                  <Transactions
                    findUserTransactions={this.findUserTransactions}
                    userTransCollection={[...this.state.userTransCollection]} 
                    transactionGetStatus={this.state.transactionGetStatus}
                    />
                  <Footer/>
                </div>

              : null
            )
            : null
        } 
        </div>
    );
}
}

export default App;
