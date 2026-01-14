import { Mail, Phone, Calendar, User, MapPin } from "lucide-react";

const TeacherProfile = (props) => {

  const user = props.user
  const teacherData = {
    photo:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    name: `${user.firstName} ${user.midName} ${user.lastName}`
      || "Dr. Sarah Johnson",
    email: `${user.email}` || "sarah.johnson@school.edu",
    gender: `${user.gender}` || '',
    dob: `${user.dob.split('T')[0]}` || "yyyy-mm-dd",
    mobile: `+91` + `${user.phone}` || '',
    currentAddress: `${user?.currentAddress}` || "123 Oak Street, Springfield, IL 62701",
    permanentAddress: "456 Maple Avenue, Chicago, IL 60601",
    employeeId: `${user.username}` || "EMP-12345",
    department: "Mathematics",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-4xl mx-auto">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Faculty Profile</h1>
            <p className="text-indigo-100">Manage your personal information</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            Faculty ID: {teacherData.employeeId}
          </div>
        </div>
      </div>

      {/* Profile section */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Profile card */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4">
              <img
                src={teacherData.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-center">
              {teacherData.name}
            </h2>
            <p className="text-purple-600 font-medium">
              {teacherData.department} Department
            </p>
            <div className="flex items-center mt-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700">Active</span>
            </div>
          </div>

          {/* Right column - Information */}
          <div className="md:w-2/3 space-y-6">
            {/* Personal Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail
                    className="text-indigo-500 mr-3 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">
                      {teacherData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone
                    className="text-indigo-500 mr-3 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium">
                      {teacherData.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar
                    className="text-indigo-500 mr-3 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Date of Birth
                    </p>
                    <p className="text-gray-800 font-medium">
                      {formatDate(teacherData.dob)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User
                    className="text-indigo-500 mr-3 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-gray-800 font-medium">
                      {teacherData.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-start">
                <MapPin
                  className="text-indigo-500 mr-3 mt-1 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Address</p>
                  <p className="text-gray-800 font-medium">
                    {teacherData.currentAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-indigo-500 mr-3 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Permanent Address
                  </p>
                  <p className="text-gray-800 font-medium">
                    {teacherData.permanentAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-8 py-4 border-t text-center text-sm text-gray-500">
        <p>
          Valid through December 2025 • Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TeacherProfile;
