/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import login from '../../../assets/images/login.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Password from '@/components/ui/password';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import GoogleLogin from './GoogleLogin';

// Registration form schema validation define
const formSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: 'Name is too short',
      })
      .max(50),
    email: z.email(),
    password: z.string().min(8, { error: 'Password is too short' }),
    confirmPassword: z.string().min(8, { error: 'Confirm Password is too short' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

// Registration form react component
const RegisterForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    // console.log(payload);
    try {
      const res = await register(payload).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (error: any) {
      toast.error('Failed to create user');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6  ', className)} {...props}>
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={login}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale bg-slate-800"
            />
          </div>
          <div className="p-6 md:p-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Register to SHRL account</p>
              </div>

              {/*  */}

              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* User name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* User name */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@company.com" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Password {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Password {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                  </form>
                </Form>
              </div>

              {/*  */}

              <GoogleLogin />
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
