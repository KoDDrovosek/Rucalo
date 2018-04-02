import React ,{Component} from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import imgShowPass from './show_hide_password.svg';


import  './Dashboard.css';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';

import { isVisible , addCard} from '../../actions/index'
import { checkInput } from '../../service/index'

class Dashboard extends Component {
    constructor(){
        super();
        this.state={
            isShow:'password',
            description :'',
            password:''
            
        }
     this.isValid = this.isValid.bind(this);
    }
    isValid(id){
        let str ={
            description :this.state.description,
            password : this.state.password
        }
        console.log(str);
        checkInput(str)
        .then(data=>{
            str.id = id;
            this.props.addCard(data);
            this.props.isVisible(false);
        })
        .catch(err=>{
            // console.log(err);
        })
    }
    
    showModal(){
        let id = parseInt((Math.random()*10000000000),16);
        if(this.props.status){
            return(
                <Modal>
                    <form className="form">
                        <div>id</div>
                        <div>{id}</div>
                        <div className="input_form_group">
                            <label>Description</label>
                            <input 
                                type="text" 
                                onChange={
                                    (e)=>{ this.setState({description: e.target.value })}
                                }
                            />
                        </div>
                        <div className="input_form_group">
                            <label>Password</label>
                            <div className="group_pass">
                                <input 
                                    type={this.state.isShow}
                                    onChange={
                                        (e)=>{ this.setState({password: e.target.value })}
                                    }
                                />
                                <img src={imgShowPass} onClick={
                                    ()=>{
                                        if(this.state.isShow === 'password'){
                                            this.setState({isShow:"text"})
                                        }else{
                                            this.setState({isShow:'password'})
                                        }
                                    }
                                    }/>
                            </div>
                        </div>
                        <div className="bt_container_controll-Dash">
                            <div className="bt_control-Dash" onClick={()=>{this.isValid(id)}}>Add</div>
                            <div className="bt_control-Dash" onClick={()=>{this.props.isVisible(false)}}>Cancel</div>
                        </div>
                    </form>
                </Modal>
            )
        }else{
            return null
        }
    }
    render(){
        return(
            <div>
                <div className="dashboard_container-Dash">
                    {this.props.card.map(index=>{
                        return <Card key={index} desciption={index.description} password={index.password} id={index.id}/>
                    })}
                    <div className="bt_add-Dash" onClick={()=>{this.props.isVisible(true)}}>+</div>
                </div>
                {this.showModal()}
            </div>
        )
    }
}

  
export default connect(state =>({
    status: state.modal.isVisible,
    card: state.cards.card
}),
{
    isVisible,
    addCard
}
    
)(Dashboard);

// 7847509