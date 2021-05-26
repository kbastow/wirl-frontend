import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class AboutView {
  init(){
    document.title = 'About'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false }, 'json')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      
      <div class="page-content calign">

        <div class="about-section anim-in">
          <img class="about-logo" src="/images/logo.svg">        
          <h1>Tracker</h1>
          <h2>What is the WIRL Tracker?</h2>
          <img class="about-img" src="${App.apiBase}/images/moovin-shakin.png">
          <h3>A health kick without the guilt kick</h3>
          <p>The WIRL tracker is designed to give you a daily check in that prompts you to eat, move and think differently.</p>
          <sl-icon class="about-down" name="arrow-down"></sl-icon>
        </div>

        <div class="about-section">
          <h2>How does it work?</h2>
          <img class="about-img" src="${App.apiBase}/images/team.png">
          <h3>We created the WIRL Tracker to give you (and your health) a hug</h3>
          <p>We started WIRL, Wellness In Real Life, to encourage others to lead their own food and health journey. The WIRL Tracker empowers you to check in on your daily habits to become more mindful of your actions.</p>
          <sl-icon class="about-down" name="arrow-down"></sl-icon>
        </div>

        <div class="about-section">
          <h2>How to use the WIRL Tracker</h2>
          <img class="about-img" src="${App.apiBase}/images/flex.png">
          <h3>Become more intuitive with the way you eat, move and think</h3>
          <p>Use the WIRL Tracker each day to reflect your eating and movement habits. Reflect on your daily intake and output and how it makes you feel. Keep track of and reflect on your progress to empower yourself each day.</p>
          <sl-icon class="about-down" name="arrow-down"></sl-icon>
        </div>

        <div class="about-section">
          <h2>The How and The Why</h2>
          <img class="about-img" src="${App.apiBase}/images/food.png">
          <h3>Expert advice and delicious recipes to inspire change</h3>
          <p>We’ve teamed up with a bunch of legends to bring you all the goods. Learn from our Eat, Mind and Move teachings with expert advice to improve your mental and physical wellbeing!</p>
        </div>
        <div class="about-section">
        <sl-button type="primary" class="anim-in" @click=${() => gotoRoute('/')}>Go to Dashboard</sl-button>
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new AboutView()