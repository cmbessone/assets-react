
import React,{useEffect, useState} from 'react'
import axios from 'axios';
//import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';
import {show_alert} from '../functions';



const ShowMovimiento = () => {
    const url='http://localhost:8080/api/v1/mov'
    const [mov, setMovimientos] = useState([]);
	const [id, setId]= useState('');
    const [fecha, setFecha] = useState('');
    const [concepto,setConcepto] = useState('');
    const [importe,setImporte] = useState('');
    const [cuentaCBU,setCuentaCBU] = useState('');
	const [operation,setOperation] = useState('');
	const [title,setTitle] = useState('');

	useEffect(() => {
        getMovimientos();
    }, []);

    const getMovimientos = async () => {
        const respuesta = await axios.get(url);
        setMovimientos(respuesta.data);
    };
    

   


	const openModal = (op,id,fecha,concepto,importe,cbu) => {

		setFecha('');
		setConcepto('');
		setImporte('');
		setCuentaCBU('');
		setOperation(op);

		if (op === 1){
			setTitle('Registrar Movimiento');
		}
		else if(op === 2){
			setTitle('Editar Movimiento');
			setId(id);
			setFecha(fecha);
			setConcepto(concepto);
			setImporte(importe);
			setCuentaCBU(cbu);
		}
		window.setTimeout(function()
		 {
		document.getElementById('cuentaCBU').focus();	
		}, 500);
	}

	const validar =() => {
 		var parametros;	
		var metodo;

		if (fecha === ''){
			show_alert('Escribe la fecha del Monvimiento formato AAAA-MM-DD','warning');
		}
		else if (concepto.trim() === ''){
			show_alert('Indique el concepto','warning');
		}
		else if (importe === ''){
			show_alert('Indique el Impote','warning');
		}
		else if (cuentaCBU === ''){
			show_alert('Indique el cbu de la cuenta','warning');
		}
		else{
			if (operation === 1){
				parametros= {fecha:fecha,concepto:concepto.trim(),importe:importe,cuentaCBU:cuentaCBU};
				metodo='POST';
			}
			else{
				parametros={id:id,fecha:fecha,concepto:concepto.trim(),importe:importe,cuentaCBU:cuentaCBU};
				metodo='PUT';
			}

			enviarSolicitud(metodo, parametros);
		}

	}

	const enviarSolicitud= async (metodo, parametros) => {
		await axios({method:metodo,url:url,data:parametros}).then(function(respuesta){
			var tipo =respuesta.data[0];
			var msj =respuesta.data[1];
			show_alert('Creado', 'success');
			getMovimientos();
			document.getElementById('btnCerrar').click();
		}).catch(function(error){
			show_alert('Error en la solicitud','error');
			console.log(error);
		});
	}


  return (
    <div className='App'>
			<div className='container-fluid'>
				<div className='row mt-3'>
					<div className='col-md-4 offset-md-4'>
						<div className='d-grid mx-auto'> 
							<button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalMovimiento'>
								<i className='fa-solid fa-circle-plus'></i> Añadir
							</button>
						</div>
					</div>
				</div>		
			</div>

			<div className='row mt-3'>
					<div className='col-12 col-lg-8 offset-0 offset-lg-2'>
						<div className='table-responsive'>
							<table className='table table-boardered'>
								<thead>
									<tr><th>#</th><th>FECHA</th><th>CONCEPTO</th><th>IMPORTE</th><th>CUENTA</th></tr>
								</thead>
								<tbody className='table-group-divider'>
								{mov.map((movimiento, i)=>(
                                <tr key={movimiento.id}> 
                                    <td>{(i+1)}</td>
                                    <td>{movimiento.fecha}</td>
                                    <td>{movimiento.concepto}</td>
                                    <td>{movimiento.importe}</td>
                                    <td>{movimiento.cuentaCBU}</td>
                                    <td>
                                        <button onClick={()=>openModal(2,movimiento.id,movimiento.fecha,movimiento.concepto,movimiento.importe,movimiento.cuentaCBU)} 
                                        className= 'btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalMovimiento'>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        &nbsp;
                                        <button className='btn btn-danger'>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                                    ))
                                    }
								</tbody>
							</table>
						</div>
					</div>
			</div>

			<div id='modalMovimiento' className='modal fade' aria-hidden='true'>
				<div className='modal-dialog'>
					<div className= 'modal-content'>
						<div className='modal-header'>
							<label className='h5'>{title}</label>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<input type='hidden' id='id'></input>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-calendar'></i></span>
								<input type='text' id='fecha' className='form-control' placeholder='Fecha' value={fecha}
								onChange={(e)=> setFecha(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-credit-card'></i></span>
								<input type='text' id='concepto' className='form-control' placeholder='Concepto' value={concepto} 
								onChange={(e) => setConcepto(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-hand-holding-dollar'></i></span>
								<input type='text' id='importe' className='form-control' placeholder='Importe' value={importe} 
								onChange={(e)=> setImporte(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>	
								<span className='input-group-text'><i className= 'fa-solid fa-credit-card'></i></span>
								<input type='text' id='cuentaCBU' className='form-control' placeholder='CuentaCBU' value={cuentaCBU} 
								onChange={(e)=> setCuentaCBU(e.target.value)}></input>
							</div>
							<div className='d-grid col-6 mx-auto'></div>
							<button onClick={()=> validar()} className='btn btn-success'>
								<i className='fa-solid fa-floppy-disk'></i> Guardar
							</button>
						</div>
						<div className='modal-footer'>
						<button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
					</div>
					</div>

				</div>
			</div>
		</div>
  )
}

export default ShowMovimiento
