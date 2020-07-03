import { useContext, useEffect } from 'react';
import SessionContext from '../store/SessionContext/SessionContext';
import { useRouter } from 'next/router';

const useRedirectLogin = () => {
  const router = useRouter();
  const { getUser } = useContext(SessionContext);
  useEffect(() => {
    if (!getUser()) {
      router.push('/auth');
    }
  },[getUser()]);
};

export default useRedirectLogin;