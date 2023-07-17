import styled, { css } from 'styled-components';
import PropTypes from 'prop-types'


const SnackbarWrapper = styled.div`
  position: fixed;
  width: 300px;
  right: 20px;
  top: 20px;
  background-color: white;
  font-size: ${props => props.$status === 'success' ? '#4caf50' : '#f44336'};
  border-radius: 4px;
  border: 2px solid ${props => (props.$status === 'success' ? '#4caf50' : '#f00')};
  padding: 16px;
  z-index: 9999;
  display: flex;
  align-items: center;

  ${props => props.$status === 'success' && css`
    color: '#4caf50';
    &:before {
      content: '✓';
      margin-right: 10px;
      border-radius: 50%;
      background-color: rgba(76, 175, 80, 0.3);
      padding: 4px;
    }
  `}

  ${props => props.$status === 'error' && css`
    color: red;
    &:before {
      content: '✖';
      margin-right: 10px;
      border-radius: 50%;
      background-color: rgba(255, 0, 0, 0.3);
      padding: 4px;
    }
  `}
`;

const StyledSnackbar = ({ message, status }) => {
  return (
    <SnackbarWrapper $status={status}>
      {message}
    </SnackbarWrapper>
  );
};

StyledSnackbar.propTypes = {
    message: PropTypes.string,
    status: PropTypes.string
}

export default StyledSnackbar;
