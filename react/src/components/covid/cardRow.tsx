import React from 'react'

const cardRow = ({ info }) => {

    const { name, description, condition } = info;

    return (
        <>
        {condition ? (
            <tr>
                <th scope="row">{name}</th>
                <td>{description}</td>
            </tr>
        ) : null}
        </>
    )
}
 
export default cardRow;