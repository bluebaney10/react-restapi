import React,{Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class CreatePerson extends Component{

    constructor() {
        super();
       
        this.state = {
           
            fields: {first_name:'',last_name:'',email:'',gender:'',age:''},
            errors: {}
        }

        
        this.create = this.create.bind(this)
        this.createSelectItems = this.createSelectItems.bind(this)
        this.onDropdownSelected = this.onDropdownSelected.bind(this)
        this.traceObj = this.traceObj.bind(this)
  }
    

    traceObj(obj){
      console.log("obj:"+JSON.stringify(obj));
   }

     

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  createSelectItems() {
    let items = [];         

    items.push(<option key={0} value={0}>{"--select age--"}</option>);   
    for (let i = 1; i <= 120; i++) {             
         items.push(<option key={i} value={i}>{i}</option>);   
      
    }
    return items;
}  

onDropdownSelected(e) {
   console.log("THE VAL", e.target.value);
   //here you will see the current selected value of the select input
}

 onChange = (e) => {
    
    const state = this.state
     state[e.target.name] = e.target.value;
     this.setState(state);
   }

   handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    console.log("obj:"+JSON.stringify(fields));

    //first_name and last_name
    if(fields["first_name"]==='' || fields["last_name"]==='' ){
      formIsValid = false;
      console.log('case empty!!')
      if(fields["first_name"]===''){
       errors["first_name"] = "Cannot be empty!!!";
      }
      if(fields["last_name"]===''){
        errors["last_name"] = "Cannot be empty!!!";
      }
    }

    if(fields["first_name"] !==''||fields["last_name"] !==''){
      if(!fields["first_name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["first_name"] = "Only letters";
      }  
      else if(!fields["last_name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["last_name"] = "Only letters";
      }else{}          	
    }

     //Email
     if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //gender
    if(!fields["gender"]){
      formIsValid = false;
      errors["gender"] = "Should select gender";
    }

     //age
     if(!fields["age"]){
      formIsValid = false;
      errors["age"] = "Should select age";
    }
    this.setState({errors: errors});
    return formIsValid;
  }
 
      
   contactSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      alert("Form submitted");
      this.create ()
    }else{
      alert("Form has errors.")
    }
   
  }

  create (){
    this.traceObj(this.state.fields)
    let fields = this.state.fields;
   
    const person = {
       first_name:fields['first_name'],
       last_name: fields['last_name'],
       email: fields['email'],
       gender:fields['gender'],
       age:fields['age'],
      }
     
       
     axios.post('https://py-api.herokuapp.com/users', person)
     .then(res =>{ 
      console.log(res.data)
      })
      this.traceObj(this.state.fields)
       this.setState({
         fields: {first_name:'',last_name:'',email:'',gender:'',age:''}
         
       });
    }

 
    render(){
      
        return(
            <React.Fragment>
            <h1>Person Create</h1>
            <h4><Link to="/" className="btn btn-primary">Person List</Link></h4>
           
            <form onSubmit= {this.contactSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="title">First Name:</label>
              <input type="text" className="form-control" ref="first_name" value={this.state.fields["first_name"]} onChange={this.handleChange.bind(this, "first_name")} placeholder="first name" />
              <span className="error">{this.state.errors["first_name"]}</span>
            </div>

            <div className="form-group">
              <label htmlFor="title">Last Name:</label>
              <input type="text" className="form-control" ref="last_name" value={this.state.fields["last_name"]} onChange={this.handleChange.bind(this, "last_name")} placeholder="last name" />
              <span className="error">{this.state.errors["last_name"]}</span>
            </div>

            <div className="form-group">
              <label htmlFor="title">Email:</label>
              <input type="text" className="form-control" ref="email" value={this.state.fields["email"]} onChange={this.handleChange.bind(this, "email")} placeholder="email" />
              <span className="error">{this.state.errors["email"]}</span>
            </div>

          
            <div className="form-group">
            <label htmlFor="title">Age:</label>
            <select onChange={this.handleChange.bind(this,"age")} >
              {this.createSelectItems()}
            </select>
            <div className="error">{this.state.errors["age"]}</div>
            </div>
            
            <div className="form-group">
            <input type="radio" name="gender" value='male' defaultChecked={this.state.checked} onChange={this.handleChange.bind(this,"gender")} /><label>Male</label>
            <input type="radio" name="gender" value='female'  onChange={this.handleChange.bind(this,"gender")} /><label>Female</label>
            <div className="error">{this.state.errors["gender"]}</div>
            </div>
           

            <button className="btn btn-success center-block">Create</button>
       </form>
       </React.Fragment>
        )
    }

}
export default CreatePerson
