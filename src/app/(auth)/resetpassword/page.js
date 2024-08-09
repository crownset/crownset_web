"use client"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/redux/slices/authSlice';

const Page = () => {
    const dispatch = useDispatch();
    // const pathname = usePathname();
    // const [token, setToken] = useState('');
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    console.log("token get===>", token)
    const [password, setPassword] = useState('');
    const resetPasswordStatus = useSelector(state => state.auth.resetPasswordStatus);
    const error = useSelector(state => state.auth.error);

    // useEffect(() => {
    //     const tokenFromPath = pathname.split('/').pop(); // Assuming token is the last part of the path
    //     setToken(tokenFromPath);
    //     console.log("token==>", token)
    // }, [pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            dispatch(resetPassword({ token, password }));
        } else {
            console.error("Token is missing");
        }
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    required
                />
                <button type="submit" disabled={resetPasswordStatus === 'loading'}>
                    Reset Password
                </button>
            </form>
            {resetPasswordStatus === 'failed' && <p>Error: {error}</p>}
            {resetPasswordStatus === 'succeeded' && <p>Password reset successfully!</p>}
        </div>
    );
};

export default Page;
