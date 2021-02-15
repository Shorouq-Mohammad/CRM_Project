import React from 'react'
import {Line} from 'react-chartjs-2';
import { observer, inject } from 'mobx-react'


function SalesSince(props) {
    const dates = props.ClientsStore.get30days()
    const data = {
        labels: dates[0],
        datasets: [
          {
            label: 'Sales last 30 days',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(255,110,84,1)',
            borderColor: 'rgba(255,110,84,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,110,84,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,110,84,1)',
            pointHoverBorderColor: 'rgba(255,110,84,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:dates[1]
          }
        ]
      };
    return (
        <div>
            <h2>Sales Since 30 days</h2>
            <Line data={data}  width={40} height={10} />
        </div>
    )
}

export default inject("ClientsStore")(observer(SalesSince))
