//Changement de pseudo
export const changeName = (option, name, room, socket) => {
	const userName = name;
	const newName = option;
	window.history.pushState({}, '', `/chat?name=${option}&room=${room}`);
	socket.emit('changeName', userName, newName);
};

//Rejoindre un channel
export const joinChannel = (option, name, socket) => {
	socket.emit('joinChannel', option, name);
	socket.on('resultJoin', (data) => {
		if (data) window.location.href = `/chat?name=${name}&room=${option}`;
	});
};

//Creation de channel
export function createChannel(option, name, socket) {
	socket.emit('createChannel', option, name);
	window.location.href = `/chat?name=${name}&room=${option}`;
}

//Delete un channel
export const deleteChannel = (option, socket) => {
	socket.emit('deleteChannel', option);
};

//Messages privés
export const privateMessage = (user, message, socket) => {
	socket.emit('privateMessage', user, message);
};

//Liste des channels
export const roomList = (socket) => {
	socket.emit('roomList');
};

export const roomListWithOption = (option, socket) => {
	socket.emit('roomListWithOption', option);
};

//Liste des Users
export const userList = (room, socket) => {
	socket.emit('userList', room);
};
