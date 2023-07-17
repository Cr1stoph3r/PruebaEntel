import { forwardRef, useEffect, useState } from 'react'; 
import styled from 'styled-components';
import PropTypes from 'prop-types'


const Label = styled.label`
  position: absolute;
  top: -7px;
  left: 14px;
  padding: 0 5px;
  background: #fff;
  color: ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 0.7)')};
  font-size: 12px;

  &::after {
    content: "${props => (props.required ? "  *" : "")}";
    color: #f00;
  }
`;

const StyledInput = styled.input`
  width: ${props => props.width || "100%"};
  height: Hug (56px);
  padding: 16px;
  border: 2px solid ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 0.6)')};
  border-radius: 8px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  -webkit-appearance: textfield; 
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 1)')};
  }

  &:focus + ${Label} {
    color: ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 1)')};
  }
  
`;

const ErrorMessage = styled.p`
  color: #f00;
  font-size: 15px;
  margin-top: 8px;
  margin-left: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 16px 0;
`;

const StyledInputForm = forwardRef(({ error, label, required, width, colSpan = 1, ...props }, ref)  => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);
  return (
    <InputWrapper style={{ gridColumn: `span ${colSpan}` }}>
      <StyledInput $hasError={hasError} ref={ref} width={width} {...props} />
      <strong><Label $hasError={hasError} required={required}>{label}</Label></strong>
      {hasError && <ErrorMessage>{error?.message}</ErrorMessage>}
    </InputWrapper>
  );
});

StyledInputForm.displayName = 'StyledInputForm'; 

StyledInputForm.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  width: PropTypes.string,
  colSpan: PropTypes.number,
  error: PropTypes.object
};

export default StyledInputForm;
