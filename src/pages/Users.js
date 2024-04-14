import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Edit from '../style/images/edit.png';
import Delete from '../style/images/delete.png';
import Lupa from '../style/images/lupa.png';
function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  useEffect(async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/user/get`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:4000/user/delete/${userId}`, {
        headers: { accessToken: localStorage.getItem('token') }
      })
      .then((res) => {
        if (res.data.mes === 'no') {
          window.location.href = '/';
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="admin_main">
      <div className="input_container">
        <img src={Lupa} style={{ height: '2vh' }} />
        <input
          className="input_for_search mb_margin"
          type="text"
          placeholder={t('input_search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Login</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                const matchName = user.login.toLowerCase().includes(searchTerm.toLowerCase());
                const matchRole = user.role.toLowerCase().includes(searchTerm.toLowerCase());
                return matchName || matchRole;
              })
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {user.role !== 'admin' && (
                    <>
                      <td>
                        {' '}
                        <button
                          className="want_to_read"
                          onClick={() => {
                            window.location.href = `/edit/user/${user._id}`;
                          }}
                        >
                          <img className="edit_image" src={Edit} alt="Edit" />{' '}
                        </button>
                      </td>
                      <td>
                        {' '}
                        <button
                          className="want_to_read"
                          onClick={() => {
                            if (window.confirm(t('want_to_delete_user'))) {
                              deleteUser(user.id);
                            }
                          }}
                        >
                          {' '}
                          <img className="edit_image" src={Delete} alt="Delete" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users;
