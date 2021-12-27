import http from 'k6/http'
import { sleep } from 'k6'
import { baseUrl } from "./vals.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 1,
    duration: '1s'
};

export default () => {
    console.log(baseUrl)
    http.get("")
    //sleep(1)
};