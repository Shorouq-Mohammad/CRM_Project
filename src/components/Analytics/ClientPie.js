import React from 'react'
import {Pie} from 'react-chartjs-2';

function ClientPie() {
    const data = {
        labels: [
            'Last month',
            '6-12 months',
            '>12 months'
        ],
        datasets: [{
            data: [302, 131, 22],
            backgroundColor: ['#795548', '#34495e', '#95a5a6'],
            hoverBackgroundColor: ['#795548', '#34495e', '#95a5a6']
        }]
    };

    return (
        <div>
            <h2>Client Acquisition</h2>
            <Pie data={data} />
        </div>
    )
}

export default ClientPie
