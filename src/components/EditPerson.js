import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

class EditPerson extends Component{
   

    constructor(props) {
     super(props)
     this.state = {
        persons: [],
        id:'',
        first_name: '',
        last_name: '',
        email:'',
        gender:'',
        age: '',
      }
    
      this.trace= this.trace.bind(this);
    }
    
    trace(str){
        console.log(str);
      
        }
    componentDidMount() {
        this.trace("componentDidMount")
        const userId = this.props.match.params.id;
        this.trace("id:"+userId)
        this.getPerson(userId)
    }

    getPerson(userId){
       
        this.trace('get person') 
        axios.get(`https://py-api.herokuapp.com/users/`+userId)
       .then(res=>{
         const persons=res.data
         this.trace('persons:'+persons)
         this.trace('persons:'+persons.first_name)
         this.trace('persons:'+persons[0])
         this.trace('persons:'+persons[0].first_name)

         this.setState({
            id:persons[0].id,
            first_name:persons[0].first_name,
            last_name: persons[0].last_name,
            email:persons[0].email,
            gender:persons[0].gender,
            age: persons[0].age
        })
       
         
       })
    }


    onChange = (e) => {
      
        const state = this.state
        state[e.target.name] = e.target.value;
        this.trace('onChange:'+state[e.target.name])
        this.trace('onChange:'+e.target.value)
        this.trace('----------onChange-----------')
        this.setState({board:state});
       
      }
    
      onSubmit = (e) => {
        this.trace('onSubmit')

        e.preventDefault();
        const person = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            gender: this.state.gender,
            age: this.state.age
        }
        axios.put(`https://py-api.herokuapp.com/users/update/`+this.state.id, person)
        .then(res => {
              console.log(res.data);
              alert("Edit Success");
        } )
     
      }

    render(){

      
        return(
          <Container>
             <h1>Person Edit</h1>
             <h4><Link to="/" className="btn btn-primary">Person List</Link></h4>
            
            <form onSubmit={this.onSubmit}>
            
              <div className="form-group">
                <label htmlFor="title">FirstName</label>
                <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="FirstName" />
              </div>

              <div className="form-group">
                <label htmlFor="title">LastName</label>
                <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="LastName" />
              </div>

              <div className="form-group">
                <label htmlFor="title">E-Mail</label>
                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-Mail" />
              </div>

              <div className="form-group">
                <label htmlFor="title">Gender</label>
                <input type="text" className="form-control" name="gender" value={this.state.gender} onChange={this.onChange} placeholder="Gender" />
              </div>

              <div className="form-group">
                <label htmlFor="title">Age</label>
                <input type="text" className="form-control" name="age" value={this.state.age} onChange={this.onChange} placeholder="Age" />
              </div>
            
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
            </Container>
            )
    }
}
export default EditPerson