import {getPictures} from './data.js';
import {renderGallery} from './gallery.js';
// import './popup.js';


const pictures = getPictures();
// renderPictures(pictures);
renderGallery(pictures);
