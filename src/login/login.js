import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClippedDrawer from '../appdrawer/clippeddrawer';
import classNames from 'classnames';
import './login.css';

const styles = theme => ({
    login: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      display: '-webkit-flex',
      '-webkit-align-items': 'flex-start',
      alignItems: 'flex-start',
      fontFamily: 'Noto Sans',
      color: '#fff',
      marginTop: '12%',
      fontWeight: 500,
      flexDirection: 'column', 
      marginLeft: '33.33%',
      marginRight: '33.33%',
      justifyContent: 'center',
      '-webkit-justify-content': 'center',
      width: '33.33%',    
    },
    welcome: {
        fontSize: '1.75rem',
        lineHeight: '1.5em'
    },
    brand: {
        fontFamily: 'Agilent TT Cond',
        alignItems: 'start',
        justifyContent: 'left',
        textAlign: 'left',
        lineHeight: '1.5em',
        fontSize: '1.75rem',
    },
    brandBold: {
        fontFamily : 'Agilent TT Cond Bold', 
    },
    module: {
        fontWeight: 500,
        lineHeight: '2.0em',
        marginTop: '15px',
    },
    panelBody: {
        marginTop: '10px',
    },
    enterCredentials: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
        marginTop: '15px',
        marginBottom: '10px',
    },
    label: {
        fontSize: '.75rem',
        fontWeight: 700
    },
    input: {
        lineHeight: 1.5,

    },
    username: {
        border: '1px solid rgba(255,255,255,.12)',
        borderTopColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: '#fff',
        color: '#000',
        width: '100%',
    },
    submit: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    submitButton: {
        width: '30%',
        marginTop: '15px',
        border: '1px solid rgba(255,255,255,.12)',
        lineHeight: 1.5,
        fontSize: '.875rem',        
    },
    footer: {
        color: '#000',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        height: '45px',
        position: 'absolute',
        bottom: '0px',
        width: '100%',        
        alignItems: 'center',
    },
    brandName : {
        fontSize: '0.9rem',
        fontFamily : 'Agilent TT Cond',
    }
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: true,
            username: '',
            password: '',
            domain: '',

        }
    }

    handleUsername = event => {
        let username = event.target.value
        //console.log(username)
        this.setState({username: username})
    }

    handlePassword = event => {
        let password = event.target.value
        //console.log(password)
        this.setState({password: password})
    }

    handleDomain = event => {
        let domain = event.target.value

        this.setState({domain: domain})
    }

    handleSubmit = event => {
        const {username, password, domain} = this.state;
        console.log(username+':'+password+':'+domain);
    }

    handleMouseOver = event =>  {
        this.setState({ hovered:true });
    }
  
    handleMouseOut = () => {
        this.setState({ hovered:false });
    }

    style = () => {
        if (this.state.hovered) {
            return { backgroundColor: "#e2e6ea", cursor: 'pointer' }
          } else {
            return { backgroundColor: "#fff" }
          }
    }


    render() {
        const { classes, productName, moduleName, showOpenLabBrandName, showDomainInput } = this.props;
        const { loggedIn, username, password, domain } = this.state;

        return (            
            <div>
                {loggedIn === true? 
                <ClippedDrawer />:
                <div>
                    <div className={classes.login}>
                        <div className={classes.welcome}>Welcome to:</div>
                        <div className={classes.brand}>
                        {showOpenLabBrandName ? <span><span className={classNames(classes.brand, classes.brandBold)}>Open</span>Lab</span>: ''}
                         {productName?productName:'Control Panel'}</div>
                        <div className={classes.module}>{moduleName ? moduleName: 'Administration module'}</div>
                        <div className={classes.panelBody}>
                            <div className={classes.enterCredentials}>Please login with your account.</div>
                        </div>
                        <label htmlFor="username" className={classes.label}>USERNAME</label>
                        <input name="username" placeholder="Please enter your username." className={classNames(classes.username, classes.input)} 
                        type="text" value={username} onChange={this.handleUsername} />
                        <label htmlFor="password" className={classes.label}>PASSWORD</label>
                        <input placeholder="Please enter your password." className={classNames(classes.username, classes.input)} 
                        type="password" value={password} onChange={this.handlePassword} />
                        {showDomainInput ? 
                        <div><label htmlFor="domain" className={classes.label}>DOMAIN</label>
                        <input placeholder="Please enter your domain." className={classNames(classes.username, classes.input)} 
                        type="text" value={domain} onChange={this.handleDomain} /></div>
                        : ''}
                        <div className={classes.submit}>
                            <button className={classes.submitButton} style={this.style()} onMouseOver ={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleSubmit}>Login</button>
                        </div>
                        
                    </div>
                    <div className={classes.footer}>
                        <span className="ol-logo-agilent-spark"></span> 
                        <div className={classes.brandName}>Agilent Technologies</div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}
export default withStyles(styles, { withTheme: true })( Login);