import http from 'k6/http'
import { sleep } from 'k6'
import { baseUrl } from "./vals.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    //vus: 1,
    //duration: '10s'
    stages: [
        { duration: '2m', target: 400 }, // ramp up 400 users
        { duration: '3h56m', target: 400 }, // stay at 100 users for 2 mins
        { duration: '2m', target: 0 }, // ramp down
    ],
};

export default () => {
    http.batch([
        ['GET', baseUrl + "/notes", null, { tags: { ctype: 'html' } }]
    ])
};