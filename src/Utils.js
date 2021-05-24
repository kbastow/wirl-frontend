import gsap from 'gsap'

class Utils {

  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }

  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -20}, {opacity: 1, y: 0, ease: 'power4.out', duration: 1.8})
  }

  drawerAnim(){
    const drawer = document.querySelector('.drawer-placement-bottom');
    const openButton = drawer.nextElementSibling;
    const closeButton = drawer.querySelector('sl-button[type="primary"]');
  
    openButton.addEventListener('click', () => drawer.show());
    closeButton.addEventListener('click', () => drawer.hide());
  }
}

export default new Utils()
