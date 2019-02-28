import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import '../css/AppNews.css'

class Menu extends Component {
    
   constructor(){
       super()
       this.state={
        mobileNavVisible: false
       }
       
      

       this.expandMenu=this.expandMenu.bind(this);
   }

  

   handleNavClick() {
    if(!this.state.mobileNavVisible) {
      this.setState({mobileNavVisible: true});
    } else {
      this.setState({mobileNavVisible: false});
    }
  }

    expandMenu(){

       console.log('open menu')
      //var burger = document.getElementById("myDIV");
        //var menu = document.querySelector('#'+burger.dataset.target);
        //var 
        /*
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
        */
    }

    render(){
        return(
            <nav className="navbar is-fixed-top topNav menuStyle">
			<div className="container">
				<div className="navbar-brand">
					
					<div className="navbar-burger burger" onClick={this.handleNavClick.bind(this)} data-target="topNav">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div id="topNav" className="navbar-menu">
					<div className="navbar-start">
                       <Link to="/"><div className="navbar-item">Home</div></Link>
                       <Link to="/view"><div className="navbar-item">Edit</div></Link>
					   <Link to="/create"><div className="navbar-item">Add</div></Link>
						
					</div>
				
				</div>
			</div>
		</nav>
        )
    }


}
export default Menu