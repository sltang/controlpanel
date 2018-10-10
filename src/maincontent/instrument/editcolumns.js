import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditColumnsTable from './editcolumnstable';
import AgModal from '../../components/modal'
import AgButton from '../../components/button'

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
})

class EditColumns extends Component {
    constructor(props) {
        super(props);
        const { columnData } = this.props;
        this.state = { 
            columnData: columnData.map(d => {return {...d, checked:true}}),
            open: false,
            checked: columnData.map(_ => true),
            savedChecked: columnData.map(_ => true),
            selected: -1,
            order:'',
        }
        this.handleSort = this.handleSort.bind(this)
    }

    handleCancel = event => {
        let columnData = this.state.columnData
        columnData.forEach((d, index) => d.checked = this.state.savedChecked[index])
        this.setState({open: false, columnData, selected:-1 })
    }

    handleOk = event => {
        let savedChecked = this.state.savedChecked.map((_, index) => this.state.columnData[index].checked)
        this.setState({open: false, savedChecked:savedChecked})
        this.props.handleColumnsChange(this.state.columnData)
    }

    handleClick = event => {
        this.setState({open: true })
    }

    handleChange = (event, index) => {
        let columnData = this.state.columnData
        columnData[index].checked = event.target.checked
        this.setState({columnData});
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

    handleSort() {       
        const { columnData } = this.state;
        let order = 'desc';
        let orderBy = 'id'

        if (this.state.order === 'desc') {
            order = 'asc';
        }

        order === 'desc'
        ? columnData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : columnData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));     
        this.setState({ order, columnData});
    }

    render() {
        const { classes } = this.props;
        const { open, selected, columnData, order } = this.state;
        
        return (
            <div>
                <AgButton type="secondary" onClick={this.handleClick} value={'Edit Columns'} />
                <AgModal showModal={open} title={'Edit Columns'} content={
                    <EditColumnsTable columnData={columnData} handleChange={this.handleChange} handleSelect={this.handleSelect} selected={selected} order={order} handleSort={this.handleSort}/>
                }
                actions={
                    <div className={classes.buttons}>
                        <div>
                            <AgButton type="primary" onClick={this.handleMoveUp} value={'Move Up'} disabled={selected === -1 || selected < 1} />
                            <AgButton type="primary" onClick={this.handleMoveDown} value={'Move Down'} disabled={selected === -1 || selected > columnData.length - 2} />

                        </div>
                        <div>
                            <AgButton type="primary" onClick={this.handleOk} value={'Ok'} />
                            <AgButton type="secondary" onClick={this.handleCancel} value={'Cancel'} />

                        </div>
                    </div>
                }
                />
                	

            </div>
        )
    }
}

EditColumns.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditColumns);
