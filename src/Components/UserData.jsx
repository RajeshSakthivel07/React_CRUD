import React, { useEffect, useState } from 'react'
import './userdata.css'
import axios from 'axios'
import { Button } from 'react-bootstrap'
const UserData = () => {
  const [user,setUser]  =useState([])

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
   .then((res)=>{
    setUser(res.data)
    console.log(user)
   })
  },[user])
  return (
    <div>
      <table>
        <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Action</th>
        </thead>
        <tbody>
          {user.map((e,index)=>
          <tr key={index}>
            <td>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.website}</td>
            <td>
              <Button className='btn-primary'>Update</Button>
              <Button className='btn-danger'>delete</Button>
            </td>
          </tr>
          )}
          
        </tbody>
      </table>
    </div>
  )
}

export default UserData
