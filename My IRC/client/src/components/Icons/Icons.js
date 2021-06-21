import React from 'react';
import listRoom from '../../icons/listRoom.png';
import listUser from '../../icons/listUser.png';
import './Icon.css';

import { userList, roomList } from '../Utils/Utils';

import Create from './Create/Create';
import Nick from './Nick/Nick';
import Delete from './Delete/Delete';
import Join from './Join/Join';
import PrivateMessage from './PrivateMessage/PrivateMessage';

const Icon = ({ name, room, socket }) => {
	return (
		<div className="d-flex flex-column iconContainer">
			<Nick name={name} room={room} socket={socket} />
			<Create name={name} room={room} socket={socket} />
			<Delete name={name} room={room} socket={socket} />
			<Join name={name} room={room} socket={socket} />
			<PrivateMessage name={name} room={room} socket={socket} />
			<a onClick={() => userList(room, socket)}>
				<img className="icon" alt="userList Icon" src={listUser} />
			</a>
			<a onClick={() => roomList(socket)}>
				<img className="icon" alt="roomList Icon" src={listRoom} />
			</a>
		</div>
	);
};

export default Icon;
