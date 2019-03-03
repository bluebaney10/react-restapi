import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Container,Form, Table,Button,Col } from 'react-bootstrap';
import './css/person.css'

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
      alert("Delete Success");
      this.getPerson()
    })
    
    this.trace('----------------------')
  }


  render() 
  {
     return (
      

      <Container>
      <h2 className="text-center">Person List</h2>
        <Form.Row>
           <Form.Group as={Col}>
              <Link to={`/create`} >
              <Button type="submit">Create New Person</Button>
              </Link>
          </Form.Group>
          </Form.Row>

                
        <Form.Row>
        <Form.Group as={Col} md="4" >
        <Form.Control type="text" placeholder="Search here..."  onChange={this.filterPerson} />
        </Form.Group>
        
        <Form.Group as={Col} md="3" >
        <Form.Control as="select"
        id="searchSelect"
        name="searchSelect"
        onChange={this.filterSelected} >
           <option value="id" >id </option>
          <option value="first_name" >name </option>
          <option value="last_name" >last name </option>
          <option value="email" >email</option>
          <option value="age" >age</option>
        ))}
        </Form.Control>
        </Form.Group>
        </Form.Row>

       
         
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-Mail</th>
            <th>Gender</th>
            <th>Age</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
            
            {this.state.persons.map((person) => {
            return (
            <tr key={person.id}>
            <td>{person.id}</td>
            <td>{person.first_name}</td>
            <td>{person.last_name}</td>
            <td>{person.email}</td>
            <td>{person.gender}</td>
            <td>{person.age}</td>
            <td><Link to={`/edit/${person.id}`}>
             <Button variant="warning">
              Edit 
              </Button>
              </Link>
              </td>

            <td>
            <Button onClick={this.delete.bind(this, person.id)} className="btn btn-danger">Delete</Button>
            </td>
            </tr>
            )
            
           
            }
          )} 
            {this.state.message ? <tr><td colSpan="8" >No search results.</td></tr> : '' }
          
          </Table>
        

       
    </Container>
    ) 
  }
  
}

export default PersonList