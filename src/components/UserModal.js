import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  useSelector } from 'react-redux';

export default function MyVerticallyCenteredModal(props) {
    const { singleItemFullInfo } = useSelector(state => state.users)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User Full Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-mine'>
                <div className='info-item'>
                    <h5>Full Name</h5>
                    <p>{`${singleItemFullInfo.firstName} ${singleItemFullInfo.lastName}`}</p>
                </div>
                <div className='info-item'>
                    <h5>Address</h5>
                    <div className='address-details'>
                        <div>
                            <span>street address: </span>
                            <span>{singleItemFullInfo.address.streetAddress}</span>
                        </div>
                        <div>
                            <span>city: </span>
                            <span>{singleItemFullInfo.address.city}</span>
                        </div>
                        <div>
                            <span>zip: </span>
                            <span>{singleItemFullInfo.address.zip}</span>
                        </div>
                    </div>
                </div>
                <div className='info-item'>
                    <h5>Email</h5>
                    <p>{singleItemFullInfo.email}</p>
                </div>
                <div className='info-item'>
                    <h5>About</h5>
                    <p>{singleItemFullInfo.description}</p>
                </div>
                <div className='info-item'>
                    <h5>Phone</h5>
                    <p>{singleItemFullInfo.phone}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className='modal-footer-mine'>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
