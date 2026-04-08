import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

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
        <div className="mb-8 last:mb-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">{title}</h2>
            <Card hover={false} className="overflow-x-auto overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-sm tracking-wider uppercase">Name</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-sm tracking-wider uppercase text-center w-28">Present</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-sm tracking-wider uppercase text-center w-28">Late</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-sm tracking-wider uppercase text-center w-28">Absent</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="py-4 px-6 text-gray-900 font-medium">{user.name}</td>
                                <td className="py-4 px-6 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-5 h-5 text-blue-600 focus:ring-blue-600 cursor-pointer border-gray-300"
                                        checked={attendance[user.id] === 'present'}
                                        onChange={() => handleStatusChange(user.id, 'present')}
                                    />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-5 h-5 text-amber-500 focus:ring-amber-500 cursor-pointer border-gray-300"
                                        checked={attendance[user.id] === 'late'}
                                        onChange={() => handleStatusChange(user.id, 'late')}
                                    />
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <input 
                                        type="radio" 
                                        name={`status-${user.id}`} 
                                        className="w-5 h-5 text-red-600 focus:ring-red-600 cursor-pointer border-gray-300"
                                        checked={attendance[user.id] === 'absent'}
                                        onChange={() => handleStatusChange(user.id, 'absent')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
                <PageHeader title="Attendance Management" subtitle="Track daily statuses for students and staff quickly and accurately." />

                <Card hover={false} className="mb-10">
                  <CardBody>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                            <select 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600 bg-white"
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
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                disabled={!selectedCourse}
                            >
                                <option value="">-- Choose a section --</option>
                                {sections.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} {s.schedule ? `- ${s.schedule}` : ''}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input 
                                type="date" 
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600 bg-white"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                      </div>
                  </CardBody>
                </Card>

                {isLoading ? (
                    <div className="text-center py-16 text-gray-500">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p>Loading user list...</p>
                    </div>
                ) : students.length > 0 ? (
                    <div className="animate-fade-in mb-10">
                        {instructorsList.length > 0 && renderTable(instructorsList, 'Instructor(s)')}
                        {studentsList.length > 0 && renderTable(studentsList, 'Students')}
                        
                        <div className="mt-8 flex justify-end">
                            <Button variant="primary" onClick={handleSave} className="px-8 py-3 rounded-lg shadow-md font-bold text-lg">
                                Save Attendance Records
                            </Button>
                        </div>
                    </div>
                ) : selectedSection ? (
                    <Card hover={false} className="py-16 text-center">
                         <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                         <p className="text-gray-500">There are currently no users assigned to this section.</p>
                    </Card>
                ) : (
                    <Card hover={false} className="py-16 text-center">
                         <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Course and Section</h3>
                         <p className="text-gray-500">Please choose a course and section above to view the attendance roster.</p>
                    </Card>
                )}
            </main>
        </div>
    );
};

export default AttendancePage;
