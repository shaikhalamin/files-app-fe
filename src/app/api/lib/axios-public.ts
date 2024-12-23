import axios from 'axios'
import { API_URLS } from '../api-urls'

export const axiosPublic = axios.create({
  baseURL: `${API_URLS.base_url}`,
  headers: {
    'Content-Type': 'application/json'
  }
})
