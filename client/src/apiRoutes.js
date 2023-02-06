import io from 'socket.io-client';

export const baseUrl = 'https://gee-so-purdy-api.herokuapp.com';

export const socket = io.connect(baseUrl, {'sync disconnect on unload': true});