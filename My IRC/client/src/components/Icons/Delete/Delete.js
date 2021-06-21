import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { deleteChannel } from '../../Utils/Utils';
import deleteIcon from '../../../icons/delete.png';
import './Delete.css';


const Delete = ({ name, room, socket }) => {
	const [show, setShow] = useState(false);
	const [option, setOption] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const validate = () => {
		setShow(false);
		deleteChannel(option, socket);
	};

	return (
		<div>
			<a onClick={handleShow}>
				<img className="icon" alt="Delete Icon" src={deleteIcon} />
			</a>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Delete Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Enter the name of the room you want to delete :
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
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Delete;
