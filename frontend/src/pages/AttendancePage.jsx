import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AttendancePage = () => {
    // These states would ideally come from your auth context or global state
    const [courses, setCourses] = useState([
        { id: 1, title: 'Complete React Developer in 2026' }
    ]);
    const [sections, setSections] = useState([]);
    
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({}); // studentId -> status
    const [isLoading, setIsLoading] = useState(false);

    // Mock token
    const token = localStorage.getItem('token') || 'test-token';

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setCourses(res.data || []))
            .catch(err => console.error('Error fetching courses:', err));
    }, [token]);

    useEffect(() => {
        if (selectedCourse) {
            // Fetch sections for the course
            axios.get(`http://localhost:5000/api/sections?courseId=${selectedCourse}`)
                .then(res => setSections(res.data))
                .catch(err => console.error('Error fetching sections:', err));
        } else {
            setSections([]);
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedSection && date) {
            fetchAttendanceData();
        } else {
            setStudents([]);
        }
    }, [selectedSection, date]);

    const fetchAttendanceData = async () => {
        setIsLoading(true);
        try {
            // Fetch students in this section
            const stuRes = await axios.get(`http://localhost:5000/api/attendance/users?sectionId=${selectedSection}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const sectionStudents = stuRes.data;
            setStudents(sectionStudents);

            // Fetch existing attendance for this date
            const attRes = await axios.get(`http://localhost:5000/api/attendance?courseId=${selectedCourse}&sectionId=${selectedSection}&date=${date}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const initialAttendance = {};
            sectionStudents.forEach(s => {
                initialAttendance[s.id] = 'present'; // Default
            });

            // If existing records exist, populate them
            if (attRes.data && attRes.data.length > 0) {
                attRes.data.forEach(record => {
                    initialAttendance[record.user_id] = record.status;
                });
            }
            
            setAttendance(initialAttendance);
        } catch (error) {
            console.error('Error fetching attendance data', error);
        }
        setIsLoading(false);
    };

    const handleStatusChange = (studentId, status) => {
        setAttendance({
            ...attendance,
            [studentId]: status
        });
    };

    const handleSave = async () => {
        try {
            const records = students.map(s => ({
                userId: s.id,
                role: s.role, // Dynamically set the role
                status: attendance[s.id]
            }));

            await axios.post('http://localhost:5000/api/attendance', {
                courseId: selectedCourse,
                sectionId: selectedSection,
                date,
                records
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Attendance saved successfully!');
        } catch (error) {
            console.error('Error saving attendance:', error);
            alert('Failed to save attendance');
        }
    };

    const instructorsList = students.filter(s => s.role === 'instructor' || s.role === 'admin');
    const studentsList = students.filter(s => s.role === 'student');

    const renderTable = (users, title) => (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-secondary mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 text-center">Present</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 text-center">Late</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 text-center">Absent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-secondary font-medium">{user.name}</td>
                                <td className="py-3 px-4 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                                        checked={attendance[user.id] === 'present'}
                                        onChange={() => handleStatusChange(user.id, 'present')}
                                    />
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-4 h-4 text-amber-500 focus:ring-amber-500 cursor-pointer"
                                        checked={attendance[user.id] === 'late'}
                                        onChange={() => handleStatusChange(user.id, 'late')}
                                    />
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-4 h-4 text-red-500 focus:ring-red-500 cursor-pointer"
                                        checked={attendance[user.id] === 'absent'}
                                        onChange={() => handleStatusChange(user.id, 'absent')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
                    <h1 className="text-2xl font-semibold text-secondary mb-6">Manage Attendance</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">-- Choose a course --</option>
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Section</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                disabled={!selectedCourse}
                            >
                                <option value="">-- Choose a section --</option>
                                {sections.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} - {s.schedule}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input 
                                type="date" 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8 text-gray-500">Loading user list...</div>
                    ) : students.length > 0 ? (
                        <>
                            {instructorsList.length > 0 && renderTable(instructorsList, 'Instructor(s)')}
                            {studentsList.length > 0 && renderTable(studentsList, 'Students')}
                            
                            <div className="mt-8 flex justify-end">
                                <button className="btn-primary px-8 py-3 rounded-lg shadow-sm font-medium text-white transition-transform active:scale-95" onClick={handleSave}>
                                    Save Attendance Records
                                </button>
                            </div>
                        </>
                    ) : selectedSection ? (
                        <div className="text-center py-8 text-gray-500">No users found in this section.</div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">Select a course and section to load students.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;
