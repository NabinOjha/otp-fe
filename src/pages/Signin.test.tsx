import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import SignIn from './Signin';

import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

vi.mock('axios');

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

describe('SignIn Component', () => {
  const mockRefetchUser = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as Mock).mockReturnValue({ refetchUser: mockRefetchUser });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('sends OTP and shows OTP input', async () => {
    (axios.post as Mock).mockResolvedValueOnce({ data: {} });

    render(<SignIn resendTime={2} />);

    // Fill phone number input
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '9861574495' } });

    // Click on the "Get OTP" button
    fireEvent.click(screen.getByRole('button', { name: /Get OTP/i }));

    // Wait for the OTP input screen to appear
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Enter verification code/i })
      ).toBeInTheDocument();
    });
  });

  it('verifies OTP and navigates to home', async () => {
    (axios.post as Mock).mockResolvedValueOnce({ data: {} });
    (axios.put as Mock).mockResolvedValueOnce({ data: {} });

    render(<SignIn resendTime={2} />);

    // Fill phone number input
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '9861574495' } });

    // Click on "Get OTP" button to send OTP
    fireEvent.click(screen.getByRole('button', { name: /Get OTP/i }));

    // Wait for OTP inputs to show
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Enter verification code/i })
      ).toBeInTheDocument();
    });

    // Fill OTP digits
    const otpDigits = ['1', '2', '3', '4', '5', '6'];
    const otpInputs = screen.getAllByRole('textbox');

    otpDigits.forEach((digit, index) => {
      fireEvent.change(otpInputs[index], { target: { value: digit } });
    });

    // Click "Verify OTP" button
    fireEvent.click(screen.getByRole('button', { name: /Verify OTP/i }));

    // Wait for navigation and user refetch
    await waitFor(() => {
      expect(mockRefetchUser).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  it('resends OTP and handles resend timer correctly', async () => {
    (axios.post as Mock).mockResolvedValueOnce({ data: {} });

    render(<SignIn resendTime={1} />);

    // Fill phone number input
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: '9861574495' } });

    fireEvent.click(screen.getByRole('button', { name: /Get OTP/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Enter verification code/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Resend/i })).toBeDisabled();

    await waitFor(
      () => {
        expect(
          screen.getByRole('button', { name: /Resend/i })
        ).not.toBeEnabled();
      },
      { timeout: 5000 }
    );

    fireEvent.click(screen.getByRole('button', { name: /Resend/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
