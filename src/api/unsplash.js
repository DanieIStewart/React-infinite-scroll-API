import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID bOxjRA3EArwBgkQiJCDdUnbP7UOggNwEHeuHhpOEtu0'
  }
});