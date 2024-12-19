const express = require("express")
const morgan = require("morgan")
const app = express();


const cluster = require("cluster");
const os = require("os");

if(cluster.isMaster){
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);

    for(let i = 0; i< numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log(`forking new worker...`)
        cluster.fork();
    })
} else {
    app.use(morgan("dev"))
    app.get("/", (req,res) => {
        for(let i = 0; i<10000000000;i++){
            
        }
        res.send("hello world")
    })
    app.listen(3002, () => console.log(`stress service worker ${process.pid} is running on http://localhost:3002`))
}


