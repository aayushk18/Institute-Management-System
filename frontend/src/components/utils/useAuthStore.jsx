import toast, { ToastBar } from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from './axios'
import { data, useNavigate } from 'react-router-dom'


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
    profilePic: null,
    setProfilepic: async (data, url) => {
        set({ profilePic: data })
        await axiosInstance.put(url, data)
        set({ profilePic: null })

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
    showallNewRegistrations: async (data) => {
        try {

            set({ isLoading: true })
            const response = await axiosInstance.get('/user/admin/admission/getallregistration');
            const data = await response.data;
            console.log(data);
            set({ isLoading: false })
            return data



        } catch (error) {

        }
    }
}))