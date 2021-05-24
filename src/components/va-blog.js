import { LitElement, html } from '@polymer/lit-element'
import { render } from 'lit-html'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-blog', class Blog extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      title: {
        type: String
      },
      post: {
        type: String
      },
      media: {
        type: String
      },
      category: {
        type: String
      },
      user: {
        type: Object
      },    
      link: {
        type: String
      }                 
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  viewPostHandler(){
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add class name
    dialogEl.className = 'blog-dialog'

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
    }

    .frame {
      display: block;
      margin-bottom: 1em;
    }
    
    </style>
    
    <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.media}" alt="${this.title}" />
        </div>
      <div class="content">
        <h1>${this.title}</h1>
        <p>${this.post}</p>
          <sl-responsive-media class="frame" aspect-ratio="16:9">
            <iframe id="urlFrame" frameborder="0" allow="autoplay" fullscreen="allowfullscreen" fit="contain" src="${this.link}"></iframe>
          </sl-responsive-media>
        <sl-button type="primary" @click=${this.saveBlogsHandler.bind(this)}>
          <sl-icon slot="prefix" name="heart-fill"></sl-icon>Save
        </sl-button>
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

  async saveBlogsHandler(){    
    try {
      await UserAPI.addSavedBlogs(this.id)
      Toast.show('Blog added to Saved List')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    return html`
    <style> 
      .wrap {
        display: flex;
        flex-wrap: wrap;
      }

      img {
        display: inline-block;
        width: 95%;
        padding-top: 0.5em;
      }

      h2 {
        text-align: left;
        font-size: 1.2em;
        padding-top: 1em;
      }

      p {
        text-align: left;
        font-size: 0.9em;
        padding-bottom: 2em;
      }

      .author {
          font-size: 0.8em;
          font-style: italic;
      }
      .buttons {
        text-align: left;
        padding-bottom: 2em;
    }
    </style>

    <sl-card>
      <img slot="image" src="${App.apiBase}/images/${this.media}" />
      <h2>${capitalize(this.title)}</h2>
      <p>${truncate(this.post, 20)}</p>
      <p class="author">By ${this.user.firstName}</p>
      <div class="buttons">
        <sl-button type="primary" @click=${this.viewPostHandler.bind(this)}>View post</sl-button>
        <sl-button type="primary" @click=${this.saveBlogsHandler.bind(this)}>
          <sl-icon slot="prefix" name="heart-fill"></sl-icon>Save
        </sl-button>        
      </div>
      </sl-card>
    `
  }
  
})

function truncate(string, numWords){
  string = string.replace(/(\r\n|\n|\r)/gm,"")
  let truncatedString = string.split(" ").splice(0, numWords).join(" ")
  truncatedString += '...'
  return truncatedString
}

function capitalize(string){
  if (typeof string !== 'string')return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
