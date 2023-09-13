// deployed url
export const BASE_FRONTEND_URL = '/automated-dataset-generation';
export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://backend-dot-automated-dataset-generation.wl.r.appspot.com';

// dev url
// export const BASE_FRONTEND_URL = '/automated-dataset-generation-dev';
// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://backend-dev-dot-automated-dataset-generation.wl.r.appspot.com';

export const ALERT_DURATION = 3000;
export const HEADER_HEIGHT = 64;  // px