import React, {Component} from 'react'
import logo from '../assets/smeatech.png'

class Login extends Component {
  render(){
    return(
      <>
        <div className="login">
          <div className="jumbotron">
            <div className="canvas">
              <div className="title">
                <h2>Book is a Window <br />to the world</h2>
              </div>
              <div className="credit">
                <h6>Photo by Mark Pan4ratte on Unsplash</h6>
              </div>
            </div>
          </div>
          <div className="form">
            <div className="form-icon">
              <img src={logo} alt="icon" />
            </div>
            <div className="form-text">
              <div className="title">
                <h2>Login</h2>
              </div>
              <div className="desc">
                Welcome back, please login
                <br />to your account.
              </div>
            </div>
            <form action="submit">
              <div className="form-input">
                <div className="email">
                  <input type="email" placeholder="Email Address" />
                </div>
                <div className="password">
                  <input type="password" placeholder="Password" />
                </div>
              </div>
              <div className="form-option">
                <div className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </div>
                <div className="forgot-password">Forgot Password</div>
              </div>
              <div className="form-button">
                <div className="login">
                  <button>Login</button>
                </div>
                <div className="signup">
                  <button>Signup</button>
                </div>
              </div>
            </form>
            <div className="form-footer">
              By signing up, you agree to Book’s<br />
              <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login