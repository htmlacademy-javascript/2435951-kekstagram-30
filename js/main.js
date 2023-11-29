import { renderGallery } from './gallery.js';
import { loadPictures } from './api.js';
import { showErrorBanner } from './utils.js';
import { initFilter } from './filter.js';

async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilter(pictures);
  } catch {
    showErrorBanner();
  }
}
bootstrap();
