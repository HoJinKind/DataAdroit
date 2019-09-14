import React, { Component } from "react";
import * as d3 from "d3";
import { BrowserRouter, Redirect, withRouter } from "react-router-dom";
import { CSVReader } from "react-papaparse";
import { blueGrey } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  another:{
    margin:15
  },
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    margin: 17,
    padding: '0 30px',
  },
});


class TextInputForSA extends React.Component {

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }
  Navigate = keyword => {
    console.log(keyword);
    this.props.history.push("/analyze", {
      state: { keywordtext: keyword }
    });
  };

  render() {

    const { classes } = this.props;
    return (
      <div>
            <center><Typography  component='h1' variant='h5' fade>
      Text Sentiment Analysis
</Typography>

        <TextField  className={classes.another}
          id='keywordtext'
          name='keywordtext'
          margin="normal"
          variant="outlined"
          placeholder = "Enter Company Name"  
        />
        <button  className={classes.root}
          type='submit'
          onClick={() => {
            this.Navigate(document.getElementById("keywordtext").value);
          }}
        >
          Analyze
        </button></center>
      </div>
    );
  }
}

export default withStyles(styles)(TextInputForSA);
