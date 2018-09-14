import React, { Component } from 'react';
 

class explainBindingsComponent extends Component{
    constructor(){
        super();
        this.onClickMe = this.onClickMe.bind(this);
    }
    onClickMe(){
        console.log(this);
    }

    render(){
        return(
            <button
            onClick ={this.onClickMe}
            type ='button'>Click me</button>
        )
    }
}

export default explainBindingsComponent;