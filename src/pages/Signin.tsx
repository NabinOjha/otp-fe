import { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from '../components/PhoneInput';
import OtpInput from '../components/OtpInput';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function SignIn({ resendTime = 2 }: { resendTime: number }) {
  const { refetchUser } = useAuth();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(resendTime);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (phone: string) => {
    setError('');
    setPhoneNumber(phone);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        phoneNumber: phone,
      });
      setOtpSent(true);
      setResendDisabled(true);
      setResendTimer(resendTime);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Network error. Please check your connection and try again.'
      );
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setError('');

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          phoneNumber,
          otp: otp,
        },
        { withCredentials: true }
      );

      await refetchUser();

      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Network error. Please check your connection and try again.'
      );
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        phoneNumber: phoneNumber,
      });

      setOtpSent(true);
      setResendDisabled(true);
      setResendTimer(resendTime);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Network error. Please check your connection and try again.'
      );
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof window.setInterval> | undefined;

    if (resendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendDisabled, resendTimer]);

  return (
    <div className="w-md rounded-lg border border-gray-200 shadow-md p-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In With OTP</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {!otpSent ? (
        <PhoneInput onSubmit={handlePhoneSubmit} />
      ) : (
        <OtpInput
          onVerify={handleOtpVerify}
          onResend={handleResendOtp}
          resendDisabled={resendDisabled}
          resendTimer={resendTimer}
        />
      )}
    </div>
  );
}

export default SignIn;
