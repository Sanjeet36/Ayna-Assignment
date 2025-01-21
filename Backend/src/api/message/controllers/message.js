'use strict';

/**
 * message controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::message.message');

// module.exports = createCoreController('api::message.message', ({ strapi }) => ({

//   async initialize() {
//     const { io } = strapi.plugins['socket-io'].services;

//     io.on('connection', (socket) => {
//       console.log("ETSETO:SE CONNECTED VBITCH!!!");

//       // Send "Hello, world!" to the client every 1 second
//       const intervalId = setInterval(() => {
//         socket.emit('hello.world', {
//           message: 'Hello, world!',
//           timestamp: new Date(),
//         });
//       }, 1000);

//       socket.on('message.created', (data) => {
//         // Handle the 'message.created' event
//         console.log('New message created:', data);

//         // Send a response back to the client
//         socket.emit('message.created.response', {
//           message: `Received message: ${data}`,
//           timestamp: new Date(),
//         });

//         // Implement custom logic here, such as notifying other clients
//       });

//       socket.on('message', (data) => {
//         // Handle the 'message' event
//         console.log('New message:', data);

//         // Send a response back to the client
//         socket.emit('message.response', {
//           message: `Received message: ${data}`,
//           timestamp: new Date(),
//         });

//         // Implement custom logic here, such as notifying other clients
//       });

//       // Clear the interval when the client disconnects
//       socket.on('disconnect', () => {
//         clearInterval(intervalId);
//         console.log('Client disconnected');
//       });
//     });
//   },
// }));
