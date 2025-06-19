import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('ForgotPasswordPage form submitted:', data);
    setMessage(null);
    // Simulate API call to send reset link
    setTimeout(() => {
      console.log('Password reset link request sent for:', data.email);
      setMessage({ type: 'success', text: 'If an account exists for this email, a password reset link has been sent. Please check your inbox.' });
      // Optionally, redirect or clear form
      // form.reset();
    }, 1000);
  };

  React.useEffect(() => {
    console.log('ForgotPasswordPage loaded');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              {message && (
                <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'border-green-500 text-green-700' : ''}>
                  {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{message.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <div className="text-center text-sm">
                Remembered your password?{' '}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;