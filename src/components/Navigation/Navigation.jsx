import './Navigation.css' 

import { Link } from 'react-router-dom';

import StyledLink from '../styled_components/StyledLink';
import EntelLogo from '../../assets/Logo.svg' ;

const Navigation = () =>{

    return(
        <header className='container-header'>
            <div className="container-logo">
                <Link to='/'>
                    <img src={EntelLogo} alt='Logo entel' className="logo"/>
                </Link>
            </div>
            <div className='container-nav'>
                <StyledLink to="/Form" $activeClassName="active">
                    Formulario
                </StyledLink>
                <div className="vertical-hr"></div>
                <StyledLink to="/FormList" $activeClassName="active">
                    Lista formulario
                </StyledLink>
            </div>
        </header>
    )
}
export default Navigation;