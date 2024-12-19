const autocannon = require('autocannon')

const instance1 = autocannon({
  url: 'http://localhost:3000',
  connections: 10, // number of concurrent connections
  duration: 30, // duration in seconds
  pipelining: 1, // default 1
  headers: {
    'Content-Type': 'application/json'
  }
}, (err, results) => {
  if (err) {
    console.error('Error running autocannon for first URL:', err)
    return
  }
  console.log(`Total Requests for ${results.url} in ${results.duration}s: ${results.requests.total}`)
})

const instance2 = autocannon({
  url: 'http://localhost:3000/stress-test',
  connections: 10,
  duration: 30,
  pipelining: 1,
  headers: {
    'Content-Type': 'application/json'
  }
}, (err, results) => {
  if (err) {
    console.error('Error running autocannon for second URL:', err)
    return
  }
  console.log(`Total Requests for ${results.url} in ${results.duration}s: ${results.requests.total}`)
})

// Log progress while running
autocannon.track(instance1, {
    renderProgressBar: false,
    renderLatencyTable: false,
    renderResultsTable: false,
    renderStatusCodeTable: false,
    renderPercentileTable: false,
    onTestComplete: (results) => {
      console.log(`Total Requests for ${results.url} in ${results.duration}s: ${results.requests.total}`)
    }
})

autocannon.track(instance2, {
    renderProgressBar: false,
    renderLatencyTable: false,
    renderResultsTable: false,
    renderStatusCodeTable: false,
    renderPercentileTable: false,
    onTestComplete: (results) => {
      console.log(`Total Requests for ${results.url} in ${results.duration}s: ${results.requests.total}`)
    }
})

// This will ensure the process exits when the test is complete
process.once('SIGINT', () => {
  instance1.stop()
  instance2.stop()
})
