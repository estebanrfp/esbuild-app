import Layout from './components/Layout'
// import './index.css'

// we check if the browser supports ServiceWorkers
if ('serviceWorker' in navigator) {
  // navigator
  //   .serviceWorker
  //   .register('sw.js') // path to the service worker file
  //   // the registration is async and it returns a promise
  //   .then(reg => console.log('Registration Successful'))

  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.installing; // the installing worker, or undefined
    reg.waiting; // the waiting worker, or undefined
    reg.active; // the active worker, or undefined
  
    reg.addEventListener('updatefound', () => {
      // A wild service worker has appeared in reg.installing!
      const newWorker = reg.installing;
  
      newWorker.state;
      // "installing" - the install event has fired, but not yet complete
      // "installed"  - install complete
      // "activating" - the activate event has fired, but not yet complete
      // "activated"  - fully active
      // "redundant"  - discarded. Either failed install, or it's been
      //                replaced by a newer version
  
      // newWorker.state has changed
      newWorker.addEventListener('statechange', () => console.log(newWorker.state))
    })
  })
  
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
    window.location.reload()
  })
}

// setInterval(() =>{ 
//   navigator.serviceWorker.ready.then(registration => registration.update())
// }, 5000)
navigator.serviceWorker.ready.then(registration => registration.update())

Layout()
