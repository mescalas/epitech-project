import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { privateMessage } from '../../Utils/Utils';
import messageIcon from '../../../icons/message.png';
import './PrivateMessage.css';

const PrivateMessage = ({ name, room, socket }) => {
	const [show, setShow] = useState(false);
  const [option, setOption] = useState('');
  const [message, setMessage] = useState('');

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => setShow(true);

	const validate = () => {
		setShow(false);
		privateMessage(option, message, socket);
	};

	return (
		<div>
			<a onClick={handleShow}>
				<img className="icon" alt="Message Icon" src={messageIcon} />
			</a>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Private :</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Enter the recipient and content of your message :
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Name :</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="nickname"
							aria-describedby="inputGroup-sizing-default"
							onChange={(event) => setOption(event.target.value)}
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">Message :</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							aria-label="message"
							aria-describedby="inputGroup-sizing-default"
							onChange={(event) => setMessage(event.target.value)}
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button className="colorButton" onClick={validate}>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default PrivateMessage;
