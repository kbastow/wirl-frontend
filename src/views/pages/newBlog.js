import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import BlogAPI from './../../BlogAPI'
import Toast from '../../Toast'

class newBlogView {
  init(){
    document.title = 'New Blog Post'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newBlogSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await BlogAPI.newBlog(formData)
      Toast.show('Blog Added')
      submitBtn.removeAttribute('loading')
      // reset form and clear text and textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if (textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset file input
      const fileInput = document.querySelector('input[type=file]')
      if (fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Blog</h1>
        <div class="newblog-box">
          <sl-form class="form-signup" @sl-submit=${this.newBlogSubmitHandler}>
            <input type="hidden" name="user" value="${Auth.currentUser._id}" />
            <div class="input-group">
              <sl-input name="title" type="text" placeholder="Blog Title" required></sl-input>
            </div>
            <div class="input-group">              
              <sl-input name="category" type="text" placeholder="Category" required></sl-input>
            </div>
            <div class="input-group">
              <sl-textarea name="post" rows="15" placeholder="New Post" required></sl-textarea>
            </div>
            <div class="input-group" style="margin-bottom: 2em;">
              <label>Image</label><br>
              <input type="file" name="media" style="margin-bottom: 2em;"/>           
            </div>
            <sl-button type="primary" class="submit-btn" submit>Submit</sl-button>
          </sl-form>
        </div>      
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newBlogView()