import axios from "axios";

export const searchData = async (payload) => {
 const res= await axios.post("https://claimspaymentdemo20230920153520.azurewebsites.net/api/getpaymentkeywords", {
    ...payload,
  },{
      headers: {
        'content-type': 'text/json'
    }
  });
  return res.data
};
