import React, { useEffect, useState } from "react";
import "./userdata.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
      axios
        .post("https://jsonplaceholder.typicode.com/users", {
          name,
          email,
          website,
        })
        .then((responsedata) => {
          setUser([...user, responsedata.data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
          toast.success("succesfully add user")
        })
        .catch((err) => {
          console.log("error message", err);
          toast.error("❌ Failed to add user!")
        });
    }
    else{
      toast.warning("please enter values")
    }
  };
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
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.website}</td>
              <td>
                <Button className="btn-primary">Update</Button>
                <Button className="btn-danger">delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
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
        </tfoot>
      </table>
    </div>
  );
};

export default UserData;
