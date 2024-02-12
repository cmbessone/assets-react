

import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {show_alert} from '../functions';

const ShowCuenta = () => {
	const url= 'http://localhost:8080/api/v1/cuentas'
	const [cuentas,setCuentas]= useState([]);
	const [id,setId]= useState('');
	const [type,setType]= useState('');
	const [bank,setBank]= useState('');
	const [currency,setCurrency]= useState('');
	const [cbu,setCbu]= useState('');
	const [operation,setOperation]= useState('');
	const [title,setTitle]= useState('');



	useEffect( ()=>{
		getCuentas();
	},[]);

	const getCuentas = async () => {
		const respuesta = await axios.get(url);
		setCuentas(respuesta.data);
		} 
	
	const openModal = (op,id,cbu,type,bank,currency) => {
		setCbu('');
		setType('');
		setBank('');
		setCurrency('');
		setOperation(op);
		if(op === 1){
			setTitle('Registrar Cuenta');
		}
		else if(op===2){
			setTitle('Editar Cuenta');
			setId(id);
			setCbu(cbu);
			setType(type);
			setBank(bank);
			setCurrency(currency);
		}
		window.setTimeout(function(){
			document.getElementById('cbu').focus();
		},500);
	} 

	const validar =() => {
		var parametros;
		var metodo;

		if(cbu === ''){
			show_alert('Escribe el cbu de la cuenta','warning');
		}
		else if(bank === ''){
			show_alert('Escribe el','warning');
		}
		else if(type.trim() === ''){
			show_alert('Escribe el Tipo de la cuenta','warning');
		}
		else if(currency.trim() === ''){
			show_alert('Escribe la moneda de la cuenta','warning');
		}
		else{ 

			if (operation ===1){
				parametros= {cbu:cbu,bank:bank.trim(),type:type.trim(),currency:currency.trim()};
				metodo='POST';
			}else {
				parametros= {id:id,cbu:cbu,bank:bank.trim(),type:type.trim(),currency:currency.trim()};
				metodo='PUT';
			}

			enviarSolicitud(metodo, parametros);
		}
	}

	const enviarSolicitud = async(metodo,parametros) =>{
		await axios({method:metodo, url: url, data:parametros}).then(function(respuesta){
			//var tipo = respuesta.data[0];
			//var msj = respuesta.data[1];
			show_alert('Creado','success');
			getCuentas();
			document.getElementById('btnCerrar').click();	
			
		})
		.catch(function(error){
			show_alert('Error en la solicitud', 'error');
			console.log(error);
		});
	}

	const deleteCuenta=(id,cbu) => {
		const MySwal = withReactContent(Swal);
		MySwal.fire({
			title:'Seguro de eliminar la cuenta '+cbu+' ?',
			icon: 'question', text: 'No se podra volver atras',
			showCancelButton:true,confirmButtonText:'Si, eliminar',cancelButtonText:'Cancelar'
		}).then((result) => {
				if(result.isConfirmed){
					setId(id);
					const deleteurl=url.concat("/",id);
					console.log({deleteurl});
					axios.delete(deleteurl).then(() => { alert("data deleted")});
					
				}
				else{
					show_alert('La cuenta No fue eliminado','info')
				}
			});
	}

	return (
		<div className='App'>
			<div className='container-fluid'>
				<div className='row mt-3'>
					<div className='col-md-4 offset-md-4'>
						<div className='d-grid mx-auto'> 
							<button onClick ={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalCuentas'>
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
									<tr><th>#</th><th>CBU</th><th>TIPO</th><th>BANCO</th><th>MONEDA</th></tr>
								</thead>
								<tbody className='table-group-divider'>
									{cuentas.map( (cuenta,i)=>(

										<tr key={cuenta.id}> 
											<td>{(i+1)}</td>
											<td>{cuenta.cbu}</td>
											<td>{cuenta.type}</td>
											<td>{cuenta.bank}</td>
											<td>{cuenta.currency}</td>
											<td>
												<button onClick={()=> openModal(2,cuenta.id,cuenta.cbu,cuenta.type,cuenta.bank,cuenta.currency)}
												className= 'btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalCuentas'>
													<i className='fa-solid fa-edit'></i>
												</button>
												&nbsp;
												<button onClick={()=>deleteCuenta(cuenta.id,cuenta.cbu)} className='btn btn-danger'>
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

			<div id='modalCuentas' className='modal fade' aria-hidden='true'>
				<div className='modal-dialog'>
					<div className= 'modal-content'>
						<div className='modal-header'>
							<label className='h5'>{title}</label>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<input type='hidden' id='id'></input>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-hand-holding-dollar'></i></span>
								<input type='text' id='cbu' className='form-control' placeholder='cbu' value={cbu}
								onChange={(e)=> setCbu(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-credit-card'></i></span>
								<input type='text' id='type' className='form-control' placeholder='Tipo' value={type}
								onChange={(e)=> setType(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-bank'></i></span>
								<input type='text' id='bank' className='form-control' placeholder='bank' value={bank}
								onChange={(e)=> setBank(e.target.value)}></input>
							</div>
							<div className='input-group mb-3'>
								<span className='input-group-text'><i className= 'fa-solid fa-dollar-sign'></i></span>
								<input type='text' id='currency' className='form-control' placeholder='moneda' value={currency}
								onChange={(e)=> setCurrency(e.target.value)}></input>
							</div>
							<div className='d-grid col-6 mx-auto'></div>
							<button onClick={() => validar()} className='btn btn-success'>
								<i className='fa-solid fa-floppy-disk'></i> Guardar
							</button>
						</div>
						<div className='modal-footer'>
						<button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
					</div>
					</div>
ßß
				</div>
			</div>
		</div>
				
	)	
}

export default ShowCuenta
