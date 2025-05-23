import { useState, useEffect } from "react"
import PhoneInput from "./components/PhoneInput"
import OtpInput from "./components/OtpInput"
import NcellCenters from "./components/NcellCenters"
import "./App.css"

function App() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [error, setError] = useState("")

  // Handle phone number submission
  const handlePhoneSubmit = async (phone: string) => {
    setError("")
    setPhoneNumber(phone)

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-backend-api.com/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setResendDisabled(true)
        setResendTimer(60)
      } else {
        setError(data.message || "Failed to send OTP. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    }
  }

  // Handle OTP verification
  const handleOtpVerify = async (otp: string) => {
    setError("")

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-backend-api.com/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsLoggedIn(true)
      } else {
        setError(data.message || "Invalid OTP. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    }
  }

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (resendDisabled) return

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://your-backend-api.com/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      const data = await response.json()

      if (response.ok) {
        setResendDisabled(true)
        setResendTimer(60)
      } else {
        setError(data.message || "Failed to resend OTP. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    }
  }

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: number | undefined

    if (resendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    } else if (resendTimer === 0) {
      setResendDisabled(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [resendDisabled, resendTimer])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
      <div className="w-full max-w-md rounded-lg border border-gray-200 shadow-md p-6 bg-white">
        {!isLoggedIn ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Sign In With OTP</h1>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

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
          </>
        ) : (
          <NcellCenters />
        )}
      </div>
    </div>
  )
}

export default App