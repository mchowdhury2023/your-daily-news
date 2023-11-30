import axios from "axios";

const axiosPublic = axios.create({
      //for local
      baseURL: 'http://localhost:5000'

      //for production
     //baseURL: 'https://your-daily-news-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;