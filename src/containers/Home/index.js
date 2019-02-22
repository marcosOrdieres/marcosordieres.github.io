
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Compare, ProductList} from '../../components';
import * as productActions from '../../actions/product';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageBackpacker from '../../public/images/photoApp.png';
import imageGhost from '../../public/images/ghost.png';
import imageBomb from '../../public/images/bomb.png';

const words = ['Full Stack Developer', 'Front-End Developer', 'React Native Developer', 'GIS Specialist'];
let i = 0;
let timer;

class Home extends Component {
  constructor (args) {
    super(args);

    this.state = {
      hoverValue: false,
      hoverValueProject: false
    };
  }

  componentWillMount () {
    this.props.actions.getProducts();
  }

  componentDidMount () {
    this.typingEffect(words, i, timer);
  }

  typingEffect (words, i, timer) {
    	let word = words[i].split('');
    	var loopTyping = () => {
    		if (word.length > 0) {
    			document.getElementById('word').innerHTML += word.shift();
    		} else {
    			this.deletingEffect(words, i, timer);
    			return false;
    		}
    		timer = setTimeout(loopTyping, 200);
    	};
    	loopTyping();
  }

  deletingEffect (words, i, timer) {
  	let word = words[i].split('');
  	var loopDeleting = () => {
  		if (word.length > 0) {
  			word.pop();
  			document.getElementById('word').innerHTML = word.join('');
  		} else {
  			if (words.length > (i + 1)) {
  				i++;
  			} else {
  				i = 0;
  			}
  			this.typingEffect(words, i, timer);
  			return false;
  		}
  		timer = setTimeout(loopDeleting, 80);
  	};
  	loopDeleting();
  }

  valueOnClick (value) {
    switch (value) {
      case 'iconGithub':
        return window.open('https://github.com/marcosOrdieres', '_blank');
        break;
      case 'iconLinkedin':
        return window.open('https://www.linkedin.com/in/marcosrodriguezordieres/', '_blank');
        break;
      case 'iconEmail':
        return window.location.href = 'mailto:marcosordieres89@gmail.com';
        break;
      case 'iconPlay':
        return window.open('https://play.google.com/store/apps/developer?id=marcosOrdieres', '_blank');
        break;
      default:
        return window.open('https://www.linkedin.com/in/marcosrodriguezordieres/', '_blank');
    }
  }

  onMouseEnterHandler (value) {
    const valueForHover = document.getElementById(value);
    this.setState({hoverValue: true});
    valueForHover.style.opacity = 1;
    valueForHover.style.cursor = 'pointer';
  }

  onMouseLeaveHandler (value) {
    this.setState({hoverValueProject: false});
    document.getElementById(value).style.opacity = 1;
  }

  onMouseEnterHandlerProject (value) {
    const valueForHover = document.getElementById(value);
    this.setState({hoverValueProject: true});
    valueForHover.style.opacity = 0.5;
    valueForHover.style.opacity = 0.5;
    valueForHover.style.cursor = 'pointer';
  }

  onMouseLeaveHandlerProject (value) {
    this.setState({hoverValue: false});
    document.getElementById(value).style.opacity = 1;
  }

  render () {
    // const {products, actions} = this.props;
    // const compareProducts = products.filter(product => product.compare);

    return (
      <div>
        <div className='home'>
          <div id='name' className='name' onClick={this.valueOnClick.bind(this)} onMouseEnter={this.onMouseEnterHandler.bind(this, 'name')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'name')}>
            <h2>Marcos Rodríguez</h2>
          </div>

          <div id='iconsWork' className='iconsWork'>
            <div className='iconGithub' id='iconGithub' onClick={this.valueOnClick.bind(this, 'iconGithub')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconGithub')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconGithub')}>
              <FontAwesomeIcon icon={['fab', 'github']} size='3x' />
            </div>
            <div className='iconLinkedin' id='iconLinkedin' onClick={this.valueOnClick.bind(this, 'iconLinkedin')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconLinkedin')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconLinkedin')}>
              <FontAwesomeIcon icon={['fab', 'linkedin']} size='3x' />
            </div>
            <div className='iconEmail' id='iconEmail' onClick={this.valueOnClick.bind(this, 'iconEmail')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconEmail')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconEmail')}>
              <FontAwesomeIcon icon='envelope' size='3x' />
            </div>
            <div className='iconPlay' id='iconPlay' onClick={this.valueOnClick.bind(this, 'iconPlay')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlay')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlay')}>
              <FontAwesomeIcon icon={['fab', 'google-play']} size='3x' />
            </div>
          </div>
          <div className='rowText'>
            <div className='col-12'>
              <h2 className='middleText'>Hello, I am <strong><p className='nameTitle'>Marcos.</p></strong> And this is my <i>Portfolio</i></h2>
              <p id='word' />
              {/* Make a component out of this */}
            </div>
          </div>
          {/* <ProductList products={products} compare={actions.compare}/>
          {compareProducts.length >= 2 &&
            <Compare products={compareProducts}/>
          } */}
        </div>
        <div className='secondPart'>
          <div className='firstCol'>
            <div className='titleText'>
              <h2 className='secondPartTitle'>Work</h2>
            </div>
            <div className='subtitleText'>
              <h2 className='secondPartSubtitle'>As a Software Developer based in Berlin, I am able to produce high quality responsive applications and websites with a exceptional user experience</h2>
            </div>
          </div>
          <div className='secondCol'>
            <div className='backpackerProject' id='backpackerProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'backpackerProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'backpackerProject')}>
              {/* {this.state.isPhone ? <div className="rectangleBackpackerProject"></div> : <div className="rectangleBackpackerProject"></div>} */}
              <div>
                <img src={imageBackpacker} width='40%' height='110%' />
              </div>
            </div>
            <div className='bombProject' id='bombProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'bombProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'bombProject')}>
              <div>
                <img src={imageBomb} width='40%' height='110%' />
              </div>
            </div>
          </div>
          <div className='thirdCol'>
            <div className='ghostProject' id='ghostProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'ghostProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'ghostProject')}>
              <div>
                <img src={imageGhost} width='40%' height='110%' />
              </div>
            </div>
            <div className='tableProject' id='tableProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'tableProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'tableProject')}>
              <div>
                <img src={imageBackpacker} width='40%' height='110%' />
              </div>
            </div>
          </div>
        </div>

        <div className='experience' />

      </div>

    );
  }
}

export default connect(
  state => ({
    products: state.product.products
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(Home);
