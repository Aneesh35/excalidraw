"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : undefined;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [roomData, setRoomData] = useState<any>(null);

    useEffect(() => {
        const joinRoom = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.put('/api/room', { id });
                setRoomData(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error joining room:', err);
                setError(err.response?.data?.error || 'Failed to join room');
            } finally {
                setLoading(false);
            }
        };

        joinRoom();
    }, [id]);

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center min-h-[200px]">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-white">
                <p>Error: {error}</p>
                <button 
                    className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => window.location.href = '/home'}
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="text-white">
            {id ? (
                <div>
                    <h1 className="text-xl font-bold mb-4">Room: {id}</h1>
                    {roomData && (
                        <p className="text-green-400">
                            {roomData.message}
                        </p>
                    )}
                </div>
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4">Home Page</h1>
                    <p>Create a new room or join an existing one.</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;
