import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import BlogAPI from './../../BlogAPI'
import Toast from '../../Toast'

class EatBlogView {
  async init(){
    document.title = 'Eat'  
    this.blogs = null  
    this.render()    
    Utils.pageIntroAnim()
    await this.getBlogs()
    this.filterBlogs('category', 'eat')
  }

  filterBlogs(field, match){
    if(!field || !match) return

    let filteredBlogs

    if(field == 'category'){
      filteredBlogs= this.blogs.filter(blog => blog.category == match)
      this.blogs= filteredBlogs
      this.render()
    }

  }

  async getBlogs(){
    try{
    this.blogs = await BlogAPI.getBlogs()
    console.log(this.blogs)
    
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        <h1>Eat</h1>
        <p>Blogs and recipes to inspire healthy bodies</p>
        <div class="blog-grid calign">
          ${this.blogs == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.blogs.map(blog => html`
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
      </div>      
    `
    render(template, App.rootEl)
  }
}

export default new EatBlogView()