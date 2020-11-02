import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './App.css';
import MyTable from "./Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query_id:0
    }
  }
  componentDidMount() {
  }
  handleClick(query_id) {
    this.setState({query_id})

  }
  render() {
    // const {items} = this.state;
    return (
      <div className="App">
        <Grid container spacing={3} justify="center" alignItems="center" style={{marginTop: 20}}>
          <Grid item xs={10}>
            <Paper elevation={3}>
              <Typography component="h1" variant="h5">
                Welcome to Sketch
              </Typography>
              <Grid container xs={12} justify="center" alignItems="center" style={{height: 200}}>
                <Grid item xs={3} justify="center" alignItems="center">
                  <Button variant="contained" color="primary" onClick={()=>this.handleClick(1)}>
                    Query1: All Students Information
                  </Button>
                </Grid>
                <Divider orientation="vertical" flexItem style={{margin:20}}/>
                <Grid item xs={3} justify="center" alignItems="center">
                  <Button variant="contained" color="primary" onClick={()=>this.handleClick(2)}>
                    Query2: Email of Students who select Finance or Math
                  </Button>
                </Grid>
                <Divider orientation="vertical" flexItem style={{margin:20}}/>
                <Grid item xs={3} justify="center" alignItems="center">
                  <Button variant="contained" color="primary" onClick={()=>this.handleClick(3)}>
                    Query3: All Instructors Information
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="center" alignItems="center" style={{marginTop: 20}}>
        <Grid item xs={10}>
            <MyTable query_id={this.state.query_id}></MyTable>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;