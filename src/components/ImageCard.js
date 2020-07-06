import './ImageCard.css'
import React from 'react';

class ImageCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {spans: 0};

    this.imageRef = React.createRef();
  }

  componentDidMount(){
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight + 100

    let spans = Math.ceil(height /10);
  
    this.setState({ spans });
  }

  render(){
    // destrucure 
    const {description, urls, links, likes, alt_description, user } = this.props.image;
    
    return(
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
      <div className="ui card">
        <a className="image" href={links.html}>
        <img className="img-zoom img-hover" ref={this.imageRef} alt={description} src={urls.regular}/>
        </a>
        <div className="content">
          <a className="header" href="#">By: {user.username}</a>
          <div className="meta">
            <h5>{alt_description}</h5>
            <p className='likes-display'>Likes: {likes}</p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default ImageCard;