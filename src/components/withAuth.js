// src/components/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (!user) {
                    router.push('/auth');
                } else {
                    setUser(user);
                    setLoading(false);
                }
            });
            return () => unsubscribe();
        }, []);

        if (loading) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v-4c3.042 0 5.824-1.135 7.938-3l-2.647-3zM12 20a8 8 0 01-8-8h-4c0 3.042 1.135 5.824 3 7.938l2.647-3zM20 4a7.96 7.96 0 013 3.291l-3 2.647A7.96 7.96 0 0112 4v-4h8z"></path>
                    </svg>
                </div>
            );
        }

        return <WrappedComponent {...props} user={user} />;
    };
};

export default withAuth;
