import React from "react"

import { useEffect, useState } from "react"
export const SearchPanel = ({users, param, setParam }) => {


    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={e => setParam({
                ...param,
                name: e.target.value
            })} />
            <select value={param.personId} onChange={e => setParam({
                ...param,
                personId: e.target.value
            })} >
                <option value={' '} >负责人</option>
                {
                    users.map(users => <option key={users.id} value={users.id}>{users.name}</option>)
                }
            </select>
        </div>
    </form>
}