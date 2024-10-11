import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Wiki from "./pages/Wiki";
import MarkdownPage from "./pages/MarkdownPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="wiki" element={<Wiki />} />
                    <Route path="wiki/:filepath" element={<MarkdownPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
