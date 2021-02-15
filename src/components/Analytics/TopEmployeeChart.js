import React from 'react'
import {HorizontalBar} from 'react-chartjs-2';
import { observer, inject } from 'mobx-react'


function TopEmployeeChart(props) {
    const dataEmployee = props.ClientsStore.topThreeEmployees()
    const data = {
        labels: dataEmployee[0],
        datasets: [
          {
            label: "Top Employee",
            backgroundColor: 'rgba(0,63,92,0.8)',
            borderColor: 'rgba(0,63,92,1)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(0,63,92, 1)',
            hoverBorderColor: 'rgba(0,63,92,1)',
            data: dataEmployee[1]
          }
        ]
      };
    return (
        <div>
            <h2>Top Employees</h2>
            <HorizontalBar data={data} />
        </div>
    )
}

export default inject("ClientsStore")(observer(TopEmployeeChart))
