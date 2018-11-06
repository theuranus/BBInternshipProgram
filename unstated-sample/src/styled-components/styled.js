import styled from 'styled-components'

export const Main = styled.div`
    padding: 20px;
    margin: 20px;
    border: 2px solid blue;
    background-color: ${props => props.bg || "black"};
    font-size: ${props => (props.size || 24) + 'px'};
    max-width: "500px";
`

export const Button = styled.button`
    font-size: 14px;
    color: skyblue;
    border: 1px solid skyblue;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 3px;
    cursor: pointer;
`

export const Input = styled.input `
    margin: 5px;
`