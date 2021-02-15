import React, {useState} from 'react'
import { observer, inject } from 'mobx-react'
import {Button} from '@material-ui/core';
import Select from 'react-select'
import { useSnackbar } from 'notistack';
 
function UpdateClient(props) {

    const [client, setClient] = useState({id: null, sold: null})
    const [owner, setOwner] = useState({ownerId: null, owner: null})
    const [emailType, setEmailType] = useState({emailTypeId: null})
    const { enqueueSnackbar } = useSnackbar();

    const chooseSnackbar = (response, field) => {
        if(!field){
            enqueueSnackbar('Please fill the relevant fields', { variant: 'warning' })
            return ;
        }
        if(response && response.stack && response.message){//if error
            enqueueSnackbar('Oops, The move was not done', { variant: 'error'})

        }else{
            enqueueSnackbar(response, { variant: 'success'})
        }
    }

    const TransferOwnership = async() => {
        const response = await props.ClientsStore.TransferOwnership(client.id, owner.ownerId, owner.owner)
        chooseSnackbar(response, owner.owner)
    }
     
    const declareSale = async () => {
        const response = await props.ClientsStore.declareSale(client.id)
        !(response && response.stack && response.message) && setClient({...client, sold: true})
        chooseSnackbar(response, true)
    }

    const sendEmail = async () =>{
        const response = await props.ClientsStore.sendEmail(client.id, emailType.emailTypeId)
        chooseSnackbar(response, emailType.emailTypeId)
    }

    const selectClient = (event) => {
        if(event){
            const {sold, owner, owner_id} = props.ClientsStore.findClient(event.value)
            setClient({id: event.value, sold: sold})
            setOwner({ownerId: owner_id, owner})
        }else{
            setClient({id: null, sold: null})
        }
    }

    const ownerOptions = props.ClientsStore.owners.map(o => { return {label: o.owner, value: o.id } })
    const emailTypesOptions = props.ClientsStore.emailTypes.map(e => { return {label: e.email_type, value: e.id} })
    const clientsOptions = props.ClientsStore.clients.map(c => { return {label: `${c.first} ${c.last}`, value: c.id} })

    return (
        <div>
            <h2>Update</h2>
            <div className="formClient">
                
                <Select 
                    options={clientsOptions} 
                    onChange={selectClient} 
                    isClearable="true" id="selectOwner" 
                    placeholder= "Select Client"
                />
                {client.id && <>
                <Select 
                    options={ownerOptions} 
                    onChange={(event) => setOwner(event ? {owner:event.label , ownerId: event.value} : {...owner, owner: null})} 
                    isClearable="true" id="selectOwner" 
                    placeholder= "Select Owner"
                    defaultValue={{label: owner.owner, value: owner.ownerId}}
                />
                
                <Button variant="contained" color="secondary" onClick={TransferOwnership} >
                    Transfer Owner
                </Button>
                <Select 
                    options={emailTypesOptions} 
                    onChange={(event) => setEmailType(event ? {emailTypeId: event.value} : {emailTypeId: null})} 
                    isClearable="true" id="selectEmail" 
                    placeholder= "Select Email Type"
                />
                <Button variant="contained" color="secondary" onClick={sendEmail} >
                    Send
                </Button>
                {!client.sold && <Button variant="contained" color="secondary" onClick={declareSale} >
                    Declare Sale
                </Button>}
                </>}
            </div>
        </div>
    )
}

export default inject("ClientsStore")(observer(UpdateClient))
