import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const keyInputs = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '±', '0', '.',
                    '+', '-', '*', '/', '%', '='];

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
    constructor(props)
    {
        super(props);
        this.ref = React.createRef();

        this.displayInvalidClear = this.displayInvalidClear.bind(this);
    }

    displayInvalidClear()
    {
        this.ref.current.className = "display";
        console.log("remove");
    }

    render()
    {
        let myClass;

        if(this.props.invalid)
        {
            myClass = "display invalid";
            console.log("add");
            setTimeout(this.displayInvalidClear, 777);
        }
        else
        {
            myClass = "display";
        }

        return(
            <div className={myClass} ref={this.ref}>
                {this.props.text}
            </div>
        );
    }
}

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            expression: 'Calculator XD, press or type to begin',
            init: true,
            invalid: false
        };
        this.ref = React.createRef();

        this.compute = this.compute.bind(this);
        this.delete = this.delete.bind(this);
        this.clear = this.clear.bind(this);
        this.invalidClear = this.invalidClear.bind(this);
        this.onKeyDowned = this.onKeyDowned.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    componentDidMount()
    {
        this.ref.current.focus();
    }

    compute()
    {
        try
        {
            console.log(this.state.expression + " = " + eval(this.state.expression));
            return eval(this.state.expression);
        }
        catch(error)
        {
            if(error instanceof SyntaxError)
            {
                console.log("invalid");
                return "error";
            }
        }
    }

    delete()
    {
        this.setState(state => {
            if (state.init) {
                this.clear();
            }
            return { expression: state.expression.slice(0, -1) }
        });

        //console.log('del');
    }

    clear()
    {
        this.setState(state => {
            return { expression: '', init: false }
        });
    }

    invalidClear()
    {
        this.setState(state => {
            return { invalid: false }
        });
    }
    
    onKeyDowned(event)
    {
        let charcode = event.keyCode;
        //console.log(charcode);
        if(charcode === 13)
        {
            this.onButtonPressed('=');
        }
        else if (charcode === 8) {
            this.delete();
        }
        else if (charcode === 46)
        {
            this.clear();
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
        if(buttonValue === '=')
        {
            this.setState(state => {
                let result = this.compute();
                if(result === "error")
                {
                    setTimeout(this.invalidClear, 777);
                    return { invalid: true }
                }
                else
                {
                    return { expression: result }
                }
            });
        }
        else
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
                <Display text={this.state.expression} invalid={this.state.invalid}/>
                <Pad clickHandler={this.onButtonPressed} />
            </div>
        );
    }
}

ReactDOM.render(<Calculator/>, document.getElementById("root"));