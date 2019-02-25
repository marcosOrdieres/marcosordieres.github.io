
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Compare, ProductList} from '../../components';
import * as productActions from '../../actions/product';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageBackpacker from '../../public/images/photoApp.png';
import imageGhost from '../../public/images/ghost.png';
import imageBomb from '../../public/images/bomb.png';
import imageTable from '../../public/images/tableGame.png';

import pokeImage from '../../public/images/pokeImage.png';

import shineImage from '../../public/images/shine.png';
import capgeminiImage from '../../public/images/capgemini.png';
import prometeoImage from '../../public/images/prometeo.png';

import iconPlayBackpacker from '../../public/images/iconPlayBackpacker.png';
import iconPlayBomb from '../../public/images/iconPlayBomb.png';
import iconPlayGhost from '../../public/images/iconPlayGhost.png';

import GoogleMapReact from 'google-map-react';
const words = ['Full Stack Developer', 'Front-End Developer', 'React Native Developer', 'GIS Specialist'];
let i = 0;
let timer;

class Home extends Component {
  constructor (args) {
    super(args);

    this.state = {
      hoverValue: false,
      hoverValueProject: false,
      hoverValueEmail: false
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
      setTimeout(() => { this.deletingEffect(words, i, timer); }, 2000);
    			return false;
    		}
    		timer = setTimeout(loopTyping, 110);
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
      case 'iconPlayShineGoogle':
        return window.open('https://play.google.com/store/apps/details?id=com.shinepowered.shineselect', '_blank');
        break;
      case 'iconPlayShineApple':
        return window.open('https://itunes.apple.com/de/app/shine-eco/id1359763626?mt=8', '_blank');
        break;
      case 'iconCap':
        return window.open('https://www.capgemini.com/', '_blank');
        break;
      case 'iconPrometeo':
        return window.open('http://www.prometeoinnovations.com/', '_blank');
        break;
      case 'imageTable':
        return window.open('https://marcosordieres.github.io/TableJS/', '_blank');
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
    const valueForLeaveHover = document.getElementById(value);
    this.setState({hoverValue: false});
    valueForLeaveHover.style.opacity = 0.5;
    valueForLeaveHover.style.cursor = 'cursor';
  }

  onMouseEnterHandlerProject (value, image) {
    const valueForHover = document.getElementById(value);
    if (image === 'imageJobs') {
      const valueImageForHover = document.getElementById('imageJobs');
      this.setState({hoverValueProject: true, [value]: true});
      valueForHover.style.opacity = 0.5;
      valueForHover.style.cursor = 'pointer';
    } else {
      // valueForHover.style.opacity = 0.5;
      valueForHover.style.backgroundColor = '#8c8c8c';
      this.setState({hoverValueProject: true, [value]: true});
      console.log(this.state);

      valueForHover.style.cursor = 'pointer';
    }
  }

  onMouseLeaveHandlerProject (value, image) {
    const valueForLeaveHover = document.getElementById(value);
    if (image === 'imageJobs') {
      this.setState({hoverValueProject: false, [value]: false});
      valueForLeaveHover.style.opacity = 1;
      console.log(this.state);
    } else {
      this.setState({hoverValueProject: false, [value]: false});
      console.log(this.state);
      valueForLeaveHover.style.opacity = 1;
      valueForLeaveHover.style.backgroundColor = '#f6f7f8';
    }
  }

  onMouseEnterHandlerEmail (value, p) {
    const valueForHover = document.getElementById(value);
    const valueForHoverP = document.getElementById(p);
    this.setState({hoverValueEmail: true});
    valueForHover.style.backgroundColor = 'white';
    valueForHoverP.style.color = '#3a6ee8';
    valueForHover.style.cursor = 'pointer';
  }

  onMouseLeaveHandlerEmail (value, p) {
    const valueForLeaveHover = document.getElementById(value);
    const valueForLeaveHoverP = document.getElementById(p);
    this.setState({hoverValueEmail: false});
    valueForLeaveHover.style.backgroundColor = '#3a6ee8';
    valueForLeaveHoverP.style.color = 'white';
    valueForLeaveHover.style.cursor = 'cursor';
  }

  renderMarkers (map, maps) {
    let marker = new maps.Marker({
      position: {lat: 52.560103, lng: 13.414957},
      icon: pokeImage,
      map
      // title: 'Hello World!'
    });
  }

  render () {
    // const {products, actions} = this.props;
    // const compareProducts = products.filter(product => product.compare);

    return (
      <div className='d-inline-flex flex-xs-row p-2 col-example'>
        <div className='home'>
          <div id='name' className='name' onClick={this.valueOnClick.bind(this)} onMouseEnter={this.onMouseEnterHandler.bind(this, 'name')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'name')}>
            <h4>Marcos Rodríguez Ordieres</h4>
          </div>
          <div id='iconsWork' className='iconsWork'>
            <div className='iconGithub' id='iconGithub' onClick={this.valueOnClick.bind(this, 'iconGithub')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconGithub')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconGithub')}>
              <FontAwesomeIcon icon={['fab', 'github']} size='2x' />
            </div>
            <div className='iconLinkedin' id='iconLinkedin' onClick={this.valueOnClick.bind(this, 'iconLinkedin')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconLinkedin')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconLinkedin')}>
              <FontAwesomeIcon icon={['fab', 'linkedin']} size='2x' />
            </div>
            <div className='iconEmail' id='iconEmail' onClick={this.valueOnClick.bind(this, 'iconEmail')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconEmail')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconEmail')}>
              <FontAwesomeIcon icon='envelope' size='2x' />
            </div>
            <div className='iconPlay' id='iconPlay' onClick={this.valueOnClick.bind(this, 'iconPlay')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlay')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlay')}>
              <FontAwesomeIcon icon={['fab', 'google-play']} size='2x' />
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
              <p className='secondPartTitle'>Work<p className='textTitleUnderscore'>_</p></p>
            </div>
            <div className='subtitleText'>
              <h2 className='secondPartSubtitle'>As a Software Developer based in Berlin, I am able to produce high quality responsive applications and websites with a exceptional user experience</h2>
            </div>
          </div>
          <div className='flex-xs-column flex-sm-column flex-md-row secondCol'>
            <div className='backpackerProject' id='backpackerProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'backpackerProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'backpackerProject')}>
              {/* {this.state.isPhone ? <div className="rectangleBackpackerProject"></div> : <div className="rectangleBackpackerProject"></div>} */}
              <div>
                <img src={imageBackpacker} width='35%' height='70%' />
              </div>

              {this.state.backpackerProject ?
                <div>
                  <h5>BACKPACKER NEEDS</h5>
                  <h6>Freelance React Native Project</h6>
                  <p>App for helping travellers to make their Backpack</p>
                  <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={iconPlayBackpacker} width='15%' height='15%' />
                </div>
                :
                null
              }

            </div>
            <div className='bombProject' id='bombProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'bombProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'bombProject')}>
              <div>
                <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={imageBomb} width='35%' height='70%' />
              </div>

              {this.state.bombProject ?
                <div>
                  <h5>TIME BOMB</h5>
                  <h6>Freelance React Native Project</h6>
                  <p>App for helping travellers to make their Backpack</p>
                  <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={iconPlayBomb} width='15%' height='15%' />
                </div>
                :
                null
              }
            </div>

          </div>
          <div className='flex-xs-column flex-sm-column flex-md-row thirdCol'>
            <div className='ghostProject' id='ghostProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'ghostProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'ghostProject')}>
              <div>
                <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={imageGhost} width='35%' height='70%' />
              </div>

              {this.state.ghostProject ?
                <div>
                  <h5>GHOST REPELLENT</h5>
                  <h6>Freelance React Native Project</h6>
                  <p>App for helping travellers to make their Backpack</p>
                  <img src={iconPlayGhost} width='15%' height='15%' />
                </div>
                :
                null
              }
            </div>
            <div className='tableProject' id='tableProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'tableProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'tableProject')}>
              <div>
                <img src={imageTable} width='35%' height='70%' />
              </div>

              {this.state.tableProject ?
                <div>
                  <h5>TABLE GAME</h5>
                  <h6>Vanilla Javascript Project</h6>
                  <p>App for helping travellers to make their Backpack</p>
                  <img onClick={this.valueOnClick.bind(this, 'imageTable')} src={imageTable} width='15%' height='15%' />
                </div>
                :
                null
              }
            </div>
          </div>
        </div>

        <div className='experience'>
          <div className='textExperience'>
            <div className='textExperienceTitle'>
              <p className='textExperienceTitleP'>Experience<p className='textExperienceUnderscore'>_</p></p>
            </div>
            <div className='textExperienceSubtitle'>
              <p className='textExperienceSubtitleP'>
                These Next ones are my experiences that I have in the field of informatics
              </p>
            </div>
          </div>
          <div className='flex-xs-column flex-sm-column flex-md-row flex-lg-row photosExperience'>
            <div className='photosExperienceFirst' id='photosExperienceFirst'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceFirst', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceFirst', 'imageJobs')}>
              {!this.state.photosExperienceFirst ?
                <img className='imageJobs' id='imageJobs' src={shineImage} width='22%' height='40%' />
                 :
                <div className='squareJob'>
                  <p className='titleJob'>React Native Developer | Front-End Developer</p>
                  <p className='subtitleJob'>2 years</p>
                  <p className='subtitleJob'>React Native, Redux, ReactJS, NodeJS, ES6</p>

                  <div className='iconJob' id='iconJob'
                    onClick={this.valueOnClick.bind(this, 'iconJob')}
                    onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconJob')}
                    onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconJob')}>
                    <div className='iconsShine'>
                      <div className='iconPlayShineGoogle' id='iconPlayShineGoogle' onClick={this.valueOnClick.bind(this, 'iconPlayShineGoogle')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineGoogle')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineGoogle')}>
                        <FontAwesomeIcon icon={['fab', 'google-play']} size='3x' />
                      </div>
                      <div className='iconPlayShineApple' id='iconPlayShineApple' onClick={this.valueOnClick.bind(this, 'iconPlayShineApple')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineApple')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineApple')}>
                        <FontAwesomeIcon icon={['fab', 'apple']} size='3x' />
                      </div>
                    </div>
                  </div>
                </div>
               }
            </div>
            <div className='photosExperienceSecond' id='photosExperienceSecond'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceSecond', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceSecond', 'imageJobs')}>
              {!this.state.photosExperienceSecond ?
                <img className='imageJobs' id='imageJobs' src={capgeminiImage} width='80%' height='40%' />
                 :
                <div className='squareJob'>
                  <p className='titleJob'>Full Stack Developer</p>
                  <p className='subtitleJob'>8 months</p>
                  <p className='subtitleJob'>ES6, NodeJS, ReactJS, React Native, Redux</p>
                  <div className='iconJob' id='iconJob'
                    onClick={this.valueOnClick.bind(this, 'iconJob')}
                    onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconJob')}
                    onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconJob')}>
                    <div className='iconPlayShineApple' id='iconCap' onClick={this.valueOnClick.bind(this, 'iconCap')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconCap')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconCap')}>
                      <FontAwesomeIcon icon={['fab', 'chrome']} size='3x' />
                    </div>
                  </div>
                </div>
               }
            </div>
            <div className='photosExperienceThird' id='photosExperienceThird'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceThird', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceThird', 'imageJobs')}>

              {!this.state.photosExperienceThird ?
                <img className='imageJobs' id='imageJobs' src={prometeoImage} width='50%' height='20%' />
                 :
                <div className='squareJob'>
                  <p className='titleJob'>Javascript Developer and GIS Specialist</p>
                  <p className='subtitleJob'>4 months</p>
                  <p className='subtitleJob'>Intership</p>
                  <div className='iconJob' id='iconJob'
                    onClick={this.valueOnClick.bind(this, 'iconJob')}
                    onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconJob')}
                    onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconJob')}>
                    <div className='iconPlayShineApple' id='iconPrometeo' onClick={this.valueOnClick.bind(this, 'iconPrometeo')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPrometeo')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPrometeo')}>
                      <FontAwesomeIcon icon={['fab', 'chrome']} size='3x' />
                    </div>
                  </div>
                </div>
               }

            </div>
          </div>
        </div>

        <div className='contactMe'>
          <div className='flex-xs-column flex-sm-column flex-md-column flex-lg-row contact'>
            <div className='contactEmail'>
              <div className='contactEmailRectangle' id='contactEmailRectangle'
                onClick={this.valueOnClick.bind(this, 'iconEmail')}
                onMouseEnter={this.onMouseEnterHandlerEmail.bind(this, 'contactEmailRectangle', 'contactEmailP')}
                onMouseLeave={this.onMouseLeaveHandlerEmail.bind(this, 'contactEmailRectangle', 'contactEmailP')}><p className='contactEmailP' id='contactEmailP'>Contact Me</p></div>
            </div>
            <div className='contactPlace'>
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCda4COyVGH-JN8o5cdS6UcRT7FKwSn91Y' }}
                onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                defaultCenter={{lat: 52.560103, lng: 13.414957}}
                defaultZoom={11} />
            </div>
          </div>
          <div className='footer'>
            <p className='footerName'>© 2019 Marcos Rodríguez Ordieres.</p>
            <div id='iconsWorkFooter' className='iconsWorkFooter'>
              <div className='iconGithub' id='iconGithub' onClick={this.valueOnClick.bind(this, 'iconGithub')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconGithub')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconGithub')}>
                <FontAwesomeIcon icon={['fab', 'github']} size='2px' />
              </div>
              <div className='iconLinkedin' id='iconLinkedin' onClick={this.valueOnClick.bind(this, 'iconLinkedin')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconLinkedin')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconLinkedin')}>
                <FontAwesomeIcon icon={['fab', 'linkedin']} size='2px' />
              </div>
              <div className='iconEmail' id='iconEmail' onClick={this.valueOnClick.bind(this, 'iconEmail')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconEmail')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconEmail')}>
                <FontAwesomeIcon icon='envelope' size='2px' />
              </div>
              <div className='iconPlay' id='iconPlay' onClick={this.valueOnClick.bind(this, 'iconPlay')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlay')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlay')}>
                <FontAwesomeIcon icon={['fab', 'google-play']} size='2px' />
              </div>
            </div>
          </div>
        </div>
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
