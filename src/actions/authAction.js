import {apiCalls} from "./apiCalls";
import {sha256} from "js-sha256";

const ss_login_page_api_url = process.env.REACT_APP_SS_LOGIN_PAGE_API_URL;

export const signupUser = async(values)=>{
    const url = ss_login_page_api_url + "/api/v1/auth/register";
    const hashPassword = sha256(values.password);
    const reqObj = {
        name:values.name,
        email:values.email,
        password:hashPassword,
    };
    try {
        const result = await apiCalls("post", url,reqObj);
        return result.data;
    }catch(error){
        if(error.response){
            throw new Error(error.response.data.error);
        }else{
            console.error("signup, server err:", error.message);
            throw new Error(error.message);
        }
    }

}

export const signinUser = async(values)=>{
    const url = ss_login_page_api_url + "/api/v1/auth/signin";
    const hashPassword = sha256(values.password);
    const reqObj = {
        email:values.email,
        password:hashPassword,
    };
    try {
        const result = await apiCalls("post", url,reqObj);
        return result.data;
    }catch(error){
        if(error.response){
            throw new Error(error.response.data.error);
        }else{
            console.error("signin, server err:", error.message);
            throw new Error(error.message);
        }
    }

}



