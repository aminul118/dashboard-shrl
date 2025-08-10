/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Minus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { useSendOtpMutation, useVerifyOtpMutation } from '@/redux/features/auth/auth.api';

// Form Validation
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 digits.',
  }),
});

const Verify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const [sendOTP] = useSendOtpMutation();
  const [verifyOTP] = useVerifyOtpMutation();

  // ✅ Redirect to homepage if state (email) is not present
  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // Form Hook
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: '' },
  });

  // Send OTP
  const handleSendOTP = async () => {
    if (!state) {
      toast.error('No email found.');
      return;
    }
    const toastId = toast.loading('Sending OTP...');
    try {
      const res = await sendOTP({ email: state }).unwrap();
      if (res.success) {
        toast.success(`OTP sent to ${state}`, { id: toastId });
        setOtpSent(true);
        setTimer(60);
      } else {
        toast.error(res.message || 'Failed to send OTP', { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Error sending OTP', { id: toastId });
    }
  };

  // Timer Countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Submit Verification
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading('Verifying OTP...');
    try {
      const res = await verifyOTP({ email: state, otp: data.pin }).unwrap();
      if (res.success) {
        toast.success('OTP verified successfully!', { id: toastId });
        navigate('/'); // Redirect after success
      } else {
        toast.error(res.message || 'OTP verification failed', { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Invalid OTP', { id: toastId });
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      {!otpSent ? (
        <Card className="p-6 text-center">
          <CardContent>
            <h1 className="text-xl font-semibold mb-4">Verify your account</h1>
            <p className="mb-4">Email: {state}</p>
            <Button onClick={handleSendOTP}>Send OTP</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-8 grid place-content-center"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-4">One Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Minus />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="mt-4">
                        Please enter the OTP sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="link"
                  disabled={timer > 0}
                  onClick={handleSendOTP}
                  className={cn({
                    'cursor-pointer': timer === 0,
                    'text-gray-500': timer > 0,
                  })}
                >
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>

                <Button type="submit">Verify</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Verify;
