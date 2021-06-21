const users = [];
let rooms = [];

const addUser = ({ id, name, room }) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => user.room === room && user.name === name);

	if (existingUser) return { error: 'Username is taken' };

	const user = { id, name, room };

	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserByName = (name) => users.find((user) => user.name === name);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const allUsers = () => {
	return users;
};

const getallRoom = () => {
	users.map((user) => {
		rooms.push(user.room);
	});

	let unique = [];
	unique = [...new Set(rooms)];

	return unique;
};

const newChannel = (channel) => {
	rooms.push(channel);
};

const updateRooms = (newRooms) => {
	rooms = [];
	for (let i = 0; i < newRooms.length; i++) {
		rooms.push(newRooms[i]);
	}
};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUserByName,
	getUsersInRoom,
	allUsers,
	getallRoom,
	newChannel,
	updateRooms,
};
