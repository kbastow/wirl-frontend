import App from './../../App'
import {html, render } from 'lit-html'

class FourOFourView{
  init(){
    console.log('FourOFourView.init')    
    document.title = '404 File not found'    
    this.render()
  }

  render(){
    const template = html`    
      <div class="calign">
        <h1>Oh no!</h1>
        <p>Sorry, we couldn't find that page.</p>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()