import React from 'react'

const cardRow = ({ info }) => {

    let { name, description, condition, Component, to, img } = info;

    to = to.replace(/\s/g, '-');

    return (
        <>
        {condition ? (
            <tr>
                <th scope="row">{name}</th>
                <td><Component to={to}>{description}<img src={img} /></Component></td>
            </tr>
        ) : null}
        </>
    )
}
 
export default cardRow;