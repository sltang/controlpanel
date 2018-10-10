import React, {Component, Fragment} from 'react'
import AgButton from './button'
import AgModal from './modal'


class AgDialog extends Component {  

    render() {
        const { showModal, handleCancel, handleOk, dialog } = this.props
        return showModal ?  
          <AgModal showModal={showModal} title={dialog.title} content={dialog.content} actions={
            <Fragment>
            <AgButton type="primary" onClick={handleOk} value={'OK'} />
            <AgButton type="secondary" onClick={handleCancel} value={'Cancel'} />
            </Fragment>
          }  />    
           :
          null
    }

    
}

export default AgDialog