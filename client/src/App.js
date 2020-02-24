import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import logo from './logo.svg';
import './App.css';

const initialState = {
      route: 'signin',
      isSignedIn: false,
      email: 'test'
    };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'signin'
    }
  }

    // Handles views/routes depending on user clicks
  onRouteChange = (route) => {
    if (route === 'signout' || route ==='signin' || 
      route ==='register') {
      this.setState(initialState);
    } else if (route === 'portfolio') {
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
                  {/*<Footer/>*/}
                </div>

          ) : this.state.route ==='register' 
            ? ( <div>
                  <Register 
                    loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange} /> 
                  {/*<Footer/>*/}
                </div>
            )

           : this.state.route ==='portfolio' 
            ? ( 
                <div>
                  <div>
                  'Portfolio'
                  </div>
                 {/*<Footer/>*/}
                 </div>
            ) : this.state.route === 'transactions'

            ? ( 
              <div>
                <div>
                  'Transactions'
                </div>
                 {/*<Footer/>*/}
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
