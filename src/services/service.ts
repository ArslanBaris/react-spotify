import axios from 'axios';
import {
    API_URL,
    AUTH_URL,
    CLIENT_ID,
    CLIENT_SECRET
} from '../config';
import { getCookie, setCookie } from 'typescript-cookie'
import {Buffer} from 'buffer';

export async function getAccessToken(){

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const headers = {
        "Authorization": `Basic ${btoa(CLIENT_ID+":"+CLIENT_SECRET).toString()}`,
        "content-type": "application/x-www-form-urlencoded"
    }

    await axios.post(AUTH_URL, params, {
        headers: headers
    }).then((resp) => {
        setCookie("token",resp.data.access_token)
    }).catch((err)=>{
        console.log(err)
    })
}

export async function getNewReleases(){
    const params = { 
        country:"TR",
        limit:50,
        offset:0
    }
    const headers = { 
        "Authorization": `Bearer ${getCookie("token")}`
    }
    const result = await axios.get(`${API_URL}/browse/new-releases`,{headers:headers,params:params})
    .then((resp)=>{
        return resp.data.albums.items
    }).catch((err)=>{
        console.log(err)
    })

    return result
}

export async function getFeaturedPlayLists(){
    const params = { 
        country:"TR",
        limit:50,
        offset:0
    }
    const headers = { 
        "Authorization": `Bearer ${getCookie("token")}`
    }
    
    const result = await axios.get(`${API_URL}/browse/featured-playlists`,{headers:headers,params:params})
    .then((resp)=>{
        return resp.data.playlists.items
    }).catch((err)=>{
        console.log(err)
    })

    return result
}

export async function getCategories(){
    const params = { 
        country:"TR",
        limit:50,
        offset:0
    }
    const headers = { 
        "Authorization": `Bearer ${getCookie("token")}`
    }
    const result = await axios.get(`${API_URL}/browse/categories`,{headers:headers,params:params})
    .then((resp)=>{
        return resp.data.categories.items
    }).catch((err)=>{
        console.log(err)
    })

    return result
}