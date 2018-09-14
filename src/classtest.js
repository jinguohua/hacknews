import React, { Component } from 'react';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
    ];

    function isSearched(searchTerm) {
        return function(item){
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
 // const isSearched=searchTerm=>item=>item.title.toLowerCase().includes(searchTerm.toLowerCase());
class dev extends Component{
    // constructor(fir,sec){
    //     this.fir = fir;
    //     this.sec =sec;
    // }
    // getName() {
    //     return this.fir+" "+this.sec;
    // }
 
    constructor(props){
        super(props);

        this.state ={
            list,
            searchTerm:'',
        };

        this.onSerchChange = this.onSerchChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        //this.isSearched = this.isSearched.bind(this);
    }
    
    onSerchChange(event){
        this.setState({
            searchTerm:event.target.value
        })
    }
    onDismiss(id){
        const updatedList = this.state.list.filter(function isNotId(item){
          return item.objectID !==id
        })
        
        // function isNotId(item){
        //   return item.objectID !==id;
        // }
        // const updatedList = this.state.list.filter(isNotId);
    
        // const isNotId = item => item.objectID!==id;
        // const updatedList =this.state.list.filter(isNotId);
    
        this.setState({list:updatedList})
      }
    render(){
        const {searchTerm,list} = this.state;
        return (
            <div className='App'>
                <form>
                    <input type='text'
                    value ={searchTerm}
                    onChange = {this.onSerchChange}
                    />
                </form>
            {this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>
                <div key={item.objectID}>
                {item.objectID}<span> <a href ={item.url}> {item.title}</a></span>
                <span> {item.author}</span>
                <span> {item.num_comments}</span>
                <span> {item.points}</span>
                <span>
                    <button 
                    onClick={()=>this.onDismiss(item.objectID)}
                    type='button'
                    >
                    Dismiss
                    </button>
                </span>
                </div>
            
            )}
             
            </div>
        
        );
    }
}
export default dev;