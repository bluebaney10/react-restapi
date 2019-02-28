import React from 'react'
import axios from 'axios'

class PersonList extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      personInit: [],
      persons: [],
      //selectedValue: 'age',
      selectedValue: 'first_name',
      todoText: '',
      message: false
  };
    this.updateTodoText = this.updateTodoText.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.filterTodo = this.filterTodo.bind(this);
    this.filterSelected= this.filterSelected.bind(this);
  }
 
  componentDidMount(){
    console.log('componentDidMount');
    axios.get(`https://py-api.herokuapp.com/users`)
    .then(res=>{
      const persons=res.data
      this.setState({persons})
      this.setState({personInit:persons})
    })
    
  }
  
  updateTodoText (e)
  {
    this.setState({
      todoText: e.target.value
    });
  }
  
  createTodo (e)
  {
    e.preventDefault();
    this.setState({ 
      persons: [...this.state.persons, this.state.todoText],
      todoText: '',
    });
  }
  
  filterTodo(e)
  {   
    
    console.log('currentValue:'+this.state.selectedValue);
    var updatedList = this.state.personInit;
    updatedList = updatedList.filter((item =>{
      return item[this.state.selectedValue].toLowerCase().search(
       // return item.first_name.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    }) );
       this.setState({ 
      persons: updatedList,
    });
    if (updatedList == 0 ) {
      this.setState({ 
      message: true,
    });
    } else {
        this.setState({ 
        message: false,
        });
    }
    
  }
  
  filterSelected(e){
    console.log('filterSelected:'+e.target.value);

    let selected=e.target.value
    this.setState({ selectedValue:selected });
   //  console.log('selectedValue:'+this.state.selectedValue);
     console.log('==============');
    
   
  }

  render() 
  {
    return (
      <div>
      <div className="container top">
        <div className="row">
          <div className="col-lg-12">
             <h2 className="text-center">Shopping List</h2>
          </div>
        </div>
      </div>
         <div className="container wb">
        <div className="row">
          <form onSubmit={this.createTodo}>
          <div className="col-lg-12 input-group">
             <input type="text"
               className="center-block"
               placeholder="Insert here..."
               value={this.state.todoText}
               onChange={this.updateTodoText}
               />
            <button className="btn btn-success center-block">Create</button>
          </div>
        </form>
        
        <select
        id="searchSelect"
        name="searchSelect"
        onChange={this.filterSelected} >
       
          <option value="first_name" >name </option>
          <option value="last_name" >last name </option>
          <option value="email" >email</option>
          <option value="gender" >gender</option>
          <option value="age" >age</option>
        ))}
      </select>
        <input type="text"
               className="center-block"
               placeholder="Filter here..."
               onChange={this.filterTodo}
               />
          <ul>
            {this.state.persons.map((person) => 
            {
             return (<li key={person.id}>{person.first_name} {person.last_name}  {person.email}  {person.gender} {person.age}</li>);
            }
       )} 
            {this.state.message ? <li>No search results.</li> : '' }
          </ul>
        </div>
          
      </div>
        </div>
    );  
  }
  
}


export default PersonList
