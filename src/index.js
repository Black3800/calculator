import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const keyInputs = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '±', '0', '.',
                    '+', '-', '*', '/', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', '='];

class Buttons extends React.Component
{
    render()
    {
        return(
            <div
                className={this.props.width === "span" ? "button span" : "button"}
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
            <div className="numpad">
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
            <div className="operators">
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
            <div className="pad noselect">
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
            <div className="display">{this.props.text}</div>
        );
    }
}

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { expression: 'Welcome, 001!', init: true };
        this.ref = React.createRef();

        this.delete = this.delete.bind(this);
        this.onKeyDowned = this.onKeyDowned.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    componentDidMount()
    {
        this.ref.current.focus();
    }

    delete()
    {
        this.setState(state => {
            if (state.init) {
                return { expression: '', init: false }
            }
            return { expression: state.expression.slice(0, -1) }
        });

        console.log('del');
    }

    onKeyDowned(event)
    {
        let charcode = event.keyCode;
        //console.log(charcode);
        if(charcode === 13)
        {
            this.onButtonPressed('=');
        }
        else if (charcode === 8 || charcode === 46) {
            this.delete();
        }
    }

    onKeyPressed(event)
    {
        let char = String.fromCharCode((typeof event.which == "number") ? event.which : event.keyCode);
        if(keyInputs.indexOf(char) >= 0)
        {
            this.onButtonPressed(char)
        }
    }

    onButtonPressed(buttonValue)
    {
        this.setState(state => {
            if(state.init)
            {
                return { expression: buttonValue, init: false }
            }
            return {expression: state.expression + buttonValue}
        });
        //console.log(buttonValue);
    }

    render()
    {
        return(
            <div
              className="calculator"
              onKeyPress={this.onKeyPressed}
              onKeyDown={this.onKeyDowned}
              tabIndex="0"
              ref={this.ref}>
                <Display text={this.state.expression}/>
                <Pad clickHandler={this.onButtonPressed}/>
            </div>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById("root"));