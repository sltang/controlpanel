import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',
    },
    table: {
      /*minWidth: 700,*/
    },
  });



class CustomParametersTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        const { classes, data, active, handleClick, handleChange } = this.props;
        if (data !== undefined) {
            return (
                <Table className={classes.root}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Default Value</TableCell>
                        <TableCell>Mandatory</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((n, index) => {
                        return (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row" onClick={e => handleClick(e,  index, 'name')}>
                                {(active.id === index && active.name === 'name') ? <TextField
                                id="name"
                                label=""
                                className={classes.textField}
                                value={data[index]['name']? data[index]['name']:''}
                                onChange={e => handleChange(e,  index, 'name')}
                                margin="dense"
                                /> : data[index]['name']}
                            </TableCell>
                            <TableCell onClick={e => handleClick(e,  index, 'type')}>{
                                (active.id === index && active.name === 'type') ? <Select native
                                value={data[index]['type'] ? data[index]['type']:'text'}
                                onChange={e  => handleChange(e,  index, 'type')}
                                inputProps={{
                                name: '',
                                id: 'type',
                                }}
                                >
                                <option value={'text'}>Text</option>
                                <option value={'numeric'}>Numeric</option>
                                <option value={'date'}>Date</option>
                                </Select> : data[index]['type']}                            
                            </TableCell>
                            <TableCell onClick={e => handleClick(e,  index, 'value')}>
                                {(active.id === index && active.name === 'value') ? <TextField
                                label=""
                                className={classes.textField}
                                value={data[index]['value'] ? data[index]['value']:''}
                                onChange={e => handleChange(e,  index, 'value')}
                                margin="dense"
                                /> : data[index]['value']}
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={data[index]['mandatory']}
                                    onChange={e  => handleChange(e,  index, 'mandatory')}
                            /></TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            )
        } else {
            return <div></div>
        }
    }
}

CustomParametersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CustomParametersTable);