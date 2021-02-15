import React, {useState} from 'react'
import { observer, inject } from 'mobx-react'
import { DataGrid } from '@material-ui/data-grid'
import {TextField} from '@material-ui/core';
import UpdatePopover from './UpdatePopover'
import Select from 'react-select'


function Clients(props) {
    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const [client, setClient] = useState({id: '', first: '', last: '', countryId: '', country: ''})
    const [option, setOption] = useState({label: 'name', value: 1})

    const mapArray = (arr) => {
        return arr.map(c => { return {id: c.id, 
            first: c.first, 
            last: c.last,
            email: c.email,
            sold: c.sold ? "Yes" : "No",
            date: c.date,
            countryId: c.country_id,
            country: c.country,
            emailType: c.email_type,
            owner: c.owner
            }})
    }

    const dynamicSearch = () => {
        if(option.value === 1 ){
            return props.ClientsStore.clients.filter(r => r.first.toLowerCase().includes(inputValue.toLowerCase()) || r.last.toLowerCase().includes(inputValue.toLowerCase()))
        }else if(option.value === 5){
            return props.ClientsStore.clients.filter(r => r[option.label])
        }else{
            return props.ClientsStore.clients.filter(r => r[option.label] && r[option.label].toLowerCase().includes(inputValue.toLowerCase()))
        }
    }

    const rows = mapArray((inputValue ? dynamicSearch() : null)|| props.ClientsStore.clients)

    const columns = [
        { field: 'first', headerName: 'Surname', width: 130},
        { field: 'last', headerName: 'Surname', width: 130},
        { field: 'country', headerName: 'Country', width: 130 },
        { field: 'date', headerName: 'First Contact', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'sold', headerName: 'Sold', width: 100 },
        { field: 'emailType', headerName: 'Email Type', width: 130 },        
        { field: 'owner', headerName: 'Owner', width: 150 }
      ];

    const handleClick = (param) => {
        let {id, first, last, countryId, country} = param.row
        setClient({id, first, last, country, countryId})
        setOpen(true)
    }

    const searchOptions = [
        {label: "name" , value: 1 },
        {label: "country" , value: 2 },
        {label: "owner" , value: 3 },
        {label: "email" , value: 4 },
        {label: "sold" , value: 5 }
    ]

    return (
        <div style={{ height:'92vh', width: '99vw' }}>
            <div className="userInputClient">
                <TextField id="standard-basic" label="Search" 
                    onChange={({target}) => setInputValue(target.value)} 
                    value={inputValue} 
                />
                <Select 
                    options={searchOptions} 
                    onChange={(event) => event && setOption({label: event.label, value: event.value})} 
                    isClearable="true" id="selectSearchOption" 
                    placeholder= "Select Search Category"
                    defaultValue={option}
                />
            </div>
            <DataGrid rows={rows} columns={columns} pageSize={20}  onCellClick={handleClick}/>
            {open && <UpdatePopover clientInfo={client} setOpen={setOpen} />}
        </div>
    )
}

export default inject("ClientsStore")(observer(Clients))
