import http from 'k6/http'
import { sleep } from 'k6'
import { baseUrl } from "./vals.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    //vus: 1,
    //duration: '10s'
    stages: [
        { duration: '20s', target: 100 }, // below normal load
        { duration: '10s', target: 100 },
        { duration: '20s', target: 1400}, // spike to 1400
        { duration: '20s', target: 100 }, // scale down
        { duration: '10s', target: 0 }, // scale to 0
    ],
};

export default () => {
    http.batch([
        ['GET', baseUrl + "/notes", null, { tags: { ctype: 'html' } }]
    ])
};