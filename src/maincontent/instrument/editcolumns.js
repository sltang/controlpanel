import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditColumnsTable from './editcolumnstable';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 650,
        backgroundColor: theme.palette.background.paper,
      },
      paper: {
        height: '100%',
        maxHeight: 800,
        width: '100%',
        maxWidth: 450,
      },
      buttons: {
        dispaly: 'flex',
        flexDirection: 'column'
      },
      editButton: {
          width: '105px',
          textTransform: 'none',
          fontSize: '0.75rem',
          fontWeight: '400'
      }
})

class EditColumns extends Component {
    constructor(props) {
        super(props);
        const { columnData } = this.props;
        this.state = { 
            columnData: columnData,
            open: false,
            checked: columnData.map(_ => true),
            savedChecked: columnData.map(_ => true),
            selected: -1
        }
    }

    handleCancel = event => {
        let checked = this.state.checked.map((_, index) => this.state.savedChecked[index])
        this.setState({open: false, checked:checked })
    }

    handleOk = event => {
        let savedChecked = this.state.savedChecked.map((_, index) => this.state.checked[index])
        this.setState({open: false, savedChecked:savedChecked})
        this.props.handleColumnsChange(this.state.checked)
    }

    handleClick = event => {
        this.setState({open: true })
    }

    handleChange = (event, index) => {
        let checked = this.state.checked;
        checked[index] = event.target.checked;
        this.setState({checked});
    }

    handleSelect = (e, index) => {
        this.setState({selected: index})
    }

    handleMoveUp = () => {
        let index = this.state.selected;
        if (index > 0) {
            let columnData = this.state.columnData;
            let tmp = columnData[index - 1];
            columnData[index - 1] = columnData[index];
            columnData[index] = tmp;
            let checked = this.state.checked;
            let tmpChecked = checked[index - 1];
            checked[index-1] = checked[index];
            checked[index] = tmpChecked;
            this.setState({columnData:columnData, selected:index-1, checked:checked});
        }
    }

    handleMoveDown = () => {
        let index = this.state.selected;
        let columnData = this.state.columnData;
        if (index < columnData.length) {
            let columnData = this.state.columnData;
            let tmp = columnData[index + 1];
            columnData[index + 1] = columnData[index];
            columnData[index] = tmp;
            let checked = this.state.checked;
            let tmpChecked = checked[index + 1];
            checked[index + 1] = checked[index];
            checked[index] = tmpChecked;
            this.setState({columnData:columnData, selected:index+1, checked:checked});
        }
    }

    render() {
        const { classes, columnData } = this.props;
        const { open, checked, selected } = this.state;
        return (
            <div>
                <Button className={classes.editButton} variant="outlined" onClick={this.handleClick}>Edit Columns</Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={open}
                    onClose={this.handleClose}
                    classes={{
                        paper: classes.paper,
                    }}
                >
                    <DialogTitle>Edit Columns</DialogTitle>

                    <DialogContent>                        
                        <EditColumnsTable columnData={columnData} handleChange={this.handleChange} handleSelect={this.handleSelect} checked={checked} selected={selected} />
                    </DialogContent>
                    <DialogActions>
                    <div className={classes.buttons}>
                        <div>
                        <Button onClick={this.handleMoveUp} disabled={selected === -1 || selected < 1} color="primary">
                            Move Up
                        </Button>
                        <Button onClick={this.handleMoveDown} disabled={selected === -1 || selected > columnData.length - 2} color="primary">
                            Move Down
                        </Button>
                        </div>
                        <div>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
                        </Button>
                        <Button onClick={this.handleCancel} color="secondary">
                            Cancel
                        </Button>
                        </div>
                    </div>
                    </DialogActions>
                </Dialog>	

            </div>
        )
    }
}

EditColumns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditColumns);
/*<EditColumnsTable columnData={columnData} handleChange={this.handleChange} checked={checked}/>*/