# Monolith and Microservice

In a monolith architecture with 2 endpoints "/" and "/stress-test" which perform expensive operations on the machine, when we run an autocannon test while monitoring the Morgan logger metrics over a 30-second test run, you will see only one endpoint (either "/" or "/stress-test") will respond:

Metrics:
<img width="600" alt="image" src="https://github.com/user-attachments/assets/4dd94343-458d-41de-96bb-f295f1bf91fc" />


# Microservice

When we split the endpoints into microservices using express-http-proxy and route the traffic to 2 different Node processes, running the same autocannon test while monitoring the Morgan logger shows that both endpoints will respond:

Metrics:
<img width="601" alt="image" src="https://github.com/user-attachments/assets/7ed813fc-1e61-42ce-a34e-65a0fcef9776" />


Now, when we scale up the "/stress-test" endpoint with cluster and OS modules by creating service workers on each CPU core available and run this endpoint, we can see a drastic difference in the API response:

Metrics:
<img width="596" alt="image" src="https://github.com/user-attachments/assets/5a3303b9-558c-405b-8718-a7c32e8d31f8" />


This demonstrates how easy it is to scale up endpoints with a microservice implementation.
