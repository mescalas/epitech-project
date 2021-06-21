import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { joinChannel } from '../../Utils/Utils';
import joinIcon from '../../../icons/join.png';
import './Join.css';

const Join = ({ name, room, socket }) => {
	const [show, setShow] = useState(false);
	const [option, setOption] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const validate = () => {
		setShow(false);
		joinChannel(option, name, socket);
	};

	return (
		<div>
			<a onClick={handleShow}>
				<img className="icon" alt="Join Icon" src={joinIcon} />
			</a>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Join Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Enter the name of the room you want to join :
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Room :</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="nickname"
							aria-describedby="inputGroup-sizing-default"
							onChange={(event) => setOption(event.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button className="colorButton" onClick={validate}>
						Join
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Join;
