import React,{Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class CreatePerson extends Component{

    constructor() {
        super();
       
        this.state = {
            first_name: '',
            last_name: '',
            email:'',
            gender:'',
            age: ''
        }
        this.create = this.create.bind(this);
    }


    create (e)
    {
     console.log('create')
      e.preventDefault();
      const person = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        gender: this.state.gender,
        age: this.state.age,
        }
      
        
      axios.post('https://py-api.herokuapp.com/users', person)
      .then(res =>{ 
       console.log(res.data)
        this.getPerson()
        })
        
     }

     getPerson(){
  
        axios.get(`https://py-api.herokuapp.com/users`)
        .then(res=>{
          const persons=res.data
          this.setState({persons})
          this.setState({personInit:persons})
        })
     }

     
  onChange = (e) => {
    
    const state = this.state
     state[e.target.name] = e.target.value;
     this.setState(state);
   }
 
      
  
   

    render(){
      
        return(
            <React.Fragment>
            <h1>Person Create</h1>
            <h4><Link to="/" className="btn btn-primary">Person List</Link></h4>
           
            <form onSubmit={this.create}>
            <div className="form-group">
              <label htmlFor="title">First Name:</label>
              <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="first name" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Last Name:</label>
              <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="last name" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Email:</label>
              <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="email" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Gender:</label>
              <input type="text" className="form-control" name="gender" value={this.state.gender} onChange={this.onChange} placeholder="gender" />
            </div>

            <div className="form-group">
              <label htmlFor="title">Age:</label>
              <input type="text" className="form-control" name="age" value={this.state.age} onChange={this.onChange} placeholder="age" />
            </div>

            <button className="btn btn-success center-block">Create</button>
       </form>
       </React.Fragment>
        )
    }

}
export default CreatePerson
