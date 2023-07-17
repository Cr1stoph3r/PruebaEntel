import styled from 'styled-components';

export const ArrowButton = styled.button`
  border: none;
  background: none;
  font-size: 2rem;
  color: rgba(0, 46, 255, 0.6);
  cursor: pointer;
`;

export const PageButton = styled.button`
  border-color: rgba(204, 204, 204, 1);
  background: none;
  &.${props => props.$activeClassName} {
    text-decoration: underline;
    background-color: transparent;
    font-weight: bold;
  }
  border-color: ${(props) => props.className === 'active' ? 'rgba(0, 46, 255, 1)' : 'rgba(0, 46, 255, 0.4)'} ;
  color: ${(props) => props.className === 'active' ? 'rgba(0, 46, 255, 1)' : 'rgba(0, 46, 255, 0.4)'} ;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.5rem;
  padding: 6px;
  margin-right: -8px;
  &:active {
    border-color: rgba(0, 46, 255, 0.6);
    color: rgba(0, 46, 255, 0.6);
  }
`;