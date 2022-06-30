import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import publicRoutes from './routes/routes';
function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <MainLayout>
                                        <Page />
                                    </MainLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
