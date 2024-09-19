import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CustomButton from '../components/CustomButton';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { fetchAccounts, requestAccount } from '../redux/actions/accountActions';
import { Link } from 'react-router-dom';

const Accounts = () => {
  const dispatch = useDispatch();
  const { accounts, status, error } = useSelector(state => state.accounts);
  const userName = useSelector(state => state.auth.userName); // Asegúrate de tener `userName` en tu estado

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleRequestAccount = () => {
    Swal.fire({
      title: 'Request Account',
      text: 'Do you want to request a new account? This action cannot be undone.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, request it!',
      cancelButtonText: 'No, cancel',
      customClass: {
        container: 'custom-swal',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(requestAccount());
      }
    });
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, {userName}!</h1>
      <Carousel />
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
        <div className="py-4">
          <CustomButton text="Request Account" onClick={handleRequestAccount} />
        </div>
        <div className="flex space-x-4">
          {accounts.map(account => (
            <Link key={account.id} to={`/account/${account.id}`} className="flex-none">
              <Card
                accountNumber={account.number}
                amount={account.balance}
                creationDate={account.creationDate}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;