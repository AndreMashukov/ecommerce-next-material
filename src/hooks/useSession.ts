import { useContext, useEffect } from 'react';
import SessionContext from '../store/SessionContext/SessionContext';

const useSession = (sId: string) => {
  const { setSessionId } = useContext(SessionContext);

  useEffect(() => {
    setSessionId(sId);
  },[sId]);
};

export default useSession;