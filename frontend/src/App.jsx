import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAdminStore, useAuthStore } from './components/utils/useAuthStore'
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
import AcademicsAdminDashboard from './components/dashboards/AdminComponents/AcademicsAdminDashboard'
import SettingsAdminComponent from './components/dashboards/AdminComponents/SettingsAdminComponent'
import LibraryAdminComponent from './components/dashboards/AdminComponents/LibraryAdminComponent'
import NoticeAdminComponent from './components/dashboards/AdminComponents/NoticeAdminComponent'
import ReportAdminComponent from './components/dashboards/AdminComponents/ReportAdminComponent'
import PaymentAdminComponent from './components/dashboards/AdminComponents/PaymentAdminComponent'
import ClassesAdminComponent from './components/dashboards/AdminComponents/ClassesAdminComponent'
import TimetableAdmin from './components/dashboards/AdminComponents/TimetableAdmin'
import AttendanceAdmin from './components/dashboards/AdminComponents/AttendanceAdmin'
import ExaminationAdmin from './components/dashboards/AdminComponents/ExaminationAdmin'
import StudentAdminHome from './components/dashboards/AdminComponents/StudentAdminHome'
import EditStudent from './components/dashboards/AdminComponents/EditStudent'
import StudentDetails from './components/dashboards/AdminComponents/StudentDetails'
import AdminAdmissionsPanel from './components/dashboards/AdminComponents/AdminAdmissionsPanel'
import AdminNewRegistration from './components/dashboards/AdminComponents/AdminNewRegistration'
import AdminNewAdmissions from './components/dashboards/AdminComponents/AdminNewAdmissions'
import AdminLeavingStudents from './components/dashboards/AdminComponents/AdminLeavingStudents'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import AdminAdmissionRegistrationForm from './components/dashboards/AdminComponents/AdminAdmissionRegistrationForm'
import AdminStudentRoute from './components/dashboards/AdminComponents/AdminStudentRoute'
import AddNewStudentRegistration from './components/dashboards/AdminComponents/AddNewStudentRegistration'
import AdminAdmissionRoutes from './components/dashboards/AdminComponents/AdminAdmissionRoutes'
import NewRegistration1 from './components/dashboards/AdminComponents/NewRegistration1'
import NewRegistration2 from './components/dashboards/AdminComponents/NewRegistration2'
import NewRegistration3 from './components/dashboards/AdminComponents/NewRegistration3'
import NewRegistration4 from './components/dashboards/AdminComponents/NewRegistration4'
import NewRegistrationForm from './components/dashboards/AdminComponents/NewRegistrationForm'
import NewRegistrationDetails from './components/dashboards/AdminComponents/NewRegistrationDetails'
import AddNewFaculty from './components/dashboards/AdminComponents/Faculty/AddNewFaculty'
import AddNewFaculty1 from './components/dashboards/AdminComponents/Faculty/AddNewFaculty1'
import AddNewFaculty2 from './components/dashboards/AdminComponents/Faculty/AddNewFaculty2'
import AddNewFaculty3 from './components/dashboards/AdminComponents/Faculty/AddNewFaculty3'
import FacultyFeedback from './components/dashboards/AdminComponents/Faculty/FacultyFeedback'
import FacultyAttendancePage from './components/dashboards/AdminComponents/Faculty/FacultyAttendancePage'
import AdminStudentAttendance from './components/dashboards/AdminComponents/Student/AdminStudentAttendance'
import AcademicActiveClasses from './components/dashboards/AdminComponents/Academic/AcademicActiveClasses'
import AcademicEditClasses from './components/dashboards/AdminComponents/Academic/AcademicEditClasses'
import ExaminationDatesheet from './components/dashboards/AdminComponents/Academic/Examination/ExaminationDatesheet'
import SubjectAdmin from './components/dashboards/AdminComponents/Academic/Subjects/SubjectAdmin'
import FacultyAttendanceTable from './components/dashboards/AdminComponents/Faculty/FacultyAttendanceTable'
import StaffTable from './components/dashboards/AdminComponents/Faculty/StaffTable'
import StaffProfile from './components/dashboards/AdminComponents/Faculty/StaffProfile'
import AdminStudentAttendanceTable from './components/dashboards/AdminComponents/Student/AdminStudentAttendanceTable'



const App = () => {


  const { authUser, userType, checkAuth, isCheckAuth } = useAuthStore();


  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-20 animate-spin' />
    </div>
  )






  return (
    <div className='fixed w-screen flex flex-row'>







      < Routes>

        <Route path='/' element={userType ? (userType == 'admin' ? <Navigate to='/admin' /> : (userType == 'staff' ? <Navigate to='/staff' /> : (userType == 'student' ? <Navigate to='/student' /> : (authUser.userType == 'parent' ? <Navigate to='/parent' /> : <Navigate to='/login' />)))) : <Navigate to='/login' />}></Route>
        <Route path='/login' element={!userType ? <Login /> : <Navigate to='/' />} />\
        {/* <Route path='/admissions' element={<Login />} /> */}

        <Route path='/student' element={userType == 'student' ? <StudentDashboard /> : <Navigate to='/login' />} />
        <Route path='/admin' element={userType == 'admin' ? <AdminDashboard /> : <Navigate to='/login' />} >
          <Route path='home' element={<AdminHomepage />} ></Route>
          <Route path='student' element={<AdminStudentRoute />} >

            <Route path='' element={<StudentAdminComponent />} ></Route>
            <Route path=':userid' element={<StudentDetails />} />
            <Route path='students' element={<StudentAdminHome />} />
            <Route path='new-student' element={<AddStudent />} />
            <Route path='update-student/:userid' element={<EditStudent />} />
            <Route path='attendance' element={<AdminStudentAttendanceTable />} />
            <Route path='attendance/:userid' element={<AdminStudentAttendance />} />


          </Route>
          <Route path='faculties' element={<StaffAdminComponent />}>
            <Route path='all-staff' element={<StaffTable />} />
            <Route path='all-staff/profile/:userid' element={<StaffProfile />} />
            <Route path='new-staff' element={<AddNewFaculty />} />
            <Route path='academic-staff/:userid' element={<AddNewFaculty1 />} />
            <Route path='general-staff/:userid' element={<AddNewFaculty2 />} />
            <Route path='edit-staff-3' element={<AddNewFaculty3 />} />
            <Route path='feedback' element={<FacultyFeedback />} />
            <Route path='attendance' element={<FacultyAttendanceTable />} />
            <Route path='attendance/:userid' element={<FacultyAttendancePage />} />
            <Route path='new-teacher' element={<AddTeacher />} />



          </Route>
          <Route path='academics' element={<AcademicsAdminDashboard />}>
            <Route path='classes' element={<ClassesAdminComponent />} >
              <Route path='' element={<AcademicActiveClasses />} ></Route>
              <Route path='update-class' element={<AcademicEditClasses />} />

            </Route>
            <Route path='subjects' element={<SubjectAdmin />} />
            <Route path='timetable' element={<TimetableAdmin />} />
            <Route path='attendance' element={<AttendanceAdmin />} />

            <Route path='result' element={<AttendanceAdmin />}>
            </Route>

          </Route>
          <Route path='examination' element={<ExaminationAdmin />} >
            <Route path='datesheet' element={<ExaminationDatesheet />} />
          </Route>
          <Route path='notice' element={<NoticeAdminComponent />} />
          <Route path='library' element={<LibraryAdminComponent />} />
          <Route path='admissions' element={<AdminAdmissionRoutes />} >
            <Route path='' element={<AdminAdmissionsPanel />} ></Route>
            <Route path='set-registration-form' element={<AdminAdmissionRegistrationForm />} />
            <Route path='new-registrations' element={<AdminNewRegistration />} >
            </Route>

            <Route path='registration-form' element={<AddNewStudentRegistration />} >
              <Route path='' element={<NewRegistrationForm />}>
              </Route>
              <Route path='details/:userid' element={<NewRegistrationDetails />} />
              <Route path='page-1/:userid' element={<NewRegistration1 />} />
              <Route path='page-2/:userid' element={<NewRegistration2 />} />
              <Route path='page-3/:userid' element={<NewRegistration3 />} />
              {/* <Route path='page-4/:userid' element={<NewRegistration4 />} /> */}


            </Route>

            <Route path='new-admissions' element={<AdminNewAdmissions />} />
            <Route path='leaving-students' element={<AdminLeavingStudents />} />



          </Route>
          <Route path='payments' element={<PaymentAdminComponent />} />

          <Route path='reports-analytics' element={<ReportAdminComponent />} />
          <Route path='settings' element={<SettingsAdminComponent />} />
          <Route path='feedback' element={<Feedback />} />


        </Route>
        <Route path='/staff' element={userType == 'staff' ? <StaffDashboard /> : <Navigate to='/login' />} />
        <Route path='/parent' element={userType == 'parent' ? <ParentDashboard /> : <Navigate to='/login' />} />

      </Routes >

      <Toaster />


    </div>
  )
}



export default App
