import type React from 'react';

import { useState } from 'react';
import { isValidNcellNumber, linearGradientClass } from '../../utils';

interface PhoneInputProps {
  onSubmit: (phone: string) => void;
}

const PhoneInput = ({ onSubmit }: PhoneInputProps) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidNcellNumber(phone)) {
      setError('Please enter a valid Ncell phone number');
      return;
    }

    setError('');
    onSubmit(phone);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>

          <div className="flex">
            <div className="flex items-center justify-center px-2 rounded-l-md border border-r-0 border-gray-300">
              <span className="text-[#6A2C91] font-bold">+977</span>
            </div>

            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={e =>
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
              }
              className="flex-1 block w-full rounded-r-md border-gray-300 border p-2 focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter mobile number"
            />
          </div>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          className={`w-full ${linearGradientClass} text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-0 cursor-pointer transition-colors`}
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};

export default PhoneInput;
