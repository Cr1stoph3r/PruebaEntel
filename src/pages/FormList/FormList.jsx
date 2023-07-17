import './FormList.css'
import { useState } from 'react'
import DeleteIcon from '../../assets/DeleteIcon.svg'
import {StyledTable, THead, TR, TH, TBody ,TD} from '../../components/styled_components/StyledTable'
import StyledSnackbar from '../../components/styled_components/StyledSnackBar';
import Pagination from '../../components/Pagination/Pagination'

const FormList = () =>{
    const [snackbar, setSnackbar] = useState({ message: '', status: '' });

    const showSnackbar = (message, status) => {
      setSnackbar({ message, status });

      setTimeout(() => {
        setSnackbar({ message: '', status: '' });
      }, 3000);
    };

    const thead = ['Nombre',
    'Rut vendedor', 'Patente vehiculo', 'Marca vehiculo',
    'Modelo vehiculo', 'Color vehiculo', 'Eliminar'
    ];

    const [formList, setFormList] = useState(JSON.parse(localStorage.getItem('form_list')));
    let vehicle_brands = localStorage.getItem('vehicle_brands');
    let vehicle_models = localStorage.getItem('vehicle_models');
    vehicle_brands = JSON.parse(vehicle_brands);
    vehicle_models = JSON.parse(vehicle_models);

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = formList?.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentItems = formList?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleDelete = (indexToDelete, patent) => {
        try{
            const updatedFormList = formList?.filter((item, index) => index !== indexToDelete);
            localStorage.setItem('form_list', JSON.stringify(updatedFormList));
            setFormList(updatedFormList);
            showSnackbar(` Vehiculo con patente ${patent.toUpperCase()} eliminado con exito!` , 'success');
        }catch{
            showSnackbar(`Error al eliminar vehiculo con patente ${patent.toUpperCase()} `, 'error');
        }
    }

    return(
        <div className='container-list'>
            {snackbar?.message && <StyledSnackbar message={snackbar?.message} status={snackbar?.status} />}
            <div className='list'>
                <div className="header-list">
                    <h2>Lista formulario</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the bed industry&apos;s standard dummy text ever since.</p>
                </div>
                <div className="table-list">
                <StyledTable>
                    <THead>
                        <TR>
                            {thead?.length > 0 && thead?.map((x, i) => x === 'Nombre' ? <TH key={i} className='nombre'>{x}</TH> 
                            : x === "Rut vendedor" ? <TH key={i} className='rut'>{x}</TH> :<TH key={i}>{x}</TH>)
                            }
                        </TR>
                    </THead>
                    <TBody>
                        {currentItems?.length > 0 && currentItems?.map((x, i) => {
                            const brand = vehicle_brands.find(brand => brand?.id === x?.vehicle_brands);
                            const model = vehicle_models.find(model => model?.id === x?.vehicle_models);
                            return(
                                <TR key={i}>
                                    <TD>{x?.name}</TD>
                                    <TD>{x?.rut}</TD>
                                    <TD>{x?.patent.toUpperCase()}</TD>
                                    <TD>{brand?.brand || 'Marca no encontrada'}</TD>
                                    <TD>{model?.model || 'Modelo no encontrado'}</TD>
                                    <TD>{x?.vehicle_color || 'Color no encontrado'}</TD>
                                    <TD><img src={DeleteIcon} alt='Delete icon' onClick={() => handleDelete(i, x?.patent)}></img></TD>
                                </TR>
                            )
                        })
                        }
                    </TBody>
                    <Pagination 
                        thead={thead} 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        totalItems={totalItems} 
                        ITEMS_PER_PAGE={ITEMS_PER_PAGE} 
                        onChangePage={setCurrentPage}
                    />
                </StyledTable>     
                </div>
            </div>
        </div>
    )
}

export default FormList