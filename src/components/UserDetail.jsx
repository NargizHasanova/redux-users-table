import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { setUser, setUserAdress, submitChanges } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function UserDetail() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()

  function saveChanges() {
    dispatch(submitChanges())
    navigate("/")
    console.log(user);
  }
  
  return (
    <div className="user-edit-box">
      <div className="modal-body-mine">
        <div className="info-item info-item-edit">
          <h5>First Name</h5>
          <input
            type="text"
            value={user.firstName}
            name="firstName"
            onChange={(e) => dispatch(setUser(e.target))}
          />
        </div>
        <div className="info-item info-item-edit">
          <h5>Last Name</h5>
          <input
            type="text"
            value={user.lastName}
            name="lastName"
            onChange={(e) => dispatch(setUser(e.target))}
          />
        </div>
        <div className="info-item info-item-edit">
          <h5>Address</h5>
          <div className="address-details address-details-edit">
            <div>
              <span>street address: </span>
              <input
                type="text"
                value={user.address.street}
                name="street"
                onChange={(e) => dispatch(setUserAdress(e.target))}
              />
            </div>
            <div>
              <span>city: </span>
              <input
                type="text"
                value={user.address.city}
                name="city"
                onChange={(e) => dispatch(setUserAdress(e.target))}
              />
            </div>
            <div>
              <span>zip: </span>
              <input
                type="text"
                value={user.address.zip}
                name="zip"
                onChange={(e) => dispatch(setUserAdress(e.target))}
              />
            </div>
          </div>
        </div>
        <div className="info-item info-item-edit">
          <h5>Email</h5>
          <input
            type="text"
            value={user.email}
            name="email"
            onChange={(e) => dispatch(setUser(e.target))}
          />
        </div>
        <div className="info-item info-item-edit">
          <h5>About</h5>
          <textarea
            type="text"
            name="about"
            value={user.about}
            id=""
            cols="55"
            rows="10"
            onChange={(e) => dispatch(setUser(e.target))}
          ></textarea>
        </div>
        <div className="info-item info-item-edit">
          <h5>Phone</h5>
          <input
            type="text"
            value={user.phone}
            name="phone"
            onChange={(e) => dispatch(setUser(e.target))}
          />
        </div>
      </div>
      <div className="edit-btns">
        <Button
          variant="secondary"
          className="goback-btn"
          onClick={() => navigate('/')}
        >
          Go Back
        </Button>
        <Button
          variant="warning"
          className="user-detail-submit-button"
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
