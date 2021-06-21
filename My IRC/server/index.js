const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	},
});

const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
	getUserByName,
	getallRoom,
	newChannel,
	updateRooms,
} = require('./users.js');

const router = require('./router');

io.on('connect', (client) => {
	client.on('join', ({ name, room }) => {
		const { error, user } = addUser({ id: client.id, name, room });

		client.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${room}` });
		client.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

		client.join(user.room);
		io.to(user.room).emit('user_', { rooms: getallRoom() });
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
	});

	client.on('sendMessage', (message) => {
		const user = getUser(client.id);

		io.to(user.room).emit('message', { user: user.name, text: message });
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
		io.to(user.room).emit('user_', { rooms: getallRoom() });
	});

	client.on('disconnect', () => {
		const user = removeUser(client.id);

		if (user) {
			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
		}
	});

	client.on('changeName', (name, newName) => {
		const user = getUser(client.id);
		user.name = newName;
		io.to(user.room).emit('message', { user: 'admin', text: `${name} changed his nickname to ${newName}!` });
	});

	client.on('createChannel', (channel, name) => {
		const user = getUser(client.id);
		newChannel(channel);
		io.to(user.room).emit('message', { user: 'admin', text: `${name} created a new channel, ${channel}!` });
	});

	client.on('joinChannel', (channel, name) => {
		const user = getUser(client.id);
		const rooms = getallRoom();
		let roomExist = false;

		for (let i = 0; i < rooms.length; i++) {
			if (rooms[i] == channel) {
				roomExist = true;
			}
		}

		if (roomExist) {
			io.to(user.room).emit('message', { user: 'admin', text: `${name} changed channel to ${channel}!` });
			io.emit('resultJoin', true);
			user.room = channel;
		} else {
			io.to(user.room).emit('message', { user: 'admin', text: `This channel doesn't exist!` });
			io.emit('resultJoin', false);
		}
	});

	client.on('deleteChannel', (channel) => {
		const user = getUser(client.id);
		const rooms = getallRoom();
		let roomExist = false;
		let deletedRoom = null;

		for (let i = 0; i < rooms.length; i++) {
			if (rooms[i] == channel.toLowerCase().trim()) {
				roomExist = true;
				deletedRoom = rooms[i];
			}
		}

		if (roomExist) {
			if (deletedRoom === user.room) {
				for (let i = 0; i < rooms.length; i++) {
					if (deletedRoom === rooms[i]) {
						rooms.splice(i, 1);

						updateRooms(rooms);
						io.to(user.room).emit('message', { user: 'admin', text: `This channel has been deleted!` });
					}
				}

				io.to(user.room).emit('redirectHomePage');
				io.to(user.room).disconnectSockets();
			} else {
				for (let i = 0; i < rooms.length; i++) {
					if (deletedRoom === rooms[i]) {
						rooms.splice(i, 1);

						updateRooms(rooms);
						io.to(user.room).emit('message', { user: 'admin', text: `This channel has been deleted!` });
					}
				}
				io.to(deletedRoom).emit('redirectHomePage');
				io.to(deletedRoom).disconnectSockets();
			}
		} else {
			io.to(user.room).emit('message', { user: 'admin', text: `This channel doesn't exist!` });
		}
	});

	client.on('privateMessage', (user, message) => {
		const recipient = getUserByName(user.toLowerCase().trim());
		const sender = getUser(client.id);
		io.to(sender.id).emit('message', { user: `Private message for ${recipient.name}`, text: message });
		io.to(recipient.id).emit('message', { user: `Private message from ${sender.name}`, text: message });
	});

	client.on('roomList', () => {
		const rooms = getallRoom();
		const user = getUser(client.id);
		let message = 'List of active rooms : ';
		let room = '';

		for (let i = 0; i < rooms.length; i++) {
			room += `➡️${rooms[i]}`;
		}

		message += room;

		io.to(user.id).emit('message', { user: 'admin', text: message });
	});

	client.on('roomListWithOption', (option) => {
		const rooms = getallRoom();
		const user = getUser(client.id);

		let roomFound = [];

		for (let i = 0; i < rooms.length; i++) {
			if (rooms[i].match(option)) {
				roomFound.push(rooms[i]);
			} else {
				io.to(user.id).emit('message', { user: 'admin', text: 'No channel found' });
			}
		}

		if (roomFound.length > 0) {
			let message = `List of active rooms containing "${option}" : `;
			let MF = '';

			for (let i = 0; i < roomFound.length; i++) {
				MF += `➡️${roomFound[i]}`;
			}

			message += MF;

			io.to(user.id).emit('message', { user: 'admin', text: message });
		}
	});

	client.on('userList', (room) => {
		const user = getUser(client.id);
		const users = getUsersInRoom(room.toLowerCase().trim());
		let message = `List of active user in this channel : `;
		let usr = '';

		users.forEach((element) => {
			usr += ` ➡️ ${element.name} `;
		});

		message += usr;
		io.to(user.id).emit('message', { user: 'admin', text: message });
	});
});

app.use(router);

io.listen(5000, () => console.log(`Server has started on port ${PORT}`));
