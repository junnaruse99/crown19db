import React from 'react'

const cardRow = ({ info }) => {

    const { name, description, condition, Component, to } = info;

    return (
        <>
        {condition ? (
            <tr>
                <th scope="row">{name}</th>
                <td><Component to={to}>{description}</Component></td>
            </tr>
        ) : null}
        </>
    )
}
 
export default cardRow;