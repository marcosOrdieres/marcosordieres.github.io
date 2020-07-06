
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Compare, ProductList} from '../../components';
import * as productActions from '../../actions/product';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageBackpacker from '../../public/images/photoApp.png';
import clock from '../../public/images/clock.png';
import imageBomb from '../../public/images/bomb.png';
import imageTable from '../../public/images/tableGame.png';

import pokeImage from '../../public/images/poke.svg';

import shineImage from '../../public/images/shine.png';
import capgeminiImage from '../../public/images/capgemini.png';
import prometeoImage from '../../public/images/prometeo.png';

import kickid from '../../public/images/kickid.jpeg';


import iconPlayBackpacker from '../../public/images/iconPlayBackpacker.png';
import iconPlayBomb from '../../public/images/iconPlayBomb.png';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
const words = ['Full Stack Developer', 'Front-End Developer', 'React Developer', 'React Native Developer'];
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
      case 'iconLinkedin':
        return window.open('https://www.linkedin.com/in/marcosrodriguezordieres/', '_blank');
      case 'iconEmail':
        return window.location.href = 'mailto:marcosordieres89@gmail.com';
      case 'iconPlay':
        return window.open('https://play.google.com/store/apps/developer?id=marcosOrdieres', '_blank');
      case 'iconPlayShineGoogle':
        return window.open('https://play.google.com/store/apps/details?id=com.shinepowered.shineselect', '_blank');
      case 'iconPlayShineApple':
        return window.open('https://itunes.apple.com/de/app/shine-eco/id1359763626?mt=8', '_blank');
      case 'iconPlayKickidWeb':
        return window.open('https://www.kickid.com', '_blank');
      case 'iconPlayKickidAndroid':
        return window.open('https://play.google.com/store/apps/details?id=com.idleague.kickid&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1', '_blank');
      case 'iconCap':
        return window.open('https://www.capgemini.com/', '_blank');
      case 'iconPrometeo':
        return window.open('http://www.prometeoinnovations.com/', '_blank');
      case 'imageTable':
        return window.open('https://marcosordieres.github.io/TableJS/', '_blank');
    }
  }

  onMouseEnterHandler (value) {
    console.log(value);
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
      valueForHover.style.backgroundColor = '#9b9b9b';
      this.setState({hoverValueProject: true, [value]: true});
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
      valueForLeaveHover.style.backgroundColor = '#595959';
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
    const position = [52.560103, 13.414957];
    const iconPoke = new L.Icon({
      iconUrl: require('../../public/images/poke.svg'),
      iconAnchor: null,
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(60, 75),
      className: 'leaflet-div-icon'
    });
    return (
      <div>
        <div className='home'>

          <div id='name' className='flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row name' onClick={this.valueOnClick.bind(this)} onMouseEnter={this.onMouseEnterHandler.bind(this, 'name')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'name')}>
            <div className='nameInside'>
                <h4>Marcos Rodríguez Ordieres</h4>
            </div>
            <div id='iconsWork' className='iconsWork'>
              <div className='iconGithub' id='iconGithub' onClick={this.valueOnClick.bind(this, 'iconGithub')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconGithub')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconGithub')}>
                <FontAwesomeIcon icon={['fab', 'github']} size='5x' />
              </div>
              <div className='iconLinkedin' id='iconLinkedin' onClick={this.valueOnClick.bind(this, 'iconLinkedin')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconLinkedin')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconLinkedin')}>
                <FontAwesomeIcon icon={['fab', 'linkedin']} size='5x' />
              </div>
              <div className='iconEmail' id='iconEmail' onClick={this.valueOnClick.bind(this, 'iconEmail')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconEmail')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconEmail')}>
                <FontAwesomeIcon icon='envelope' size='5x' />
              </div>
              <div className='iconPlay' id='iconPlay' onClick={this.valueOnClick.bind(this, 'iconPlay')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlay')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlay')}>
                <FontAwesomeIcon icon={['fab', 'google-play']} size='5x' />
              </div>
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
        <div className='secondPartText'>

            <div className='titleText'>
              <p className='secondPartTitle'>But, Who is Marcos<p className='textTitleUnderscore'>?_</p></p>
            </div>
            <div className='subtitleText'>

              <div className='whoIsMarcosText'>
                <h2 className='secondPartSubtitle'>As a Software Developer based in Berlin, I am able to produce high quality responsive applications and websites with a exceptional user experience.</h2>
              </div>

              <div className='whoIsMarcosTextMiddle'>
              <div className='whoIsMarcosTextHalfRight'>

                <h2 className='secondPartSubtitleSkills'>It is a pleasure for me coding Javascript with React and React Native (with Hooks), super styled Components, flavored with GraphQL, React Testing Library and Jest.</h2>
                </div>
                <div className='whoIsMarcosTextHalf'>

                <h2 className='secondPartSubtitleSkills'>I also enjoy using NodeJS, Typescript, Firebase and any kind of automation.</h2>
                </div>

              </div>
              <div className='whoIsMarcosTextDown'>

                <h2 className='secondPartSubtitle'>In addition to Travel and Surf, I have built some side Projects (some of them are the next) and Packages which you can find in my GitHub.</h2>
              </div>

            
            
            
            
            </div>
          </div>



          <div className='secondPartProjects'>
          <div className='titleText'>
              <p className='thirdPartTitle'>Hover and Click into my Personal Projects<p className='textTitleUnderscore'>_</p></p>
            </div>
          <div className='flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row secondCol'>
            <div onClick={()=> window.open("https://github.com/marcosOrdieres/backpacker-needs", "_blank")} className='backpackerProject' id='backpackerProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'backpackerProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'backpackerProject')}>
              {/* {this.state.isPhone ? <div className="rectangleBackpackerProject"></div> : <div className="rectangleBackpackerProject"></div>} */}
              <div>
                <img src={imageBackpacker} width='35%' height='70%' />
              </div>

              {this.state.backpackerProject ?
                <div>
                  <h5 className='colorWhite'>BACKPACKER NEEDS</h5>
                  <h6 className='colorWhite'>React Native Project</h6>
                  <p className='colorWhite'>App for helping travellers to make their Backpack</p>
                  <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={iconPlayBackpacker} width='15%' height='15%' />
                </div>
                :
                null
              }

            </div>
            <div onClick={()=> window.open("https://github.com/marcosOrdieres/feetFat", "_blank")} className='bombProject' id='bombProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'bombProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'bombProject')}>
              <div>
                <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={imageBomb} width='35%' height='70%' />
              </div>

              {this.state.bombProject ?
                <div>
                  <h5 className='colorWhite'>Fat Foot Challenge</h5>
                  <h6 className='colorWhite'>React Native Project</h6>
                  <p className='colorWhite'>Game made in React Native (with Hooks) and Typescript</p>
                  <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={iconPlayBomb} width='15%' height='15%' />
                </div>
                :
                null
              }
            </div>

          </div>
          <div className='flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row  thirdCol'>
            <div onClick={()=> window.open("https://github.com/marcosOrdieres/time-converter", "_blank")} className='ghostProject' id='ghostProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'ghostProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'ghostProject')}>
              <div>
                <img onClick={this.valueOnClick.bind(this, 'iconPlay')} src={clock} width='35%' height='70%' />
              </div>

              {this.state.ghostProject ?
                <div>
                  <h5 className='colorWhite'>Time Converter</h5>
                  <h6 className='colorWhite'>npm package made with Javascript</h6>
                  <p className='colorWhite'>Small Project using TDD and Jest</p>
                  <img src={clock} width='15%' height='15%' />
                </div>
                :
                null
              }
            </div>
            <div onClick={()=> window.open("https://github.com/marcosOrdieres/Table-js", "_blank")} className='tableProject' id='tableProject'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'tableProject')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'tableProject')}>
              <div>
                <img src={imageTable} width='35%' height='70%' />
              </div>

              {this.state.tableProject ?
                <div>
                  <h5 className='colorWhite'>TABLE GAME</h5>
                  <h6 className='colorWhite'>Vanilla Javascript Project</h6>
                  <p className='colorWhite'>Small Game in order to use Array and Object operations in ES6</p>
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
                The next are the Companies in which I was working in the field of Information Technology as Software Engineer. Currently working in KickID, an IT sports Company.
              </p>
            </div>
          </div>


          <div className='flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row photosExperience'>
            <div className='photosExperienceFirst' id='photosExperienceFirst'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceFirst', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceFirst', 'imageJobs')}>

              {!this.state.photosExperienceFirst ?
                <img className='imageJobsPrometeo' id='imageJobs' src={prometeoImage} />
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
            <div className='photosExperienceSecond' id='photosExperienceSecond'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceSecond', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceSecond', 'imageJobs')}>
              {!this.state.photosExperienceSecond ?
                <img className='imageJobsCap' id='imageJobs' src={capgeminiImage}  />
                 :
                <div className='squareJob'>
                  <p className='titleJob'>Full Stack Developer</p>
                  <p className='subtitleJob'>8 months</p>
                  <p className='subtitleJob'>Javascript, Java, ExtJS</p>
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
                <img className='imageJobsShine' id='imageJobs' src={shineImage}/>
                 :
                <div className='squareJob'>
                  <p className='titleJob'>Full-Stack Developer | React & React Native Developer</p>
                  <p className='subtitleJob'>2 years</p>
                  <p className='subtitleJob'>ReactJS, React Native, Redux, Typescript, NodeJS (NestJS and Express), GraphQL, REST, ES6</p>

                  <div className='iconJob' id='iconJob'
                    onClick={this.valueOnClick.bind(this, 'iconJob')}
                    onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconJob')}
                    onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconJob')}>
                    <div className='iconsShine'>
                      <div className='iconPlayShineApple' id='iconPlayShineApple' onClick={this.valueOnClick.bind(this, 'iconPlayShineApple')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineApple')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineApple')}>
                        <FontAwesomeIcon icon={['fab', 'apple']} size='3x' />
                      </div>
                      <div className='separator' />
                      <div className='iconPlayShineGoogle' id='iconPlayShineGoogle' onClick={this.valueOnClick.bind(this, 'iconPlayShineGoogle')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineGoogle')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineGoogle')}>
                        <FontAwesomeIcon icon={['fab', 'google-play']} size='3x' />
                      </div>

                    </div>
                  </div>
                </div>
               }
               
            </div>

            <div className='photosExperienceFourth' id='photosExperienceFourth'
              onMouseEnter={this.onMouseEnterHandlerProject.bind(this, 'photosExperienceFourth', 'imageJobs')}
              onMouseLeave={this.onMouseLeaveHandlerProject.bind(this, 'photosExperienceFourth', 'imageJobs')}>

              {!this.state.photosExperienceFourth ?
                <img className='imageJobsKickid' id='imageJobsKickid' src={kickid}/>
                 :
                <div className='squareJob'>
                  <p className='titleJob'>Team Lead Front-End | React & React Native Developer</p>
                  <p className='subtitleJob'>1 year - Actual</p>
                  <p className='subtitleJob'>ReactJS (with Hooks), React Native, Typescript, NodeJS (NestJS), GraphQL, ES2020</p>

                  <div className='iconJob' id='iconJob'
                    onClick={this.valueOnClick.bind(this, 'iconJob')}
                    onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconJob')}
                    onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconJob')}>
                    <div className='iconsShine'>
                      <div className='iconPlayShineApple' id='iconPlayShineApple' 
                      onClick={this.valueOnClick.bind(this, 'iconPlayKickidWeb')} 
                      onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineApple')} 
                      onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineApple')}>
                        <FontAwesomeIcon icon={['fab', 'chrome']} size='3x' />
                      </div>
                      <div className='separator' />
                      <div className='iconPlayShineGoogle' id='iconPlayShineGoogle' 
                      onClick={this.valueOnClick.bind(this, 'iconPlayKickidAndroid')} 
                      onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlayShineGoogle')}
                      onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlayShineGoogle')}>
                        <FontAwesomeIcon icon={['fab', 'google-play']} size='3x' />
                      </div>

                    </div>
                  </div>
                </div>
               }
               
            </div>
          </div>
        </div>
        <div className='contactMe'>
          <div className='flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row contact'>
            <div className='contactEmail'>
              <div className='contactEmailRectangle' id='contactEmailRectangle'
                onClick={this.valueOnClick.bind(this, 'iconEmail')}
                onMouseEnter={this.onMouseEnterHandlerEmail.bind(this, 'contactEmailRectangle', 'contactEmailP')}
                onMouseLeave={this.onMouseLeaveHandlerEmail.bind(this, 'contactEmailRectangle', 'contactEmailP')}><p className='contactEmailP' id='contactEmailP'>Contact Me</p></div>
            </div>
            <div className='contactPlace'>
              <Map center={position} zoom={13}>
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors' />
                <Marker
                  icon={iconPoke}
                  position={position}>
                  <Popup>
                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                  </Popup>
                </Marker>
              </Map>
            </div>
          </div>
          <div className='footer'>
            <div className='footerNameInside'>
              <p className='footerName'>© 2020 Marcos Rodríguez Ordieres.</p>
            </div>
            <div id='iconsWorkFooter' className='iconsWorkFooter'>
              <div className='iconGithub' id='iconGithub' onClick={this.valueOnClick.bind(this, 'iconGithub')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconGithub')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconGithub')}>
                <FontAwesomeIcon icon={['fab', 'github']}/>
              </div>
              <div className='iconLinkedin' id='iconLinkedin' onClick={this.valueOnClick.bind(this, 'iconLinkedin')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconLinkedin')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconLinkedin')}>
                <FontAwesomeIcon icon={['fab', 'linkedin']} size='5px' />
              </div>
              <div className='iconEmail' id='iconEmail' onClick={this.valueOnClick.bind(this, 'iconEmail')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconEmail')}onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconEmail')}>
                <FontAwesomeIcon icon='envelope' size='5px' />
              </div>
              <div className='iconPlay' id='iconPlay' onClick={this.valueOnClick.bind(this, 'iconPlay')} onMouseEnter={this.onMouseEnterHandler.bind(this, 'iconPlay')} onMouseLeave={this.onMouseLeaveHandler.bind(this, 'iconPlay')}>
                <FontAwesomeIcon icon={['fab', 'google-play']} size='5px' />
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
