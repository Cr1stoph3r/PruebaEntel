import './Pagination.css'
import PropTypes from 'prop-types';
import {TFoot, TR, TH} from '../styled_components/StyledTable';
import { ArrowButton, PageButton } from '../styled_components/StyledButtonPagination';

const Pagination = ({thead = [], currentPage, totalPages, totalItems, ITEMS_PER_PAGE, onChangePage}) =>{
    const firstItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const lastItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
    return(
        <TFoot>
            <TR>
                <TH className='Footer' colSpan={`${thead?.length}`} style={{borderBottom: '0px'}}>
                    <div style={{
                            display: 'grid',
                            gridTemplateColumns: '8fr 1fr',
                            width: '100%'
                    }}>
                        <div className='Footer-text'>
                            {totalItems > 0 ? (
                                <p>Mostrando registros del {firstItem} al {lastItem} de un total de {totalItems} registros.</p>
                                ) :
                                (<p>Sin registros</p>)
                            }
                        </div>
                        <div className='pagination'>
                            {totalPages > 1 && (
                                <>
                                    <ArrowButton onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}>
                                        {"<"}
                                    </ArrowButton>
                                    <div className='pagination-numbers'>
                                        {Array.from({ length: totalPages }, (_, i) => i+1 !== currentPage ? (
                                            <PageButton key={i} onClick={() => onChangePage(i + 1)}>
                                                {i + 1}
                                            </PageButton>
                                        ) : (
                                            <PageButton key={i} className='active' onClick={() => onChangePage(i + 1)}>
                                                {i + 1}
                                            </PageButton>
                                        ))}
                                    </div>
                                    <ArrowButton onClick={() => currentPage < totalPages && onChangePage(currentPage + 1)}>
                                        {">"}
                                    </ArrowButton>
                                </>
                            )
                            }
                        </div>   
                    </div>
                </TH>
            </TR>
        </TFoot>
    )
}

Pagination.propTypes = {
    thead: PropTypes.array,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    ITEMS_PER_PAGE: PropTypes.number,
    onChangePage: PropTypes.func
}

export default Pagination;