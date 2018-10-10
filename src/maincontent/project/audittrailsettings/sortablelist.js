import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgButton from '../../../components/button'
import classNames from 'classnames'

const styles = theme => ({ 
  listItem: {
    paddingLeft:'20px', 
    height:'40px',
    display:'flex',
    alignItems: 'center',
    overflow: 'auto'
  },
  list: {
    height:'170px',
    maxHeight:'170px',
    overflow: 'auto',
    border: 'solid 1px #e1e3e5'
  }
});

class SortableList extends Component {

  render() {
    const { classes, reasons, type, onDelete, onMoveUp, onMoveDown, selectedIndex, onSelect, readOnly } = this.props;
      return (  
        <div>
          <div className="form-row">
            <div className={classNames('form-group', 'col-md-10')}>
              <label htmlFor="reason">List of reasons:</label>
              <div className={classes.list}>
                {reasons.map((reason, index) => {
                  return <div className={classes.listItem} key={index} onClick={e => onSelect(e, type, index)}
                    style={index === selectedIndex ? { backgroundColor: '#eeeeee' } : {}}
                  >
                    {reason.text}
                  </div>
                })}
              </div>
            </div>
            <div className="form-group col-md-2" style={{ paddingTop: '15px' }} >
              {readOnly ? null :
                <Fragment>
                  <AgButton type="primary" onClick={e => onDelete(e, type)} value={'Delete'} />
                  <AgButton type="primary" onClick={e => onMoveUp(e, type)} value={'Move Up'} />
                  <AgButton type="primary" onClick={e => onMoveDown(e, type)} value={'Move Down'} />
                </Fragment>
              }
            </div>

          </div>
        </div>
      );    
  }

}

SortableList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortableList);
