import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class PersonList extends React.Component 
{
  constructor()
  {
    super()
    this.state = {
      personInit: [],
      persons: [],
      selectedValue: 'id',
      personText: '',
      message: false,
    }

    this.getPerson= this.getPerson.bind(this);
    this.updatePersonText = this.updatePersonText.bind(this);
    this.filterPerson = this.filterPerson.bind(this);
    this.filterSelected= this.filterSelected.bind(this);
    this.delete= this.delete.bind(this);
    this.trace= this.trace.bind(this);
    
  }
 
  trace(str){
    console.log(str);
  }


  getPerson(){
   axios.get(`https://py-api.herokuapp.com/users`)
   .then(res=>{
     const persons=res.data
     this.setState({persons})
     this.setState({personInit:persons})
   })
}
 
  componentDidMount(){
       this.getPerson()
   }

 
  updatePersonText (e){
    this.setState({
      personText: e.target.value
    });
  }
  
  
  filterPerson(e){   
    
    var updatedList = this.state.personInit;
    updatedList = updatedList.filter((item =>{
    
      return item[this.state.selectedValue].toString().toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    }) )

       this.setState({ 
        persons: updatedList,
    });
    if (updatedList === 0 ) {
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
    this.trace('filterSelected:'+e.target.value)
    let selected=e.target.value
    this.setState({ selectedValue:selected });
  }


  delete(id){
    this.trace('delete:'+id)
    axios.delete(`https://py-api.herokuapp.com/users/delete/`+id)
    .then(res => {
      console.log(res.data)
      this.getPerson()
    })
    
    this.trace('----------------------')
  }


  render() 
  {
     return (
      <div>
      <div className="container top">
        <div className="row">
          <div className="col-lg-12">
             <h2 className="text-center">Person List</h2>
          </div>
        </div>
      </div>

      <Link to={`/create`} className="btn btn-success">
             <button className="btn btn-danger">
              Create 
              </button>
              </Link>


         <div className="container wb">
        <div className="row">
        <br/>
        <input type="text"
               className="center-block"
               placeholder="Filter here..."
               onChange={this.filterPerson}
               />
        <select
        id="searchSelect"
        name="searchSelect"
        onChange={this.filterSelected} >
           <option value="id" >id </option>
          <option value="first_name" >name </option>
          <option value="last_name" >last name </option>
          <option value="email" >email</option>
          <option value="age" >age</option>
        ))}
      </select>
         
          <ul>
            
            {this.state.persons.map((person) => {

             return (
             <li  key={person.id}>{person.id} {person.first_name} {person.last_name}  {person.email}  {person.gender} {person.age}
             <Link to={`/edit/${person.id}`} className="btn btn-success">
             <button className="btn btn-danger">
              Edit 
              </button>
              </Link>
             <button onClick={this.delete.bind(this, person.id)} className="btn btn-danger">Delete</button>
             </li>
             )
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