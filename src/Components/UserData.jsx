import React, { useEffect, useState } from "react";
import "./userdata.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { EditableText } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
const UserData = () => {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUser(res.data);
      console.log(user);
    });
  }, []);
  const adduser = () => {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      axios.post("https://jsonplaceholder.typicode.com/users", {
          name,
          email,
          website,
        })
        .then((responsedata) => {
          setUser([...user, responsedata.data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
          toast.success("succesfully add user");
        })
        .catch((err) => {
          console.log("error message", err);
          toast.error("❌ Failed to add user!");
        });
    } else {
      toast.warning("please enter values");
    }
  };

  const editUser = (id, key, value) => {
    setUser((u) => {
      return u.map((e) => {
          return e.id === id ? { ...e, [key]: value } : e;
      });
    });
  };

  const updateUSer = (id) => {
    const editeduser = user.find((e) => e.id === id);
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,editeduser)
    .then(()=>{
     setUser((previous)=>previous.map((u)=>(u.id===id?editeduser:u)))
      toast.success("succesfully update user");
    })
    .catch((err)=>{
      console.log(err)
      toast.error("❌ Failed to update user!");
    })
  };
  const deleteuser=(id)=>{
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(()=>{
      // this deelete is temproverly hide in ui not really deleted in backend 
      setUser((pre)=>(pre.filter((u)=>(u.id!==id))))
      toast.success("succesfully deleted user")
    })
  }
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
          {user.map((e, index) => (
            <tr key={index}>
              <td>{e.id}</td>
              <td>
                <EditableText
                  onChange={(value) => editUser(e.id, "name", value)}
                  value={e.name}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => editUser(e.id, "email", value)}
                  value={e.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={(value) => editUser(e.id, "website", value)}
                  value={e.website}
                />
              </td>

              <td>
                <Button
                  className="btn-primary"
                  onClick={() => updateUSer(e.id)}
                >
                  Update
                </Button>
                <Button className="btn-danger" on onClick={()=>deleteuser(e.id)}>delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="enter name..."
              />
            </td>
            <td>
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="enter email..."
              />
            </td>
            <td>
              <input
                type="text"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="enter website..."
              />
            </td>
            <td>
              <Button className="btn-success" onClick={adduser}>
                Submit
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UserData;
