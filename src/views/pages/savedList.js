import App from './../../App'
import {html, render } from 'lit-html'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class SavedListView {
  async init(){
    document.title = 'Saved List'
    this.savedBlogList = null    
    this.render()    
    Utils.pageIntroAnim()
    await this.getSavedBlogs()
  }

  async getSavedBlogs(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.savedBlogList = currentUser.savedBlogs
      console.log(this.savedBlogList)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">

        <h1>My Saved List</h1>
        <p>Stay inspired</p>
        <div class="blog-grid calign">
          ${this.savedBlogList == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.savedBlogList.map(blog => html`
              <va-blog class="blog-card"
                id="${blog._id}"
                title="${blog.title}"
                post="${blog.post}"
                category="${blog.category}"
                media="${blog.media}"
                user="${JSON.stringify(blog.user)}"
              >
            </va-blog>
            `)}
          `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new SavedListView()