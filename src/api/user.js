import {getTokenApi} from './auth';

export function getUserApi(id){

    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
}