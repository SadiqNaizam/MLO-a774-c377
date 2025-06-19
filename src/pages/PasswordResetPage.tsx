import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Assuming token might come from URL
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

const passwordResetSchema = z.object({
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match.",
  path: ['confirmNewPassword'],
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordResetPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>(); // Example: if token is in URL
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: PasswordResetFormValues) => {
    console.log('PasswordResetPage form submitted:', data, 'Token:', token);
    setMessage(null);
    // Simulate API call to reset password
    setTimeout(() => {
      console.log('Password reset successful for token:', token);
      setMessage({ type: 'success', text: 'Your password has been reset successfully. You can now login with your new password.' });
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after a delay
    }, 1000);
  };

  React.useEffect(() => {
    console.log('PasswordResetPage loaded. Token from URL (if any):', token);
    // Add logic here to validate token if it's being used
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || message?.type === 'success'}>
                {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default PasswordResetPage;