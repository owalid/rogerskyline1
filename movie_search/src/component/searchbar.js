import React, { Component } from 'react';

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = {
                    searchText: "",
                    placeHolder:"Rechercher un film...",
                    intervalBeforeRequest:1000,
                    lockRequest: false
                    }
    }
    handleChange(e){  
            e.preventDefault();  
            this.setState({searchText: e.target.value});

            if(!this.state.lockRequest){
                this.setState({lockRequest: true})
                setTimeout(function(){
                    this.search()
                }.bind(this),this.state.intervalBeforeRequest)
            }
    }

    search(){
            this.props.callback(this.state.searchText);
            this.setState({lockRequest:false})

    }


    handleOnClick(e){
        e.preventDefault();
        this.search();
    }

    render(){
        return(
            
            <div className="container">
                <div className="col-md-12 input-group mb-3 text-center"> 
                    <input type="text" className="form-control form-control" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
            </div>
            </div>
        )

    }
}

export default SearchBar;