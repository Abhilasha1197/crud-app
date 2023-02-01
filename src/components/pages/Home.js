import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id =>{
     await axios.delete(`http://localhost:3001/users/${id}`);
     loadUsers();
  }
  return (
    <div className="container table-responsive">

      <div className="py-4">
        <h1>Home</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{users.name}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>
                    <Link class="btn btn-light" to = {`/users/${users.id}`}>View</Link>
                    <Link class="btn btn-warning" to={`/users/edit/${users.id}`}>Edit</Link>
                    <Link class="btn btn-danger" onClick={() => deleteUser(users.id)}>Delete</Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
