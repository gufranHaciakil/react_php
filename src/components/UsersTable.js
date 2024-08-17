import React from 'react'
function UsersTable({users, onUserDelete}) {
  return (
    <table border={1}>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>State</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.u_name}</td>
          <td>{user.u_email}</td>
          <td>{user.u_password}</td>
          <td>{user.u_stat}</td>
          <td>
            <a href={`/editUser/${user.id}`}>edit</a>
            <button
              onClick={() => {
                onUserDelete(user.id);
              }}
            >
              delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default UsersTable
