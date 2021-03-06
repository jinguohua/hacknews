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
            <div className='page'>
                {/* <form>
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
            
            )} */}
            <div className = 'interactions'>
             <Search value = {searchTerm}
              onChange = {this.onSerchChange}
             >
             Search
             </Search>
             </div>
             <Table list = {list}
              pattern = {searchTerm}
              onDismiss = {this.onDismiss}
             />
            </div>
        
        );
    }
}

// class Search extends Component{
//   render(){
//     const {value,onChange,children} = this.props;
//     return(
//       <form>
//         {children}:<input
//          type='text'
//          value = {value}
//          onChange = {onChange}/>
//       </form>
//     );
//   }

// }
//无状态的组件，也就是说不需要在组件中使用this,所有的这类组件都可以写成函数类无状态组件
//类似于上面的search组件
// function Search(props){             //这里的props属性是上述组件中所用到的属性
//     const { value, onChange, children } = props;
//     return (
//         <form>
//             {children} 
//             <input
//             type="text"
//             value={value}
//             onChange={onChange}
//             />
//         </form>
//     );
// }
// //进一步转换
// function Search({ value, onChange, children }) {
//     return (
//         <form>
//             {children} 
//             <input
//                 type="text"
//                 value={value}
//                 onChange={onChange}
//             />
//         </form>
//     );
//     }
// => 函数
const Search = ({ value, onChange, children }) =>
    <form>
        {children} 
        <input
            type="text"
            value={value}
            onChange={onChange}
        />
    </form>

// class Table extends Component {
//     render() {
//       const { list, pattern, onDismiss } = this.props;
//       return (
//         <div>
//         {list.filter(isSearched(pattern)).map(item =>
//           <div key={item.objectID}>
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//             <Button onClick={() => onDismiss(item.objectID)}>
//               Dismiss
//             </Button>
//           </span>
//         </div>
//     )}
//     </div>
//     );
//     }
//   }

  //将table组件转换为=>函数
  const Table = ({list,pattern,onDismiss})=>
  <div className = 'table'>
        {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>
                <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '10%' }}>{item.num_comments}</span>
            <span style={{ width: '10%' }}>{item.points}</span>
            <span style={{ width: '10%' }}>
                <Button
                    onClick={() => onDismiss(item.objectID)}
                    className="button-inline"
                    >
                    Dismiss
                </Button>
            </span>
        </div>
)}
  </div> 
  class Button extends Component{
    render(){
      const{onClick,className,children,} = this.props;

      return(<button
      onClick = {onClick}
      className = {className}
      type = 'button'>
      {children}
      </button>
    );
    }
  }
export default dev;