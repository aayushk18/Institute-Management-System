import toast, { ToastBar } from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from './axios'
import { data, useNavigate } from 'react-router-dom'
import { ActivateStudent } from '../../../../backend/src/controllers/admin.controller'



const UserAdmin = {
    userType: 'admin',
}



export const useAuthStore = create((set) => ({



    authUser: null,
    userType: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,



    isCheckAuth: true,

    checkAuth: async () => {

        try {
            const res = await axiosInstance.get('/user/check')

            set({ userType: res.data.userType });
            set({ authUser: res.data });





        } catch (error) {
            set({ setUser: null })

            console.log("Error in checkAuth", error);

        } finally {
            set({ isCheckAuth: false })
        }
    },

    logout: async () => {
        try {
            console.log("logiing out");

            await axiosInstance.post('/user/logout');
            set({ authUser: null });
            set({ userType: null });

            toast.success("Logged out Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    login: async (data) => {

        set({ isLoggingIn: true })
        try {
            console.log(data);
            const res = await axiosInstance.post("/user/login", data)
            set({ userType: res.data.userType });
            set({ setUser: res.data });

            toast.success("Account Logged In Successfully")

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put('/auth/update-profile', data)
            set({ setUser: res.data })
            toast.success("Profile Upadted Successfully")
        } catch (error) {
            console.log("Error in update profile", error);
            toast.error(error.response.data.message)

        } finally {
            set({ isUpdatingProfile: false })
        }

    }




}))


export const useAdminStore = create((set) => ({

    isSending: false,
    isLoading: false,

    ActivateStudent: async (data) => {
        try {

            await axiosInstance.post('/user/admin/students/active', data)
            toast.success("Student Profile Activated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }
    },

    InactivateStudent: async (data) => {


        try {
            await axiosInstance.post('/user/admin/students/inactive', data)
            toast.success("Student Profile Activated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }
    },




    setStudentpic: async (data) => {

        try {
            await axiosInstance.put('/user/admin/admission/newregistration/student-pic', data)
            toast.success("New Student Photo Updated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }


    },
    setFatherPic: async (data) => {

        try {
            await axiosInstance.put('/user/admin/admission/newregistration/father-pic', data)
            toast.success("New Father Photo Updated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }


    },
    setMotherPic: async (data) => {

        try {
            await axiosInstance.put('/user/admin/admission/newregistration/mother-pic', data)
            toast.success("New Mother Photo Updated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }


    },
    setGuardianPic: async (data) => {

        try {
            await axiosInstance.put('/user/admin/admission/newregistration/guardian-pic', data)
            toast.success("New Guardian Photo Updated Successfully")
            return true
        } catch (error) {
            toast.error(error.message)

        }


    },

    allStudents: null,

    resetRollno: async (cls, sec) => {

        const data = {
            StudentClass: cls,
            section: sec
        }
        console.log(cls);


        try {
            await axiosInstance.post('/user/admin/resetrollno', data)
            toast.success("Rollno reset Successfully")

        } catch (error) {

        }

    },

    getAllStudents: async (req, res) => {

        try {
            const response = await axiosInstance.get('/user/admin/getstudents');
            const data = await response.data;
            return data

        } catch (error) {

        }

    },

    getStudentClassData: async (StudentClass, section) => {

        const data = {
            StudentClass,
            section
        }
        try {

            console.log(data);


            const response = await axiosInstance.post('/user/admin/students/classes/getstudentofclass', data);
            const Data = await response.data;

            console.log(Data);

            console.log("not returning data");


            return Data;

        } catch (error) {
            toast.error(error.response.data.message)
        }

    },
    getClassData: async (StudentClass, section) => {
        const data = {
            StudentClass,
            section
        }
        try {

            console.log(data);


            const response = await axiosInstance.post('/user/admin/students/classes/get-class', data);
            const Data = await response.data;

            console.log(Data);

            console.log("not returning data");


            return Data;

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getFullClassData: async (StudentClass, section) => {
        const data = {
            StudentClass,
            section
        }
        try {

            console.log(data);


            const response = await axiosInstance.post('/user/admin/students/classes/get-class-data', data);
            const Data = await response.data;

            console.log(Data);

            console.log("not returning data");


            return Data;

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateClassData: async (StudentClass, section, data) => {


        try {
            const Data = {
                StudentClass,
                section,
                data
            }
            console.log(Data);

            const response = await axiosInstance.post('/user/admin/students/classes/update-class', Data);
            toast.success("Class Updated Successfully")
            return true
        } catch (error) {
            toast.error(error.response.data.message)

        }

    },

    AddNewStudent: async (data) => {

        try {
            set({ isSending: true })

            console.log(data);

            await axiosInstance.post('/user/admin/newstudent', data);
            toast.success("New Student Account created Successfully")
            return true
        } catch (error) {

            toast.error(error.response.data.message)
        } finally {
            set({ isSending: false })
        }


    },
    UpdateStudent: async (data) => {

        try {




            await axiosInstance.post('/user/admin/newstudent', data);
            toast.success("Student Account updated Successfully")
            return true
        } catch (error) {

            toast.error(error.response.data.message)
        } finally {
            set({ isSending: false })
        }


    },

    addNewRegistration: async (data) => {

        try {
            set({ isSending: true })

            console.log(data);

            await axiosInstance.post('/user/admin/admission/newregistration', data);
            toast.success("New registration Added Successfully")
            return true
        } catch (error) {

            toast.error(error.response.data.message)
        } finally {
            set({ isSending: false })
        }





    },

    showRegistrationUser: async (Data) => {
        try {

            const response = await axiosInstance.post('/user/admin/admission/get-registration-user', Data);
            const data = await response.data;
            console.log(data);
            return data;

        } catch (error) {

        }

    },

    showallNewRegistrations: async () => {
        try {

            set({ isLoading: true })
            const response = await axiosInstance.get('/user/admin/admission/getallregistration');
            const data = await response.data;
            console.log(data);
            set({ isLoading: false })
            return data



        } catch (error) {
            toast.error(error.response.data.message)

        }
    },


    setRegistrationForm: async (data) => {

        try {
            await axiosInstance.post('/user/admin/admission/newregistration', data)
            toast.success("New Student Registered Successfully")

            return true

        } catch (error) {
            toast.error(error.response.data.message)
        }



    },

    updateRegistrationForm1: async (data) => {

        try {
            await axiosInstance.post('/user/admin/admission/updateregistration1', data)
            // toast.success("New Student Registered Successfully")

            return true

        } catch (error) {
            toast.error(error.response.data.message)
        }


    },
    updateRegistrationForm2: async (data) => {

        try {
            await axiosInstance.post('/user/admin/admission/updateregistration2', data)
            toast.success("New Student Registered Successfully")

            return true

        } catch (error) {
            toast.error(error.response.data.message)
        }


    },
    updateRegistrationForm3: async (data) => {

        try {
            await axiosInstance.post('/user/admin/admission/updateregistration3', data)
            toast.success("New Student Registered Successfully")

            return true

        } catch (error) {
            toast.error(error.response.data.message)
        }


    },
}))