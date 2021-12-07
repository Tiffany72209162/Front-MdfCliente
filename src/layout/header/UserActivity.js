import React, { useState } from 'react'
import man from '../../assets/images/dashboard/profile-image.png'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { LogOut, Users } from 'react-feather'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

const UserActivity = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        <span className="media user-header"><img className="mr-2 rounded-circle img-35" src={man} style={{ width: "35px", height: "35px" }} alt="" />
          <span className="media-body">
            <span className="d-block">administrador</span></span></span>
      </DropdownToggle>
      <DropdownMenu className="p-0">
        <ul className="profile-dropdown">
          <li className="gradient-primary-1">
            <span>administrador</span>
            {/* <h6 className="mb-0">Elana Saint</h6><span>Web Designer</span> */}
          </li>
         {/* <li><MessageSquare/>Inbox</li>
            <li><FileText/>Taskboard</li>
            <li><Settings/>Settings</li> */}
          <li onClick={() => dispatch({ type: 'SIGNOUT' })} style={{ cursor: 'pointer' }}><LogOut />Salir</li>
        </ul>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserActivity