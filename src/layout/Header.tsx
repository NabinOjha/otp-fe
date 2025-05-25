import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="py-4 px-4 fixed top-0 w-full text-white"
      style={{
        background:
          'linear-gradient(90deg, #221e67 0%, #5e1f70 24.95%, #7a2976 48.4%, #a3387d 82.83%, #b63f81 100%)',
      }}
    >
      <div className="flex justify-between items-center gap-8 max-w-7xl mx-auto px-6">
        <p className="font-bold text-2xl">Ncell</p>
        {user ? (
          <div className="flex gap-6 items-center">
            <p>{user?.phone}</p>
            <button
              onClick={async () => {
                await signOut();
                navigate('/sign-in', { replace: true });
              }}
              className={
                'w-full bg-white text-black font-bold py-2 px-4 rounded-md  focus:outline-none focus:ring-0 cursor-pointer transition-colors'
              }
            >
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
