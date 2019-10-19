import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Buttons extends React.Component
{
    render()
    {
        return(
            <div
                class={this.props.width === "span" ? "button span" : "button"}
                onClick={this.props.clickHandler.bind(this, this.props.text)}>
                    {this.props.text}
            </div>
        );
    }
}

class Numpad extends React.Component
{
    render()
    {
        return(
            <div class="numpad">
                <Buttons text="1" clickHandler={this.props.clickHandler}/>
                <Buttons text="2" clickHandler={this.props.clickHandler} />
                <Buttons text="3" clickHandler={this.props.clickHandler} />
                <Buttons text="4" clickHandler={this.props.clickHandler} />
                <Buttons text="5" clickHandler={this.props.clickHandler} />
                <Buttons text="6" clickHandler={this.props.clickHandler} />
                <Buttons text="7" clickHandler={this.props.clickHandler} />
                <Buttons text="8" clickHandler={this.props.clickHandler} />
                <Buttons text="9" clickHandler={this.props.clickHandler} />
                <Buttons text="±" clickHandler={this.props.clickHandler} />
                <Buttons text="0" clickHandler={this.props.clickHandler} />
                <Buttons text="." clickHandler={this.props.clickHandler} />
            </div>
        );
    }
}

class Operators extends React.Component
{
    render()
    {
        return (
            <div class="operators">
                <Buttons text="+" clickHandler={this.props.clickHandler} />
                <Buttons text="-" clickHandler={this.props.clickHandler} />
                <Buttons text="*" clickHandler={this.props.clickHandler} />
                <Buttons text="/" clickHandler={this.props.clickHandler} />
                <Buttons text="%" clickHandler={this.props.clickHandler} />
                <Buttons text="a" clickHandler={this.props.clickHandler} />
                <Buttons text="b" clickHandler={this.props.clickHandler} />
                <Buttons text="c" clickHandler={this.props.clickHandler} />
                <Buttons text="d" clickHandler={this.props.clickHandler} />
                <Buttons text="e" clickHandler={this.props.clickHandler} />
                <Buttons text="f" clickHandler={this.props.clickHandler} />
                <Buttons text="g" clickHandler={this.props.clickHandler} />
                <Buttons text="h" clickHandler={this.props.clickHandler} />
                <Buttons text="i" clickHandler={this.props.clickHandler} />
                <Buttons text="=" clickHandler={this.props.clickHandler} width="span" />
            </div>
        );
    }
}

class Pad extends React.Component
{
    render()
    {
        return (
            <div class="pad noselect">
                <Numpad clickHandler={this.props.clickHandler} />
                <Operators clickHandler={this.props.clickHandler} />
            </div>
        );
    }
}

class Display extends React.Component
{
    render()
    {
        return(
            <div class="display">{this.props.text}</div>
        );
    }
}

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { expression: 'Welcome, 001!' };
    }

    onButtonPressed(buttonValue)
    {
        this.setState(state => {
            return {expression: state.expression + buttonValue}
        });
        
        console.log(buttonValue);
    }

    render()
    {
        return(
            <div class="calculator">
                <Display text={this.state.expression}/>
                <Pad clickHandler={this.onButtonPressed}/>
            </div>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById("root"));