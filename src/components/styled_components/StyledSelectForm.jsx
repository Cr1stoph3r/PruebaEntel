import {useState, useCallback, forwardRef, useEffect} from 'react';
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

const StyledSelect = styled.select`
  width: ${props => props.width || "100%"};
  height: 56px;
  padding: 0 10px;
  border: 2px solid ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 0.6)')};
  border-radius: 8px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white; 
  &:focus {
    outline: none;
    border-color: ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 1)')};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 16px 0;
`;

const Arrow = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  border: solid ${props => (props.$hasError ? '#ff7f7f' : 'rgba(0, 46, 255, 0.4)')};
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  transition: 0.2s;
  &.up {
    transform: rotate(-135deg);
  }
`;

const ErrorMessage = styled.p`
  color: #f00;
  font-size: 15px;
  margin-top: 8px;
  margin-left: 8px;
`;


const StyledSelectForm = forwardRef(({ error, label, required, width, colSpan = 1, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <InputWrapper style={{ gridColumn: `span ${colSpan}` }}>
      <StyledSelect $hasError={hasError} ref={ref} width={width} {...props} onClick={toggleOpen} onBlur={close}>
        {children}
      </StyledSelect>
      <Arrow $hasError={hasError} className={isOpen ? 'up' : ''} />
      <strong><Label $hasError={hasError} required={required}>{label}</Label></strong>
      {hasError && <ErrorMessage>{error?.message}</ErrorMessage>}
    </InputWrapper>
  );
});

StyledSelectForm.displayName = 'StyledSelectForm';

StyledSelectForm.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    width: PropTypes.string,
    colSpan: PropTypes.number,
    children: PropTypes.array,
    error: PropTypes.object
};

export default StyledSelectForm
