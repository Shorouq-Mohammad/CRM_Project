import React from 'react'
import {Grid} from '@material-ui/core';
import Badges from './Badges';
import TopEmployeeChart from './TopEmployeeChart';
import ClientPie from './ClientPie'
import SalesSince from './SalesSince';
import SalesSortedBy from './SalesSortedBy'


function Analytics() {
    return (
        <div>
            <Grid container spacing={1}>
                <Badges />
                <Grid item xs={4}>
                    <TopEmployeeChart />
                </Grid>
                <Grid item xs={8}>
                    <SalesSortedBy />
                </Grid>
                <Grid item xs={8}>
                    <SalesSince />
                </Grid>
                <Grid item xs={4}>
                    <ClientPie />
                </Grid>
            </Grid>
        </div>
    )
}

export default Analytics
