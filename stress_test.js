import http from 'k6/http'
import { sleep } from 'k6'
import { baseUrl } from "./vals.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    //vus: 1,
    //duration: '10s'
    stages: [
        { duration: '30s', target: 100 }, // below normal load
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 }, // normal load
        { duration: '10s', target: 200 },
        { duration: '10s', target: 300 }, // higher load
        { duration: '10s', target: 300 },
        { duration: '10s', target: 400 }, // highest load
        { duration: '10s', target: 400 },
        { duration: '10s', target: 0 }, // scale down
    ],
};

export default () => {
    http.batch([
        ['GET', baseUrl + "/notes", null, { tags: { ctype: 'html' } }],
    ])
};