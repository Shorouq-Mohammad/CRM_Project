import React, {useState} from 'react'
import Select from 'react-select'
import { observer, inject } from 'mobx-react'
import {TextField, Popover, Button} from '@material-ui/core';
import { useSnackbar } from 'notistack';

function UpdatePopover(props) {

    const { id, first, last, country, countryId} = props.clientInfo
    const [client, setClient] = useState({first, last , countryId, country})
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        props.setOpen(false)
    };

    const update = async () => {
        const { first, last, countryId, country } = client
        if(first && last && countryId){
            const response  = await props.ClientsStore.updateClient(id, first, last, countryId)
            handleClose()
            const {text, variant} = (response && response.stack && response.message) ? {text:`Oops, The Client wasn't updated`, variant: 'error'} : {text: response, variant: 'success'}
            enqueueSnackbar(text, { variant })
        }else{
            enqueueSnackbar('some fields are missing', { variant: 'warning' })
        }
    }

    const updateInput = (event) => {
        const {id, value} = event.target
        setClient({...client, [id]: value})
    }

    const updateSelect = (event) => setClient({...client, countryId: event ? event.value : null})
    

    const options = props.ClientsStore.countries.map(c => { return {label: c.country, value: c.id} })

    return (
        <div>
            <Popover
                open={true}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 350, left: 700 }}
                anchorOrigin={{vertical: 'center',horizontal: 'center'}}
                transformOrigin={{vertical: 'center',horizontal: 'center'}}
            >
                <div className="popoverUpdate" >
                    <TextField
                        required label="Name"
                        value={client.first}
                        variant="outlined"
                        id="first"
                        onChange = {updateInput}
                    />
                    <TextField
                        required label="Surname"
                        value={client.last}
                        variant="outlined"
                        id="last"
                        onChange = {updateInput}
                    />
                    <Select 
                        options={options} 
                        onChange={updateSelect} 
                        isClearable="true" id="selectCountry" 
                        defaultValue={{label: country, value: countryId}} 
                    />
                    <Button variant="contained" color="secondary" onClick={update} >
                        Update
                    </Button>
                </div>
            </Popover>
        </div>
    )
}

export default inject("ClientsStore")(observer(UpdatePopover))
