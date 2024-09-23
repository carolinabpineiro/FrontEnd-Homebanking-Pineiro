import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/actions/authActions';
import axios from 'axios';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAccounts();
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/accounts/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Error fetching accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccount = async () => {
    if (accounts.length >= 3) {
      toast.error("You cannot have more than 3 accounts.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/accounts/current', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts([...accounts, response.data]);
      toast.success("Account requested successfully!");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data);
      } else {
        toast.error('Error requesting account');
      }
    }
  };

  const handleDeleteAccount = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAccounts(accounts.filter(account => account.id !== id));
      toast.success("Account deleted successfully!");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data);
      } else {
        toast.error('Error deleting account');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">
        Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}!
      </h1>
      <Carousel />
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8 flex-wrap">
        {accounts.length < 3 ? (
          <div className="py-4">
            <CustomButton text="Request Account" onClick={handleRequestAccount} />
          </div>
        ) : (
          <p className="text-red-500 py-4">You have reached the limit of 3 accounts.</p>
        )}
        <div className="flex flex-wrap justify-center">
          {accounts.map(account => (
            <div key={account.id} className="flex flex-col items-center mb-4">
              <Link to={`/account/${account.id}`} className="flex-none">
                <Card
                  accountNumber={account.number}
                  amount={account.balance}
                  creationDate={account.creationDate}
                />
              </Link>
              <button
                className="mt-2 bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteAccount(account.id)}
              >
                Delete Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
