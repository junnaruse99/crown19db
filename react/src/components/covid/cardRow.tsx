import React from 'react'

const cardRow = ({ info }) => {

    let { name, description, condition, Component, to } = info;

    to = to.replace(/\s/g, '-');

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