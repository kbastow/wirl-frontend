import App from './../../App'
import {html, render } from 'lit-html'
import Auth from './../../Auth'
import Utils from './../../Utils'
import TrackerAPI from './../../TrackerAPI'
import Toast from './../../Toast'

class TrackerView {
  async init(){
    document.title = 'Tracker'  
    this.trackerEntries = null  
    this.render()    
    Utils.pageIntroAnim()
    await this.getTrackerEntries() 
  }

  async getTrackerEntries(){
    try{
      this.trackerEntries = await TrackerAPI.getTrackerEntries()
      console.log(this.trackerEntries)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="tracker page-content calign">
        <h1>Review your progress</h1>
        <h5>Here's where you'll find your WIRL Tracker entries.</h5>
        <h3>Review. Reflect. Reinvigorate.</h3>
        <div class="tracker-grid">
          ${this.trackerEntries == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.trackerEntries.map(tracker => html`
              <va-tracker class="tracker-card"
                id="${tracker._id}"
                gratitude="${tracker.gratitude}"
                reflection="${tracker.reflection}"
                movement="${tracker.movement}"
                variety="${tracker.variety}"
                emotion="${tracker.emotion}"
              >
            </va-tracker>
            `)}
          `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new TrackerView()