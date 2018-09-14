import React, { Component } from 'react';
import './App.css';
import {sortBy} from 'lodash'
const Deafault_Query = 'redux';
const DEFAULT_HPP = '100';

const Path_Base = 'http://hn.algolia.com/api/v1';
const Path_Search = '/search';
const Param_Search ='query=';
const Param_Page = 'page='
const PARAM_HPP = 'hitsPerPage=';
// const url = '${Path_Base}${Path_Search}?${Param_Search}$(Deafault_Query)';
// console.log(url);
// function isSearched(searchTerm) {
//     return function(item){
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//     }
//   }
class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            results:null,
            searchKey:'',         //存储单个的result
            searchTerm:Deafault_Query,
            error:null,
            isLoading:false,
        };
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    onSearchChange(event){
        this.setState({
            searchTerm:event.target.value
        })
    }
    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
        }
    onSearchSubmit(event) {
        debugger
        const { searchTerm } = this.state;
        this.setState({searchKey:searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
            }
        event.preventDefault();
        }
    onDismiss(id){
        // const updatedList = this.state.list.filter(function isNotId(item){
        //   return item.objectID !==id
        // })
        
        // function isNotId(item){
        //   return item.objectID !==id;
        // }
        // const updatedList = this.state.list.filter(isNotId);
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID!==id;
        const updatedHits =hits.filter(isNotId);
    
        this.setState({
           // result: Object.assign({}, this.state.result, { hits: updatedHits })
           results:{
               ...results,
               [searchKey]:{
                   hits:updatedHits,page
               }
           }
        });
      }

    setSearchTopStories(result){
       
        const {hits,page} = result;
        const {searchKey,results} = this.state;
        //如果results不为空而且results【key】不为空，oldhits = results【key】，否则就等于[];
        const oldHits = results&&results[searchKey]
        ? results[searchKey].hits:[];

        //const oldHits = page !==0
        //?this.state.result.hits:[];
        const updatedHits = [
            ...oldHits,
            ...hits
            ];
        this.setState({
            results:{
                ...results,
                [searchKey]:{hits:updatedHits,page}
            },
            isLoading:false
           
             
        });
    }

    fetchSearchTopStories(searchTerm,page=0){
        debugger
        this.setState({ isLoading: true });
        fetch(`${Path_Base}${Path_Search}?${Param_Search}${searchTerm}&${Param_Page}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(response=>response.json())
        .then(result=>this.setSearchTopStories(result))
        .catch(e=> this.setState({error:e}));
    }
    // componentDidMount() - 它仅在组件挂载后执行一次。这是发起异步请求去 API 获取
    // 数据的绝佳时期。获取到的数据将被保存在内部组件的状态中然后在 render() 生命
    // 周期方法中展示出来。
    componentDidMount(){
        const {searchTerm} = this.state;
        this.setState({searchKey:searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    render(){
        const {searchTerm,results,searchKey,error,isLoading} = this.state;
        const page = (results && results[searchKey]&&results[searchKey].page)||0;
        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
            ) || [];
        return(
            <div className='page'>
                <div className = 'interactions'>
                    <Search value = {searchTerm}
                    onChange = {this.onSearchChange}
                    onSubmit={this.onSearchSubmit}
                    >
                    Search
                    </Search>
                </div>
                { error
                    ? <div className="interactions">
                    <p>Something went wrong.</p>
                    </div>
                    : <Table
                    list={list}
                    onDismiss={this.onDismiss}
                    />
                    }
                <div className="interactions">
                { isLoading
                    ? <Loading />
                    : <Button
                    onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                    More
                    </Button>
                    }
                    </div>
                
            </div> 
        );
    }
}
const Table = ({list,pattern,onDismiss})=>
<div className = 'table'>
      {list.map(item =>
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
    const{onClick,
        className,
        children,} = this.props;

    return(<button
    onClick = {onClick}
    className = {className}
    type = 'button'>
    {children}
    </button>
  );
  }
}
// const Search = ({value,onChange, onSubmit, children }) =>
//     <form onSubmit={onSubmit}>
//         {children} 
//         <input
//             type="text"
//             value={value}
//             onChange={onChange}
//         />
//         <button type="submit">
//         {children}
//         </button>
//     </form>
class Search extends Component{
    componentDidMount() {
        if(this.input) {
        this.input.focus();
        }
        }
    render(){
        const {value,onChange,onSubmit,children} = this.props;
        return(
            <form onSubmit={onSubmit}>
                <input
                type="text"
                value={value}
                onChange={onChange}
                ref={(node) => { this.input = node; }}
                />
                <button type="submit">
                {children}
                </button>
            </form>

        );
    }
}
const Loading = () =>
<div>Loading ... </div>

const withLoading = (Component) =>(props)=>
props.isLoading?<Loading/>:<Component{...props}/>

export default App;
