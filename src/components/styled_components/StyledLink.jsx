import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  font-size: 18px;
  font-weight: 500;
  margin-top: -10px;
  letter-spacing: 0em;
  text-align: left;
  color: #5c7cfc;
  border-radius: 24px;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  &.${props => props.$activeClassName} {
    background-color: rgba(243, 245, 255, 1);
  }
  &:hover{
    background-color: rgba(243, 245, 255, 1);
    transition: background-color 0.7s ease;
  }
  @media (max-width: 600px){
    font-family: Inter;
    font-size: 16px;
    color: rgba(12, 12, 12, 1);
    font-weight: 100;
    &.${props => props.$activeClassName} {
      text-decoration: underline;
      background-color: transparent;
      font-weight: bold;
    }
    &:hover{
      text-decoration: underline;
      background-color: transparent;
      font-weight: bold;
      transition: background-color 0.7s ease;
    }
  }
`;

export default StyledLink;
