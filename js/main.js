import { renderGallery } from './gallery.js';
import './load-picture.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorBanner } from './utils.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch {
    showErrorBanner();
  }
}
bootstrap();
