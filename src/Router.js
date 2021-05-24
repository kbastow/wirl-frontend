// import views
import dashboardView from './views/pages/dashboard'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import aboutView from './views/pages/about'
import eatBlogView from './views/pages/eatBlog'
import mindBlogView from './views/pages/mindBlog'
import moveBlogView from './views/pages/moveBlog'
import savedListView from './views/pages/savedList'
import trackerView from './views/pages/tracker'
import trackerEntryView from './views/pages/trackerEntry'
import newBlogView from './views/pages/newBlog'

// define routes
const routes = {
	'/': dashboardView,
	'/about': aboutView,	
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,	
	'/eatBlog': eatBlogView,	
	'/mindBlog': mindBlogView,	
	'/moveBlog': moveBlogView,	
	'/savedList': savedListView,	
	'/tracker': trackerView,	
	'/trackerEntry': trackerEntryView,	
	'/newBlog': newBlogView	
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
