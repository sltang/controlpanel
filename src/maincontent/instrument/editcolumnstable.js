import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
      /*width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',*/
    },
    table: {
      /*minWidth: 700,*/
    },
  });



class EditColumnsTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        const { classes, handleChange, handleSelect, checked, columnData, selected } = this.props;
        return (
            <Table className={classes.root}>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Visibility</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {columnData.map((n, index) => {
                    return (
                    <TableRow key={index} onClick={e => handleSelect(e, index)} selected={selected === index}>
                        <TableCell component="th" scope="row">
                            {n.label}
                        </TableCell>
                        <TableCell padding="dense">
                            <Checkbox
                                checked={checked[index]}
                                onChange={e  => handleChange(e, index)}
                        /></TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        )
    }
}

EditColumnsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(EditColumnsTable);