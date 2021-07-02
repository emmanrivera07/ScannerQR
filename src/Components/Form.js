import React, { Fragment, useState, useEffect} from 'react'
import QrReader from 'react-qr-reader';
import {v4 as uuidv4} from 'uuid';
const Form =({handleAddUser})=>{


    const [scanResultCamera, setScanResultCamera]=useState('');

    const [user, setUser]=useState({
        nombre:'',
        apellido:'',
        DNI:'',
        departamento:''
    });
    const[error, setError]=useState(false);


    let {nombre, apellido, DNI, departamento}=user;

    const handleErrorCamera=(error)=>{
        console.log(error);
    };

    const handleScanCamera=(result)=>{
        if(result){
            setScanResultCamera(result);
            return;
        }
    };

    

    const handleOnchangeText=()=>{
        
        setUser({
            ...user,
            nombre:scanResultCamera.split('<')[3],
            apellido:scanResultCamera.split('<')[2],
            DNI:scanResultCamera.split('<')[1],
            departamento:scanResultCamera.split('<')[5]
        });
    };

    const handleOnSubmitData=e=>{
        e.preventDefault();

        if((nombre && nombre.trim()==='') || (apellido && apellido.trim()==='') || (DNI && DNI.trim()==='') || (departamento && departamento.trim()==='')===undefined){
            setError(true);
            console.log('Hay un error');
            return;
        }
        setError(false);
        user.id=uuidv4();
        handleAddUser(user);

        
    };
    useEffect(() => {
            setTimeout(() => {
                if(nombre!='' && apellido!='' && DNI!='' && departamento!=''){
                setUser({
                    nombre:'',
                    apellido:'',
                    DNI:'',
                    departamento:''
                });
                setScanResultCamera('');
                
                } 
            }, 5000);
            
        }, [handleOnSubmitData]);

    return(
        <Fragment>
            {
                scanResultCamera!=''?
                (<p className="success-alert">Se han capturado los datos, ¡agrégalos!</p>)
                :null
            }
            {
                error?
                (<p className="error-alert">Todos los campos son obligatorios</p>)
                :null
            }
            <div className="row justify-content-center">
                
                
                <div className="col-10 col-sm-6 col-md-4 col-lg-4">
                    <div className="card">
                        <div className="card-body justify-content-center">
                            
                            <QrReader
                                                    
                            delay={200}
                            style={{width:'100%'}}
                            onError={handleErrorCamera}
                            onScan={handleScanCamera}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="col-10 col-sm-6 col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4 font-weight-bold">
                            Nuevo usuario

                            </h2>
                            <form onSubmit={handleOnSubmitData} className="container-form">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre del usuario"
                                        name="nombre"
                                        value={nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input
                                
                                        type="text"
                                        className="form-control"
                                        placeholder="Apellido del usuario"
                                        name="apellido"
                                        value={apellido}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Número de identificación</label>
                                    <input
                                
                                        type="text"
                                        className="form-control"
                                        placeholder="Número de identificación del usuario"
                                        name="DNI"
                                        value={DNI}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Departamento</label>
                                    <input
                                
                                        type="text"
                                        className="form-control"
                                        placeholder="Departamento del usuario"
                                        name="departamento"
                                        value={departamento}
                                    />
                                </div>
                                <button
                            
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-appercase
                                    d-block w-100 btn--submit"
                                    onClick={handleOnchangeText}
                                    >Agregar
                                </button>
                         </form>
                         
                        </div>

                    </div>
                    
                </div> 
            </div>
        </Fragment>
    );
}

export default Form;