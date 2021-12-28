# K6 API Performance test POC
## Features
- spike test
- stress test
- load test
- soak test

## Run test
```sh
k6 run -o influxdb=http://192.168.30.42:8086/k6 spike_test.js
```
## Tech

used technology
- js + k6
- influxdb
- grafana

## Spike test

>The goal of Spike testing is to see how the system responds to unexpected rise and fall of the user load. In Software > > Engineering Spike testing helps determine system performance will deterioration when there is a sudden high load.
> Another goal of Spike Testing is to determine the recovery time. Between two successive spikes of user load, the system > needs some time to stabilize. This recovery time should be as low as possible.

config
```
  stages: [
    { duration: "20s", target: 100 }, // below normal load
    { duration: "10s", target: 100 },
    { duration: "20s", target: 1400 }, // spike to 1400
    { duration: "20s", target: 100 }, // scale down
    { duration: "10s", target: 0 }, // scale to 0
  ],
```
grafana result

![image](https://i.imgur.com/j8Hk6Ye.png)

## Stress test
>A stress test is a type of performance test that checks the upper limits of your system by testing it under extreme loads. Stress tests examine how the system behaves under intense loads and how it recovers when going back to normal usage.

config
```
  stages: [
    { duration: "30s", target: 100 }, // below normal load
    { duration: "10s", target: 100 },
    { duration: "10s", target: 200 }, // normal load
    { duration: "10s", target: 200 },
    { duration: "10s", target: 300 }, // higher load
    { duration: "10s", target: 300 },
    { duration: "10s", target: 400 }, // highest load
    { duration: "10s", target: 400 },
    { duration: "10s", target: 0 }, // scale down
  ]
```

grafana result

![image](https://i.imgur.com/1G1kzZM.png)
## Load test
> Load Testing is a type of Performance Testing used to determine a system's behavior under both normal and peak conditions.
Load Testing is used to ensure that the application performs satisfactorily when many users access it at the same time.

```
stages: [
        { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ]
 ```   
 grafana result
 
 ![image](https://i.imgur.com/BzzNpyC.jpg)
 
 ## Soak test
 >A soak test uncovers performance and reliability issues stemming from a system being under pressure for an extended period.
Reliability issues typically relate to bugs, memory leaks, insufficient storage quotas, incorrect configuration or infrastructure failures. Performance issues typically relate to incorrect database tuning, memory leaks, resource leaks or a large amount of data.
 
```
stages: [
        { duration: '2m', target: 400 }, // ramp up 400 users
        { duration: '3h56m', target: 400 }, // stay at 100 users for 2 mins
        { duration: '2m', target: 0 }, // ramp down
         ]
 ``` 
 

## Installation Windows
k6
```sh
choco install k6
```
influxDB + grafana
```sh
docker pull philhawthorne/docker-influxdb-grafana:latest
```
```sh
docker run -d --name docker-influxdb-grafana -p 3003:3003   -p 3004:8083   -p 8086:8086   -v /path/for/influxdb:/var/lib/influxdb -v /path/for/grafana:/var/lib/grafana philhawthorne/docker-influxdb-grafana:latest
```

| Port | Service |
| ------ | ------ |
| 3003 | grafana |
| 3004 | chronograf |
| 8086 | influxdb |

### Grafana
```sh
Username: root
Password: root
```
preconfigured Grafana K6 dashboards
https://grafana.com/grafana/dashboards/2587

