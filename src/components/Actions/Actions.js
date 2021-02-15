import React from 'react'
import AddClient from './AddClient'
import UpdateClient from "./UpdateClient";

function Actions() {
    return (
        <div className="actionPage">
            <UpdateClient />
            <AddClient />
        </div>
    )
}

export default Actions
