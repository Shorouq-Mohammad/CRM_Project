import React, {useState} from 'react'
import {Bar} from 'react-chartjs-2';
import { observer, inject } from 'mobx-react'
import Select from 'react-select'

function SalesSortedBy(props) {
    const [option, setOption] = useState({label: "country" , value: 1 })
    const [filteredData, setFilteredData] = useState(props.ClientsStore.groupCountry)

    const sortBy = [
      {label: "Country" , value: 1 },
      {label: "Email" , value: 2 },
      {label: "Month" , value: 3 },
      {label: "Owner" , value: 4 }
    ]

    const handleChange = (event) => {
      if(event){
        const {label, value} = event
        setOption({label, value})
        setFilteredData(props.ClientsStore[`group${label}`])
      }
    }

    let data = {
        labels: filteredData[0],
        datasets: [
          {
            label: 'salesBy',
            backgroundColor: 'rgba(149,81,150,0.8)',
            borderColor: 'rgba(149,81,150,8)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(149,81,150,1)',
            hoverBorderColor: 'rgba(149,81,150,1)',
            data: filteredData[1]
          }
        ]
      };
    return (
        <div>
            <div className="userInputClient">
            <h2>Sales By </h2>
              <Select 
                    options={sortBy} 
                    onChange={handleChange} 
                    isClearable="true" id="selectSearchOption" 
                    placeholder= "Select Search Category"
                    defaultValue={option}
                />
              </div>
            <Bar
                data={data}
                width={38}
                height={85}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default inject("ClientsStore")(observer(SalesSortedBy))

