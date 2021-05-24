import { LitElement, html } from '@polymer/lit-element'
import { render } from 'lit-html'
import Auth from './../Auth'
import App from './../App'
import Toast from './../Toast'
import moment from 'moment'


customElements.define('va-tracker', class Tracker extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      gratitude: {
        type: String
      },
      reflection: {
        type: String
      },
      movement: {
        type: String
      },
      variety: {
        type: String
      },
      user: {
        type: Object
      },    
      emotion: {
        type: String
      }               
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }
  
  render(){    
    return html`
    <style>
      .wrap {
        display: flex;
        flex-wrap: wrap;
      }
      h4 {
        text-align: left;
        font-size: 1em;
        font-weight: 400;
      }

      p {
        text-align: left;
        font-size: 0.8em;
        margin-bottom: 1.8em;
      }
      p.date {
        font-weight: 600;
      }
    </style>

    <sl-card class="tracker-card">
      <h4>I have gratitude for these things in my life:</h4>
      <p>${capitalize(this.gratitude)}</p>
      <h4>How much variety was in my meals:</h4>
      <p>${this.variety}</p>
      <h4>Eating these meals made me feel:</h4>
      <p>${this.emotion}</p>
      <h4>On reflection, my meals were:</h4>
      <p>${capitalize(this.reflection)}</p>
      <h4>How much movement I did:</h4>
      <p>${this.movement}</p>
      <p class="date">Tracker Entry: ${moment(Tracker.createdAt).format('MMMM Do YYYY')}</p>
    </sl-card>
    `
  }
  
})

function capitalize(string){
  if (typeof string !== 'string')return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
