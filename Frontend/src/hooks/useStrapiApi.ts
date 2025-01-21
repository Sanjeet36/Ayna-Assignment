// File: hooks/useStrapiApi.js
import { useState } from 'react';
import axios from 'axios';
import useLocalStorage from './localStorageHook';
// import { BACKEND_URL, STRAPI_TOKEN } from '@/config';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your Strapi backend URL

const useStrapiApi = () => {

  const [loading, setLoading] = useState(false);

  const [token, setToken, clearToken] = useLocalStorage('jwtToken', '');

  const api = axios.create({
    baseURL ,
  });

  // Function to fetch data from Strapi
  const fetchData = async (endpoint: string) => {
    setLoading(true);
    try {
      const response = await api.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Replace with your method of token storage
        }
      } 
      );
      
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to post data to Strapi
  const postData = async (endpoint: string, postData: {}) => {
    setLoading(true);
    try {
      const response = await api.post(endpoint, postData);

      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData, postData };
};

export default useStrapiApi;
