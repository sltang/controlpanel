import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    detailsItem: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit*3,
    },
    paper: {
        textAlign: 'left',
    },
    gutters: {
        paddingLeft: '0px'
    },  
    button: {
        margin: theme.spacing.unit,
    },
    buttons: {
        display: 'flex',
        marginTop: theme.spacing.unit * 5,
        justifyContent: 'flex-end'
    },
})

class AddProjectProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
        };
    }

    componentDidMount() {
        //const { match } = this.props;
        //console.log(match);
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
    }

    handleActivityLogClick = event => {
        this.setState({ activityLogOpen: this.state.activityLogOpen === undefined || !this.state.activityLogOpen });
    }

    handleChange = name => event => {
        const { project } = this.state;
        project[name] = event.target.value;
        this.setState({
            project: project,
        });
    }

    render() {
        const { classes } = this.props;
        const { project } = this.state;

        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Name:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="name"
                            label=""
                            className={classes.textField}
                            value={project.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Project folder path:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="folderPath"
                            label=""
                            className={classes.textField}
                            value={project.folderPath}
                            onChange={this.handleChange('folderPath')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Description:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="desc"
                            label=""
                            multiline
                            rows="4"
                            value={project.desc}
                            onChange={this.handleChange('desc')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Applications:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={project.application}
                            onChange={this.handleChange('application')}
                            />
                        }
                        label="OpenLab CDS"
                    />      
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button variant="outlined" className={classes.button} color="primary" onClick={this.handleOKClick}>
                    OK
                    </Button>
                    <Button variant="outlined" className={classes.button} color="secondary" onClick={this.handleCancelClick}>
                    Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

AddProjectProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProjectProperties);

