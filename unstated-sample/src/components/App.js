import React from 'react';
import {Button, Main, Input} from '../styled-components/styled';
import {Subscribe} from 'unstated'
import AppContainer from '../containers/AppContainer'

export default class App extends React.Component {
    render() {
        return(
            <Subscribe to={[AppContainer]}>
                { container => {
                    return <div>
                        <Main bg={container.state.color} size={container.state.size}>
                            {container.state.text}
                        </Main>
                        <Input value={container.state.text} onChange={(e) => container.setState({ text : e.target.value})}/>
                        {/* <Button>Pick Color</Button> */}
                        <Input value={container.state.size} onChange={(e) => container.setState({size: e.target.value})}/>
                        <Input type="color" value={container.state.color} onChange={(e) => container.setState({color: e.target.value})}/>
                    </div>
                }}
            </Subscribe>
        )
    }
}
