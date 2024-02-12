import Swal from 'sweetalert2';
import whithReactContent from 'sweetalert2-react-content';


export function show_alert(mensaje, icono,foco=''){
	onfocus(foco);
	const MySwal = whithReactContent(Swal);
	MySwal.fire({
		title:mensaje,
		icon:icono
	});
}


function onfocus(foco){
	if(foco!== ''){
		document.getElementById(foco).focus();
	}
} 
