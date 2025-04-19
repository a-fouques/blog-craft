"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
    
    const { user } = useAuth();
    return (
        <>
            <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
                <h2>Mon profil</h2>
            </div>
            <div>
                <p>
                Mon email : <strong>{user?.email}  </strong>
                Mon nom: <strong>{user?.firstname} {user?.lastname} </strong>
                Mon role: <strong>{user?.role} </strong>
                
                Mon mot de passe : <strong>Modifer ? </strong>
 
                </p>
            </div>
        </>
    );
}