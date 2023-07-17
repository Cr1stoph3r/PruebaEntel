import styled from 'styled-components';

export const StyledTable = styled.table`
width: 100%
border-collapse: colapse;
border-spacing: 0;
`;

export const THead = styled.thead`

`;

export const TFoot = styled.tfoot`
width:100%;
`;

export const TBody = styled.tbody`

`;

export const TR = styled.tr`
`;

export const TH = styled.th`
    color: rgba(25, 25, 25, 0.8);
    font-size: 18px;
    justify-content: space-between;
    padding: 20px;
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    &.nombre{
        width: 35%;
    }
    &.rut{
      width:20%
    }
`;

export const TD = styled.td`
    white-space: normal;
    text-align: center;
    font-size: 16px;
    padding: 30px;
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    img{
      cursor: pointer;
    }
`;