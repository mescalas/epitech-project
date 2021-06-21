import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users, rooms }) => (
	<div className="textContainer">
		{users ? (
			<div>
				<div className="listContainer">
					<h1>People currently chatting:</h1>
				</div>
				<div className="activeContainer">
					<h2>
						{users.map(({ name }) => (
							<div key={name} className="activeItem">
								➡️ {name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}

		{rooms ? (
			<div>
				<div className="listContainer">
					<h1>Channel currently active:</h1>
				</div>
				<div className="activeContainer">
					<h2>
						{rooms.map((room) => (
							<div key={room} className="activeItem">
								➡️ {room}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}
	</div>
);

export default TextContainer;
