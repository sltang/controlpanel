import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AgCheckbox from '../../components/checkbox';
import { CustomParametersColumnData } from '../columndata'
import AgTable from '../../components/table'
import AgButton from '../../components/button'

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',
    },
    tableCell: {
      width: '25%',
    },
    hover:{
        '&$hover:hover': {
          backgroundColor:'#f5f5f5'
        }
    },
  });



class CustomParameters extends Component {

    render() {
        const { classes, data, active, handleClick, handleChange, handleAdd, handleDelete, readOnly } = this.props;
        if (data !== undefined) {
            return (
                <div className="form-row">
                    <div className="col-sm-10">
                        <AgTable columnData={CustomParametersColumnData} data={data}>
                            <TableBody>
                                {data.map((n, index) => {
                                    return (
                                        <TableRow key={n.id} hover classes={{ hover: classes.hover }}>
                                            <TableCell className={classes.tableCell} onClick={e => handleClick(e, index, 'name')}>
                                                {(active.id === index && active.name === 'name') ?
                                                    <input type="text" className="form-control" value={data[index]['name']} onChange={e => handleChange(e, index, 'name')} />
                                                    : data[index]['name']}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} onClick={e => handleClick(e, index, 'type')}>{
                                                (active.id === index && active.name === 'type') ?
                                                    <select
                                                        className="form-control"
                                                        value={data[index]['type']}
                                                        onChange={e => handleChange(e, index, 'type')}

                                                    >
                                                        <option value={'text'}>Text</option>
                                                        <option value={'numeric'}>Numeric</option>
                                                        <option value={'date'}>Date</option>
                                                    </select>
                                                    : data[index]['type']}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} onClick={e => handleClick(e, index, 'value')}>
                                                {(active.id === index && active.name === 'value') ?
                                                    <input type="text" className="form-control" value={data[index]['value']} onChange={e => handleChange(e, index, 'value')} />
                                                    : data[index]['value']}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>
                                                <AgCheckbox
                                                    checked={data[index]['mandatory']}
                                                    onChange={e => handleChange(e, index, 'mandatory')}
                                                /></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </AgTable>
                    </div>
                    <div className="col-sm-2" style={{ marginTop: '-10px' }}>
                        {readOnly ? <div></div> :
                            <Fragment>
                                <AgButton type="primary" onClick={handleAdd} value={'Add'} />
                                <AgButton type="primary" onClick={handleDelete} value={'Delete'} />
                            </Fragment>
                        }
                    </div>
                </div>

            )
        } else {
            return null
        }
    }
}

CustomParameters.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CustomParameters);