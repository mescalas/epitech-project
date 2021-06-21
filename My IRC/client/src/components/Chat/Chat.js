import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';
import Icons from '../Icons/Icons';

import {
	changeName,
	joinChannel,
	createChannel,
	deleteChannel,
	privateMessage,
	roomList,
	roomListWithOption,
	userList,
} from '../Utils/Utils';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState('');
	const [rooms, setRooms] = useState([]);

	const commands = ['nick', 'list', 'create', 'delete', 'join', 'part', 'users', 'msg'];

	const endPoint = 'localhost:5000';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(endPoint);

		setName(name);
		setRoom(room);
		socket.emit('join', { name, room });

		socket.on('user_', (data) => {
			setRooms(data.rooms);
		});

		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [endPoint, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});

		socket.on('user_', (data) => {
			setRooms(data.rooms);
			console.log(data.rooms);
		});

		socket.on('redirectHomePage', () => {
			window.location.href = '/';
		});

	}, [messages, rooms]);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message.charAt(0) === '/') {
			const string = message.split(' ');
			const cds = string[0].substr(1).trim();

			switch (cds) {
				case 'list':
					if (string[1]) {
						roomListWithOption(string[1], socket);
						break;
					} else {
						roomList(socket);
						break;
					}
				case 'users':
					userList(room, socket);
					break;
			}

			if (string[1]) {
				const option = string[1];

				for (let i = 0; i < commands.length; i++) {
					if (cds === commands[i]) {
						switch (commands[i]) {
							case 'nick':
								changeName(option, name, room, socket);
								break;
							case 'create':
								createChannel(option, name, socket);
								break;
							case 'delete':
								deleteChannel(option, socket);
								break;
							case 'join':
								joinChannel(option, name, socket);
								break;
							case 'part':
								window.location.href = '/';
								alert('See you soon!');
								break;
							case 'msg':
								if (string[1] && string[2]) {
									const user = string[1];
									let msg = string.slice(2);
									msg = msg.join(' ');
									privateMessage(user, msg, socket);
									break;
								} else {
									alert('Please enter a message and a user.');
									break;
								}
						}
					}
				}
			} else {
				return alert('Please enter a setting for your command');
			}
		} else {
			if (message) {
				socket.emit('sendMessage', message, () => setMessage(''));
			}
		}
	};

	return (
		<div className="outerContainer">
			<Icons name={name} room={room} socket={socket} />
			<div className="container p-0">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>

			<TextContainer users={users} rooms={rooms} />
		</div>
	);
};

export default Chat;
