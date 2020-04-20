import axios from "axios";
import apiUrl from './apiUrl';

const axiosData = ({ url, method='get', ...rest}) => axios({
  withCredentials: true,
  header: { "Access-Control-Allow-Origin": "*" },
  method, url,
  ...rest
});

export default {
  getCommentList() {
    return axiosData({ url: apiUrl.getCommentList })
  },
  deleteCommentItem(data) {
    return axiosData({ 
      url: apiUrl.deleteCommentItem,
      method: 'post',
      data,
    })
  },
}