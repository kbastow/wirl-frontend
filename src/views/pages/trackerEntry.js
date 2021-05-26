import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import TrackerAPI from './../../TrackerAPI'
import Toast from './../../Toast'

class TrackerEntryView {
  init(){
    document.title = 'Tracker Entry'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newTrackerSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await TrackerAPI.newTrackerEntry(formData)
      Toast.show('Entry Added')
      submitBtn.removeAttribute('loading')
      // reset form and clear text and textarea inputs
      const textInputs = document.querySelectorAll('sl-input')
      if (textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if (radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))

    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

    // create sl-dialog for completed entry
    const dialogEl = document.createElement('sl-dialog')
    // add class name
    dialogEl.className = 'tracker-dialog'

    // sl-dialog content
    const dialogContent = html`
    <style>
    .wrap {
        display: flex;
        flex-wrap: wrap;
    }
   
    .content {
        margin-left: 2em;
        margin-right: 2em;
        text-align: left;
        padding-bottom: 1em;
    }
    
    .learn-links {
      font-size: 0.8em;
      margin-bottom: 2em;
      line-height: 1.5em;
    }

    a.more {
      display: block;
      padding-bottom: 1.2em;
    }

    </style>
    
    <div class="wrap">
      <div class="content">
        <h1>Congrats!</h1>
        <p>You've completed your tracker entry for the day.</p>
        <div class="learn-links">
          <p>Learn from the experts. Looking for some inspiration to be more mindful about your daily habits?</p>
            <a class="more" href="/eatBlog" @click="${anchorRoute}">Go to Eat<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
            <a class="more" href="/mindBlog" @click="${anchorRoute}">Go to Mind<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
            <a class="more" href="/moveBlog" @click="${anchorRoute}">Go to Move<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
            </div>
        <sl-button type="primary" class="anim-in" @click=${() => gotoRoute('/')}>Return to Dashboard</sl-button>         
      </div>
    </div>
    `
    render(dialogContent, dialogEl)

    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()

    // on close, delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  render(){
    const template = html`
      <div class="page-content calign">
        <div class="newtracker-box">
          <sl-icon-button class="close-tracker" name="x-circle-fill" label="Close" @click=${() => gotoRoute('/')} style="font-size: 1.5em; margin-top: -2em;"></sl-icon-button><br>
          <img class="tracker-logo" src="/images/logo.svg">        
          <h3>Tracker</h3>
                    
          <h1>New Entry</h1>
          <sl-form class="form-tracker" @sl-submit=${this.newTrackerSubmitHandler}>
            <input type="hidden" name="user" value="${Auth.currentUser._id}" />
            <div class="input-tracker">
            <h3>What are you grateful for today?</h3><br>
              <sl-input name="gratitude" type="text" placeholder="Try and list at least 3 things..." required></sl-input>
            </div>
            <div class="input-tracker">
            <h3>Colour is a great indicator of a balanced diet.<br>How much colour did you pack into your meals today?</h3><br>
            <img class="colour-img" src="${App.apiBase}/images/1colour.png">
            <img class="colour-img" src="${App.apiBase}/images/2colour.png">
            <img class="colour-img" src="${App.apiBase}/images/3colour.png">
            <img class="colour-img" src="${App.apiBase}/images/4colour.png"><br>              
              <sl-radio-group label="Select an option" no-fieldset required>
                <sl-radio class="radio" name="variety" value="Just enough">Just enough</sl-radio>
                <sl-radio class="radio" name="variety" value="A little colour">A little colour</sl-radio>
                <sl-radio class="radio" name="variety" value="Heaps of colour">Heaps of colour</sl-radio>
                <sl-radio class="radio" name="variety" value="All the colour">All the colour</sl-radio>
              </sl-radio-group>
            </div>
            <div class="input-tracker">
            <h3>Thinking about your last meal, how did your food make you feel?</h3><br>
              <img class="emotion-img" src="${App.apiBase}/images/negative.png">
              <img class="emotion-img" src="${App.apiBase}/images/guilty.png">
              <img class="emotion-img" src="${App.apiBase}/images/content.png">
              <img class="emotion-img" src="${App.apiBase}/images/happy.png">
              <img class="emotion-img" src="${App.apiBase}/images/excited.png"><br>
              <sl-radio-group label="Select an option" no-fieldset required>
                <sl-radio class="radio" name="emotion" value="Negative">Negative</sl-radio>
                <sl-radio class="radio" name="emotion" value="Guilty">Guilty</sl-radio>
                <sl-radio class="radio" name="emotion" value="Content">Content</sl-radio>
                <sl-radio class="radio" name="emotion" value="Happy">Happy</sl-radio>
                <sl-radio class="radio" name="emotion" value="Excited">Excited</sl-radio>
              </sl-radio-group>    
            </div>
            <div class="input-tracker">
            <h3>What words would you use to describe your last meal? Think about the flavour, texture & smell.</h3><br>
              <sl-input name="reflection" type="text" placeholder="Try and list at least 5 words..." required></sl-input>
            </div>
            <div class="input-tracker">
            <h3>How much movement did you give your body today?</h3><br>
              <img class="movement-img" src="${App.apiBase}/images/rest-day.png">
              <img class="movement-img" src="${App.apiBase}/images/working-on-it.png">
              <img class="movement-img" src="${App.apiBase}/images/moovin-shakin.png"><br>              
              <sl-radio-group label="Select an option" no-fieldset required>
                <sl-radio class="radio" name="movement" value="Still working on it">Still working on it</sl-radio>
                <sl-radio class="radio" name="movement" value="I got moving a little">I got moving a little</sl-radio>
                <sl-radio class="radio" name="movement" value="Movin' and shakin'">Movin' and shakin'</sl-radio>
              </sl-radio-group>
            </div>
            <sl-button type="primary" class="submit-btn" submit>Submit</sl-button>
          </sl-form>
        </div>  
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TrackerEntryView()