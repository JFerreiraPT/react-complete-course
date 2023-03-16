import { Outlet } from "react-router-dom";
import MainNavigation from '../components/MainNavigation';

function Root() {
//const navigation = useNavigation();

    return <>
    <MainNavigation/>
    <main>
        {/* {a better solution exists} */}
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
    </main>
    </>

};

export default Root;