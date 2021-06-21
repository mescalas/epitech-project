import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { changeName } from '../../Utils/Utils';
import nickIcon from '../../../icons/name.png';
import './Nick.css';


const Nick = ({ name, room, socket }) => {
	const [show, setShow] = useState(false);
	const [nickname, setNickname] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const validate = () => {
		setShow(false);
		changeName(nickname, name, room, socket);
	};

	return (
		<div>
			<a onClick={handleShow}>
				<img className="icon" alt="Name Icon" src={nickIcon} />
			</a>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>New Name</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Enter your future nickname:
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Nickname :</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="nickname"
							aria-describedby="inputGroup-sizing-default"
							onChange={(event) => setNickname(event.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button className="colorButton" onClick={validate}>
						Change
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Nick;
