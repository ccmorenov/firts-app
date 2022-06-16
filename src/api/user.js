//import { result } from 'lodash';
import {getTokenApi} from './auth';

export function getUserApi(id){

    
    // eslint-disable-next-line no-template-curly-in-string
    const url= `http://localhost:8080/verperfil?id=${id}`;

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    };

    return fetch(url, params).then(response => {
        // eslint-disable-next-line no-throw-literal
        if(response.status >= 400) throw null
        return response.json();
    })
    .then(result =>{  
        return result;
    }).catch(err =>{
        return err;
    });
}