import http from 'k6/http'
import { sleep } from 'k6'
import { baseUrl } from "./vals.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    //vus: 1,
    //duration: '10s'
    stages: [
        { duration: '1m', target: 100 }, // ramp up
        { duration: '2m', target: 100 }, // stay at 100 users for 2 mins
        { duration: '1m', target: 0 }, // ramp down
    ],
};

export default () => {
    http.batch([
        ['GET', baseUrl + "/notes", null, { tags: { ctype: 'html' } }]
    ])
};