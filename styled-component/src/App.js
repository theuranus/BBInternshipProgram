import React from 'react'

import Button, {BlueButton, CustomForm} from './StyledComponent'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button colored>This is Sample Button</Button>
                <Button>This is Sample Button</Button>
                <BlueButton>Blue Button extends Button</BlueButton>
                <br/>
                <CustomForm>
                    <h2>This is header</h2>
                    <p>Lorem ipsums Lorem ipsums Lorem ipsums Lorem ipsums Lorem  </p>
                    <BlueButton onClick={() => {alert(1)}}>Ahihi</BlueButton>
                </CustomForm>
            </div>
        )
    }
}