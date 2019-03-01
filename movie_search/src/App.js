import './style/App.css';

//config
import React, { Component } from 'react';
import axios from 'axios';

//components
import SearchBar from './component/searchbar';
import VideoList from './container/video_list';
import VideoDetail from './component/video_detail';
import Video from './component/video';

//const for API
import './env/api_env.js';
const API_KEY = global.key;
const API_END_POINT = "https://api.themoviedb.org/3";   
const POPULAR_MOVIE_URL = "&language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
//const SEARCH_MOVIE = "&language=fr&page=1&include_adult=false";

class App extends Component{

    constructor(props){
        super(props);
        this.state = { 
            currentMovie: {},
            movieList: {}
        }
    }

    componentDidMount(){
        axios.get(`${API_END_POINT}/discover/movie${API_KEY}${POPULAR_MOVIE_URL}`)
            .then(function (res){
                    this.setState({movieList: res.data.results.splice(1,6) , currentMovie: res.data.results[0]}, function(){
                    this.applyVideoToCurrentMovie();
                });
            }.bind(this)
        ) 
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}/movie/${this.state.currentMovie.id}/videos${API_KEY}`)
        .then(function (res) {
            const youtubeKey = res.data.results[0].key; 
            let newCurrentMovieState = this.state.currentMovie;
            newCurrentMovieState.videoId = youtubeKey; 
            this.setState({currentMovie: newCurrentMovieState});
        }.bind(this)
            )
    }

    onClickListItem(movie){
        this.setState({currentMovie:movie}, function(){
            this.applyVideoToCurrentMovie();
            this.setRecommandation();
        })
    }

    onClickSearch(seachText){
        if(seachText) {
            axios.get(`${API_END_POINT}/search/movie${API_KEY}&query=${seachText}`)
                .then(function (res){
                        if(res.data && res.data.results[0]){
                            if(res.data.results[0].id !== this.state.currentMovie.id ){
                                        this.setState({currentMovie: res.data.results[0]}, () =>{
                                        this.applyVideoToCurrentMovie();
                                        this.setRecommandation();
                                    })
                            }
                        }
                    }.bind(this));
        }
    }

    setRecommandation(){
        axios.get(`${API_END_POINT}/movie/${this.state.currentMovie.id}/recommendations${API_KEY}&language=fr`)
        .then(function (res){
            this.setState({movieList: res.data.results.splice(0,5)})
        }.bind(this)
        ) 
    }

    render(){
        const renderVideoList = () => {
            if(this.state.movieList.length >=5){
                return <VideoList movieList= {this.state.movieList} callback={this.onClickListItem.bind(this)}/>
            }
        }
        return (
            <section>
			<p> BITE ! </p>
                <div className="container padding-50-bottom">
                    <nav className="navbar navbar-expand">
                        <form className="collapse navbar-collapse w-100 order-3 dual-collapse1" id="navbarSupportedContent">
                            <SearchBar callback={this.onClickSearch.bind(this)}/>
                        </form>
                    </nav>
                </div>
                <div className="container padding-50">
                    <h1 className="text-center">{this.state.currentMovie.title}</h1>
                    <hr />
                </div>
                <div className="row padding-50-bottom">
                    <div className="col-md-12 text-center">
                        <Video videoId={this.state.currentMovie.videoId}/>
                    </div>
                </div>
                <div className="container padding-50">
                    <div className="row padding-50-bottom">
                        <div className="col-md-12 text-center">
                            <VideoDetail 
                            description = {this.state.currentMovie.overview}/>
                        </div>
                    </div>
                </div>
                <div className="padding-50-bottom"></div>
                <div className="container">
                    <h1 className="font-40 text-center">Suggestions</h1>
                    <hr />
                    <div className="padding-50-bottom"></div>
                    <div className="col-md-12">
                        {renderVideoList()}
                    </div>
                </div>
            </section>
        )
    }
}

export default App;

