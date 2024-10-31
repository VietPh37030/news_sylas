import React from 'react';
import { useNavigate } from 'react-router-dom';
import hamburgerIcon from '../assets/menu_icon_rm.png';

const Navbar = ({ setCategory }) => {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={hamburgerIcon}
        alt="Menu"
        style={{ width: '30px', cursor: 'pointer' }}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      />

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Sylas
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  setCategory("technology");
                  navigate('/'); 
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); 
              }}>
                Chi tiết
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  navigate('/mission'); // Điều hướng đến trang Nhiệm vụ
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); // Đóng offcanvas
              }}>
                Nhiệm vụ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  setCategory("business");
                  navigate('/');
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); 
              }}>
                Business
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  setCategory("health");
                  navigate('/');
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); 
              }}>
                Health
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  setCategory("sports");
                  navigate('/');
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); 
              }}>
                Sport
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => {
                  setCategory("entertainment");
                  navigate('/');
                  document.querySelector("[data-bs-dismiss='offcanvas']").click(); 
              }}>
                Entertainment
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
