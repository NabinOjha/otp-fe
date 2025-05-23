import type React from "react"

import { useState, useRef, useEffect } from "react"
import {  linearGradientClass } from "../../utils"

interface OtpInputProps {
  onVerify: (otp: string) => void
  onResend: () => void
  resendDisabled: boolean
  resendTimer: number
}

const OtpInput = ({ onVerify, onResend, resendDisabled, resendTimer }: OtpInputProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("")
      setOtp(newOtp)

      if (inputRefs.current[5]) {
        inputRefs.current[5].focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    setError("")
    onVerify(otpValue)
  }

  console.log(inputRefs)

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Enter verification code</h2>
      <p className="text-sm text-gray-600 mb-4">
        We've sent a 6-digit code to your phone number. Please enter it below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="otp-input" className="sr-only">
            OTP Input
          </label>

          <div className="flex justify-between gap-2 mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el)=> {
                  if(inputRefs.current){
                    inputRefs.current[index] = el
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
                required
              />
            ))}
          </div>

          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className={`w-full ${linearGradientClass} bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-0 transition-colors`}
          >
            Verify OTP
          </button>

          <button
            type="button"
            onClick={onResend}
            disabled={resendDisabled}
            className={`w-full py-2 px-4 rounded-md border border-[#b63f81] text-[#221e67] ${
              resendDisabled
                ? "bg-gray-100 cursor-not-allowed opacity-70"
                : "hover:bg-purple-50 focus:outline-none focus:ring-2"
            } transition-colors`}
          >
            {resendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OtpInput
