import React from 'react'
import { Grid } from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import Badge from './Badge'

function Badges(props) {
    const badgesData = props.ClientsStore.getBadgesData()
    return (
        <>
            {badgesData.map((b, i)=> {
                return (
                    <Grid item xs={3} key={i}>
                        <Badge header={b[0]} p={b[1]} color={b[2]} id={i}/> 
                    </Grid>
                )
            } 
            )}    
        </>
    )
}

export default inject("ClientsStore")(observer(Badges))
