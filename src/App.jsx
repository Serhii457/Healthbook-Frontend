import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import DoctorsPage from './pages/DoctorsPage';
import PricesPage from './pages/PricesPage.jsx';
import ContactsPage from './pages/ContactsPage.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDoctorsPage from './pages/admin/AdminDoctorsPage';
import AdminSpecializationsPage from './pages/admin/AdminSpecializationsPage.jsx';
import AdminPatientsPage from './pages/admin/AdminPatientsPage.jsx';
import AdminMedicalRecordsPage from './pages/admin/AdminMedicalRecordsPage.jsx';
import PatientMedicalRecordsPage from './pages/patient/PatientMedicalRecordsPage.jsx';
import DoctorMedicalRecordsPage from './pages/doctor/DoctorMedicalRecordsPage.jsx';
import DoctorProfilePage from './pages/doctor/DoctorProfilePage.jsx';
import PatientAppointmentsPage from './pages/patient/PatientAppointmentsPage.jsx';
import PatientProfilePage from './pages/patient/PatientProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import Footer from './components/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/doctors" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDoctorsPage /></ProtectedRoute>} />
        <Route path="/admin/specializations" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminSpecializationsPage /></ProtectedRoute>}/>
        <Route path="/admin/patients" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPatientsPage /></ProtectedRoute>} />
        <Route path="/admin/records" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminMedicalRecordsPage /></ProtectedRoute>}/>
        <Route path="/records" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientMedicalRecordsPage /></ProtectedRoute>}/>
        <Route path="/doctor/medical-records" element={<ProtectedRoute allowedRoles={['DOCTOR']}><DoctorMedicalRecordsPage /></ProtectedRoute>} />
        <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={['DOCTOR']}><DoctorProfilePage /></ProtectedRoute>}/>
        <Route path="/my-appointments" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientAppointmentsPage /></ProtectedRoute>}/>
        <Route path="/my-profile" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientProfilePage /></ProtectedRoute>}/>
        <Route path="/403" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
      <Footer />
    </Router>
  );
}

export default App;