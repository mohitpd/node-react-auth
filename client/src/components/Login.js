import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const Login = ({setAuth}) => {
    const [login, setLogin] = useState(true);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Please complete this required field.'),
            phone: Yup.string().required('Please complete this required field.'),
            password: Yup.string().required('Please complete this required field.'),
            email: Yup.string().required('Please complete this required field.').email('Invalid email'),
        }),
        onSubmit: async (values) => {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                setLogin(true);
            } else {
                alert(data.error);
            }
        },
    });
    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            password: Yup.string().required('Please complete this required field.'),
            email: Yup.string().required('Please complete this required field.').email('Invalid email'),
        }),
        onSubmit: async (values) => {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data.user) {
                localStorage.setItem('token', data.user);
                setAuth(false);
            } else {
                alert('Please check your username and password');
            }
        },
    });

    return (
        <>
            {login ? (
                <div className='h-screen w-screen flex flex-col justify-center py-4 sm:px-6 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
                    </div>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                            <form className='space-y-6' onSubmit={formikLogin.handleSubmit}>
                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                        Email address
                                    </label>
                                    <div className='mt-1'>
                                        <input id='email' name='email' type='email' autoComplete='email' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formikLogin.getFieldProps('email')} />
                                        {formikLogin.errors.email && formikLogin.touched.email ? <p className='text-red-600 text-xs'>{formikLogin.errors.email}</p> : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                        Password
                                    </label>
                                    <div className='mt-1'>
                                        <input id='password' name='password' type='password' autoComplete='password' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formikLogin.getFieldProps('password')} />
                                        {formikLogin.errors.password && formikLogin.touched.password ? <p className='text-red-600 text-xs'>{formikLogin.errors.password}</p> : null}
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='text-sm'>
                                        <p className='font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer' onClick={() => setLogin(false)}>
                                            Don't have an Account? Register
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-screen w-screen mx-auto flex flex-col justify-center py-4 sm:px-6 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register your account</h2>
                    </div>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                            <form className='space-y-6' onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                                        Name
                                    </label>
                                    <div className='mt-1'>
                                        <input id='name' name='name' type='text' autoComplete='name' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formik.getFieldProps('name')} />
                                        {formik.errors.name && formik.touched.name ? <p className='text-red-600 text-xs'>{formik.errors.name}</p> : null}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                        Email address
                                    </label>
                                    <div className='mt-1'>
                                        <input id='email' name='email' type='email' autoComplete='email' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formik.getFieldProps('email')} />
                                        {formik.errors.email && formik.touched.email ? <p className='text-red-600 text-xs'>{formik.errors.email}</p> : null}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                        Phone
                                    </label>
                                    <div className='mt-1'>
                                        <input id='phone' name='phone' type='text' autoComplete='phone' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formik.getFieldProps('phone')} />
                                        {formik.errors.phone && formik.touched.phone ? <p className='text-red-600 text-xs'>{formik.errors.phone}</p> : null}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                        Password
                                    </label>
                                    <div className='mt-1'>
                                        <input id='password' name='password' type='password' autoComplete='password' className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' {...formik.getFieldProps('password')} />
                                        {formik.errors.password && formik.touched.password ? <p className='text-red-600 text-xs'>{formik.errors.password}</p> : null}
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='text-sm'>
                                        <p className='font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer' onClick={() => setLogin(true)}>
                                            Have an Accunt? SignIn
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
