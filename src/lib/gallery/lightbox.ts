import PhotoSwipeLightbox from 'photoswipe/lightbox';
export function attachLightbox(gallery: HTMLElement, children = 'a[data-pswp]') {
 const lightbox = new PhotoSwipeLightbox({ gallery, children, pswpModule: () => import('photoswipe'),
  bgOpacity:0.95, showHideAnimationType:'zoom', wheelToZoom:true, paddingFn:() => ({top:50,bottom:85,left:20,right:20}) });
 lightbox.on('uiRegister', () => {
  lightbox.pswp?.ui?.registerElement({name:'object-caption', order:9, isButton:false, appendTo:'root', html:'', onInit:(el,pswp) => {
   const update=() => { const data=pswp.currSlide?.data; el.textContent=String(data?.element?.getAttribute?.('data-caption') ?? data?.alt ?? ''); };
   pswp.on('change',update);update();
  }});
 });
 lightbox.init();
 return lightbox;
}
