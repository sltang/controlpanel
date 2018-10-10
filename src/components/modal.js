import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
     modal:{
        display: 'block', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        zIndex: 1, /* Sit on top */
        left: 0,
        top: 0,
        width: '100%', /* Full width */
        height: '100%', /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        backgroundColor: 'rgba(0,0,0,0.4)'/*'#384350'*/
     },
     modalContent: {
        backgroundColor: '#fefefe',
        margin: '5% auto', /* 15% from the top and centered */
        padding: '20px',
        border: '1px solid #888',
        width: '50%' /* Could be more or less, depending on screen size */
    }
     
})

class AgModal extends React.Component {  

    render() {
        const { classes, showModal, title, content, actions } = this.props
        return showModal ?          
          <div className={classes.modal}>
            <div className={classes.modalContent}>
              <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
              </div>
              <div className="modal-body">
                {content}
              </div>
              <div className="modal-footer">
                {actions}
              </div>
            </div>
          </div> :
          <div></div>
    }

    
}

AgModal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AgModal)