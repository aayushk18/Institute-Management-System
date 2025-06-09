import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './components/utils/useAuthStore'
import AdminDashboard from './components/dashboards/AdminDashboard'
import { StaffDashboard } from './components/dashboards/StaffDashboard'
import StudentDashboard from './components/dashboards/StudentDashboard'
import Login from './components/auth/Login'
import ParentDashboard from './components/dashboards/ParentDashboard'
import Feedback from './components/Feedback'
import StudentAdminComponent from './components/dashboards/AdminComponents/StudentAdminComponent'
import AdminHomepage from './components/dashboards/AdminComponents/AdminHomepage'
import { Toaster } from 'react-hot-toast'
import AddStudent from './components/dashboards/AdminComponents/AddStudent'
import StaffAdminComponent from './components/dashboards/AdminComponents/StaffAdminComponent'

import AddTeacher from './components/dashboards/AdminComponents/AddTeacher'
import { AddStaff } from './components/dashboards/AdminComponents/AddStaff'
import AcademicsAdminDashboard from './components/dashboards/AdminComponents/AcademicsAdminDashboard'
import SettingsAdminComponent from './components/dashboards/AdminComponents/SettingsAdminComponent'
import LibraryAdminComponent from './components/dashboards/AdminComponents/LibraryAdminComponent'
import NoticeAdminComponent from './components/dashboards/AdminComponents/NoticeAdminComponent'
import ReportAdminComponent from './components/dashboards/AdminComponents/ReportAdminComponent'
import PaymentAdminComponent from './components/dashboards/AdminComponents/PaymentAdminComponent'
import ClassesAdminComponent from './components/dashboards/AdminComponents/ClassesAdminComponent'
import SubjectAdmin from './components/dashboards/AdminComponents/SubjectAdmin'
import TimetableAdmin from './components/dashboards/AdminComponents/TimetableAdmin'
import AttendanceAdmin from './components/dashboards/AdminComponents/AttendanceAdmin'
import ExaminationAdmin from './components/dashboards/AdminComponents/ExaminationAdmin'
import StudentAdminHome from './components/dashboards/AdminComponents/StudentAdminHome'
import EditStudent from './components/dashboards/AdminComponents/EditStudent'
import StudentDetails from './components/dashboards/AdminComponents/StudentDetails'
import AdminAdmissionsPanel from './components/dashboards/AdminComponents/AdminAdmissionsPanel'
import AdminNewRegistration from './components/dashboards/AdminComponents/AdminNewRegistration'








function App() {

  const { authUser } = useAuthStore()




  return (
    <div className='fixed w-screen flex flex-row'>







      < Routes>
        <Route path='/' element={authUser.userType == 'admin' ? <Navigate to='/admin' /> : (authUser.userType == 'teacher' ? <Navigate to='staff' /> : (authUser.userType == 'student' ? <Navigate to='/CMS/student' /> : ((authUser.userType == 'parent' ? <Navigate to='/CMS/parent' /> : <Navigate to='/login' />))))}></Route>
        <Route path='/login' element={!authUser.userType ? <Login /> : <Navigate to='/' />} />\
        <Route path='/admissions' element={<Login />} />

        <Route path='/CMS/student' element={authUser.userType == 'student' ? <StudentDashboard /> : <Navigate to='/login' />} />
        <Route path='/admin' element={authUser.userType == 'admin' ? <AdminDashboard /> : <Navigate to='/login' />} >
          <Route path='home' element={<AdminHomepage />} />
          <Route path='student' element={<StudentAdminComponent />} >
            <Route path=':userid' element={<StudentDetails />} />

            <Route path='' element={<StudentAdminHome />} />
            <Route path='new-student' element={<AddStudent />} />
            <Route path='update-student/:userid' element={<EditStudent />} />
          </Route>
          <Route path='staff' element={<StaffAdminComponent />}>
            <Route path='new-staff' element={<AddStaff />} />

            <Route path='new-teacher' element={<AddTeacher />} />
          </Route>
          <Route path='academics' element={<AcademicsAdminDashboard />}>
            <Route path='classes' element={<ClassesAdminComponent />} />
            <Route path='subjects' element={<SubjectAdmin />} />
            <Route path='timetable' element={<TimetableAdmin />} />
            <Route path='attendance' element={<AttendanceAdmin />} />
            <Route path='examination' element={<ExaminationAdmin />} />
          </Route>
          <Route path='notice' element={<NoticeAdminComponent />} />
          <Route path='library' element={<LibraryAdminComponent />} />
          <Route path='admissions' element={<AdminAdmissionsPanel />} >
            <Route path='new-registrations' element={<AdminNewRegistration />} />

          </Route>
          <Route path='payments' element={<PaymentAdminComponent />} />

          <Route path='reports-analytics' element={<ReportAdminComponent />} />
          <Route path='settings' element={<SettingsAdminComponent />} />
          <Route path='feedback' element={<Feedback />} />


        </Route>
        <Route path='/CMS/staff' element={authUser.userType == 'staff' ? <StaffDashboard /> : <Navigate to='/login' />} />
        <Route path='/CMS/parent' element={authUser.userType == 'parent' ? <ParentDashboard /> : <Navigate to='/login' />} />

      </Routes >

      <Toaster />


    </div>
  )
}



export default App
