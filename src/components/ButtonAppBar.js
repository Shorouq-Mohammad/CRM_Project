import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {AppBar,Tabs, Tab} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [tab, setTab] = useState(0)
  const history = useHistory();

  const handleClick = (event) => {
    const tabID = parseInt(event.target.id || event.target.parentElement.id)
    setTab(tabID)
  }

  useEffect(() => {
    const route =  tab === 0 ? "/clients" : (tab === 1 ? "/actions" : "/analytics")
    history.length < 3 ? history.push(route): history.replace(route)
  }, [tab])
  
  return ( 
    <div className={classes.root}>
      <AppBar style={{position: 'static'}}>
        <Tabs onClick={handleClick} value={tab} >
            <Tab label="Clients" id="0"/>
            <Tab label="Actions" id="1"/>
            <Tab label="Analytics" id="2"/>
        </Tabs>
      </AppBar>
    </div>
  );
}
