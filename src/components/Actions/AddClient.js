import React, {useState} from 'react'
import {TextField, Button} from '@material-ui/core';
import { observer, inject } from 'mobx-react'
import Select from 'react-select'
import { useSnackbar } from 'notistack';

function AddClient(props) {

    const [country, setCountry] = useState({countryId: -1, country: ''})
    const [owner, setOwner] = useState({ownerId: -1, owner: ''})
    const [client, setClient] = useState({first: '', surname: ''})
    const { enqueueSnackbar } = useSnackbar();

    const updateInput = (event) => {
        const {id, value} = event.target
        setClient({...client, [id]: value})
    }

    const addClient = async () => {
        const {first, surname} = client
        if(first && surname && country.countryId >= 0 && owner.ownerId >=0 ){
            const response  = await props.ClientsStore.addClient(first, surname, country.countryId, owner.ownerId)
            setClient({first: '', surname: ''})
            const {text, variant} = (response && response.stack && response.message) ? {text:`Oops, The Client wasn't added`, variant: 'error'} : {text: response, variant: 'success'}
            enqueueSnackbar(text, { variant })
        }else{
            enqueueSnackbar('Please fill all the fields', { variant: 'warning' })
        }
    }

    const countryOptions = props.ClientsStore.countries.map(c => { return {label: c.country, value: c.id} })
    const ownerOptions = props.ClientsStore.owners.map(o => { return {label: o.owner, value: o.id} })

    return (
        <div className="formClient">
            <h2>Add Client</h2>
            <TextField
                required label="First Name"
                value={client.first}
                id="first"
                onChange = {updateInput}
            />
            <TextField
                required label="Surname"
                value={client.surname}
                id="surname"
                onChange = {updateInput}
            />
            <Select 
                options={countryOptions} 
                onChange={(event) => setCountry({countryId: event.value, country: event.label})} 
                isClearable="true" id="selectCountry" 
                placeholder= "Select Country"
            />
            <Select 
                options={ownerOptions} 
                onChange={(event) => setOwner({ownerId: event.value, owner: event.label})} 
                isClearable="true" id="selectOwner" 
                placeholder= "Select Owner"
            />
            <Button variant="contained" color="secondary" onClick={addClient} >
                Add New Client
            </Button>
        </div>
    )
}

export default inject("ClientsStore")(observer(AddClient))
