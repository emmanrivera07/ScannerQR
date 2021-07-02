import Form from "./Components/Form";
import React, {Fragment, useState} from 'react'


function App() {

  const [users, setUsers]=useState([]);

  const handleAddUser=user=>{
    setUsers([
      ...users,
      user
    ]);
  }
  return (
    
    <Fragment>
      <Form
      handleAddUser={handleAddUser}
      />
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card">
            <div className="card-body">
              <h2 className="text-center my-5">Listado de usuarios</h2>

              <table className="table table-striped">
                <thead className="bg-primary table-dark">
                  <tr>
                    <th scope="col">Nombre</th>       
                    <th scope="col">Apellido</th>
                    <th scope="col">DNI</th>
                    <th scope="col">Departamento</th>
                  </tr>
                </thead>
                  {
                    users.length===0 ? 'No hay usuarios' 
                    : (
                        users.map(user=>(
                          
                          <Fragment>
                            <thead >
                              <tr>
                                <td>{user.nombre}</td>       
                                <td>{user.apellido}</td>
                                <td>{user.DNI}</td>
                                <td>{user.departamento}</td>
                              </tr>
                            </thead>
                            
                          </Fragment>

                        ))
                    )
                }
                 
              </table>
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
