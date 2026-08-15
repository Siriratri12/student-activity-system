import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import ActivityList from "./pages/ActivityList";
import ActivityDetail from "./pages/ActivityDetail";
import ActivityRegister from "./pages/ActivityRegister";
import ActivityRegistrations from "./pages/ActivityRegistrations";

import ManualPage from "./pages/ManualPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ActivityList />} />
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route
            path="/activities/:id/register"
            element={<ActivityRegister />}
          />
          <Route
            path="/activities/:id/registrations"
            element={<ActivityRegistrations />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
