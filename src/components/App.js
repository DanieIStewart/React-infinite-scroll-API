import React from 'react';
import unsplash from'../api/unsplash'
import SearchBar from './SearchBar'
import ImageList from './ImageList'
import JumboTron from './JumboTron'

class App extends React.Component {
  state = { 
      images: [],
      term: '',
      pageNumber: null
   };

  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  onSearchSubmit = async(term) => {
    //  make API call with search term
    const response = await unsplash.get('https://api.unsplash.com/search/photos', {
      params: {query: term, per_page: 10},
    });
    // set the state with returned result
    this.setState({ images: response.data.results, term: term, pageNumber: 2 });
    console.log(this.state.images);
  }

  onScrollLoadImages = async(term) => {
    let pageNumber = this.state.pageNumber
    //  make API call with search term
    const response = await unsplash.get('https://api.unsplash.com/search/photos', {
      params: {query: term, per_page: 10, page: pageNumber},
    });
    pageNumber++
    // issue both are arrays
    let currentImgesArray = this.state.images
    const newImageObj = response.data.results
    // loop over adding new photos to imgs array
    newImageObj.map((img) => {
      currentImgesArray.push(img)
    })
    // set state with new images
    this.setState({ images: currentImgesArray, term: term, pageNumber: pageNumber });
  }

  // handles scrolling
  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.onScrollLoadImages(this.state.term)
    }else{

    }
  }

  render(){
   return( 
    <div className="ui container" style={{marginTop: '10px'}}>
    <JumboTron/>
      <SearchBar onSubmit={this.onSearchSubmit} />
      <ImageList images={this.state.images}/>
    </div>
   )
  }
}

// api bOxjRA3EArwBgkQiJCDdUnbP7UOggNwEHeuHhpOEtu0
// https://unsplash.com/documentation


export default App;