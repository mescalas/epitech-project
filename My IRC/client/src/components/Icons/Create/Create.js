import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { createChannel } from '../../Utils/Utils';
import createIcon from '../../../icons/create.png';
import './Create.css';

const Create = ({ name, room, socket }) => {
	const [show, setShow] = useState(false);
	const [roomName, setRoomName] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const validate = () => {
		setShow(false);
		createChannel(roomName, name, socket);
	};

	return (
		<div>
			<a onClick={handleShow}>
				<img className="icon" alt="Create Icon" src={createIcon} />
			</a>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>New Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Enter the name of the new room :
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Name :</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="Name"
							aria-describedby="inputGroup-sizing-default"
							onChange={(event) => setRoomName(event.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button className="colorButton" onClick={validate}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Create;
