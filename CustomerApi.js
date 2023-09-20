import axios from "axios";

const DOMAIN = 'https://52.64.235.44';

const CustomerApi = {
    //Get 회원정보 token 으로 가죠오기
  getCustomerInfo: async (token) => {
    return await axios.get(DOMAIN + "/customer/profile",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

export default CustomerApi;