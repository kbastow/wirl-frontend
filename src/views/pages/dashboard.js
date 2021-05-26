import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class DashboardView {
  init(){    
    console.log('DashboardView.init')
    document.title = 'Dashboard'    
    this.render()    
    Utils.pageIntroAnim()    
    Utils.drawerAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        <div class="dashboard anim-in">
          <img class="welcome-img" src="${App.apiBase}/images/hand.png">
          <h1>Hey ${Auth.currentUser.firstName},</h1>
          <h4>It's nice to see you.</h4>
          <a href="/savedList" @click="${anchorRoute}"><h2><sl-icon style="font-size: 12px; padding-right: 0.5em;" name="heart"></sl-icon>My Saved List</h2></a>
          
          <div class="tracker">
            <img class="dashboard-logo" src="/images/logo.svg">        
            <h3>Tracker</h3>
            <sl-button class="tracker-btn-1" type="primary" @click=${() => gotoRoute('/trackerEntry')}>NEW Entry
              <sl-icon name="pencil-square"></sl-icon>
            </sl-button>
            <sl-button class="tracker-btn-2" type="primary" @click=${() => gotoRoute('/tracker')}>View progress
              <sl-icon name="clipboard-data"></sl-icon>
            </sl-button>
          </div>

          <div class="drawer-nav">
            <h2>Learn from the experts</h2>
            <p>Discover mindfulness techniques, learn new recipes and be inspired to get moving</p>
            <sl-drawer label="Learn" placement="bottom" class="drawer-placement-bottom" style="--size: 75vh;">
              <h5>Eat</h5>
              <p class="info">Info and recipes for healthy minds and bodies</p>
              <a class="more-info" href="/eatBlog" @click="${anchorRoute}">Go to Eat<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
              <h5>Mind</h5>
              <p class="info">Discover meditation and mindfulness techniques</p>
              <a class="more-info" href="/mindBlog" @click="${anchorRoute}">Go to Mind<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
              <h5>Move</h5>
              <p class="info">Get motivated to move your body</p>
              <a class="more-info" href="/moveBlog" @click="${anchorRoute}">Go to Move<sl-icon style="font-size: 12px; padding-left: 0.5em;" name="caret-right"></sl-icon></a>
              <sl-button slot="footer" type="primary">Close</sl-button>  
            </sl-drawer>
            <sl-button type="primary">Learn</sl-button>
          </div>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new DashboardView()