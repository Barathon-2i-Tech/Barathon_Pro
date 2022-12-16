import { Navigate, useOutlet } from 'react-router-dom';
import { AppBar } from '../CommonComponents/NavigationPro/AppBar';
import { useAuth } from '../Hooks/useAuth';

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return(<div>
        <AppBar 
        pages={[
            {label: 'Dashboard', path: "dashboard" }
            ]}
        />
        {outlet}
    </div>
    );
    
};
