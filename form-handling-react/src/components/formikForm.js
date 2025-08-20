import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/**
 * Formik form with Yup validation:
 * - initialValues mirror the controlled form fields
 * - validationSchema uses Yup for clear declarative rules
 * - onSubmit simulates registration (console.log)
 */

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function FormikForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
        setSubmitting(true);
        // Simulate API call / registration (replace with real API)
        setTimeout(() => {
          console.log('Registering user (Formik):', values);
          setStatus({ success: 'Registration successful (simulated). Check console.' });
          setSubmitting(false);
          resetForm();
        }, 800);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          {status && status.success && <div className="p-2 text-green-800 bg-green-100 rounded">{status.success}</div>}

          <div>
            <label className="block text-sm font-medium">Username</label>
            <Field name="username" placeholder="Enter username" className="mt-1 block w-full border rounded px-3 py-2" />
            <ErrorMessage name="username" component="div" className="text-sm text-red-600 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Field name="email" type="email" placeholder="you@example.com" className="mt-1 block w-full border rounded px-3 py-2" />
            <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <Field name="password" type="password" placeholder="Enter a secure password" className="mt-1 block w-full border rounded px-3 py-2" />
            <ErrorMessage name="password" component="div" className="text-sm text-red-600 mt-1" />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;
