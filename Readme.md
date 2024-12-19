# Monolith and Microservice

In a monolith architecture with 2 endpoints "/" and "/stress-test" which perform expensive operations on the machine, when we run an autocannon test while monitoring the Morgan logger metrics over a 30-second test run, you will see only one endpoint (either "/" or "/stress-test") will respond:

Metrics:
Total Requests for http://localhost:3000 in 30.21s: 2
Total Requests for http://localhost:3000/stress-test in 30.2s: 0

# Microservice

When we split the endpoints into microservices using express-http-proxy and route the traffic to 2 different Node processes, running the same autocannon test while monitoring the Morgan logger shows that both endpoints will respond:

Metrics:
Total Requests for http://localhost:3000 in 30.21s: 1
Total Requests for http://localhost:3000/stress-test in 30.2s: 1

Now, when we scale up the "/stress-test" endpoint with cluster and OS modules by creating service workers on each CPU core available and run this endpoint, we can see a drastic difference in the API response:

Metrics:
Total Requests for http://localhost:3000 in 30.2s: 1
Total Requests for http://localhost:3000/stress-test in 30.2s: 8

This demonstrates how easy it is to scale up endpoints with a microservice implementation.
