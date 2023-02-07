import io from 'socket.io-client';

export const baseUrl = 'http://localhost:3001';
// export const baseUrl = 'https://gee-so-purdy.herokuapp.com';

export const socket = io.connect(baseUrl, {'sync disconnect on unload': true});