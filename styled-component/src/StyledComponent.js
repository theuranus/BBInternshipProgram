import styled from 'styled-components'

const Button = styled.button`
    font-size: 1em;
    background-color: ${props => props.colored ? "palevioletred":"white"};
    color: ${props => props.colored ? "white" : "palevioletred"};
    padding: 0.5em;
    border: palevioletred 2px solid;
    border-radius: 3px;
    margin: 2em;
`

export const BlueButton = styled(Button)`
    background-color: lightblue;
    color: white;
    border: lightblue 2px solid; 
`

export const CustomForm = styled.div`
    margin: 0 auto;
    width: 300px;
    background-color: #664296;
    color: white;
    box-shadow: 5px 10px 8px #888888;
    padding: 15px;
    display:flex;
    align-items: flex-start;
    flex-direction: column;
    > h2 {
        color: yellow;
    }
    >p {
        font-size: 18px;   
    }
    > button {
        margin: 10px 20px;
        align-self: flex-end;
    }
`

export default Button
