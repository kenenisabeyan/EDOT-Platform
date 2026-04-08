import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

const ManageSectionsPage = () => {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [sections, setSections] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState('');
    
    // New section state
    const [newSectionName, setNewSectionName] = useState('');
    const [newSectionSchedule, setNewSectionSchedule] = useState('');
    const [newSectionInstructor, setNewSectionInstructor] = useState('');

    // Assigning users state
    const [selectedSectionId, setSelectedSectionId] = useState('');
    const [assignInstructorId, setAssignInstructorId] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

    const token = localStorage.getItem('token') || 'test-token';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, instRes, studRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/courses', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:5000/api/users?role=instructor', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:5000/api/users?role=student', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                
                setCourses(coursesRes.data || []);
                setInstructors(instRes.data || []);
                setStudents(studRes.data || []);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        if (selectedCourse) {
            fetchSections();
        } else {
            setSections([]);
        }
    }, [selectedCourse]);

    const fetchSections = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/sections?courseId=${selectedCourse}`);
            setSections(res.data || []);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const handleCreateSection = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/sections', {
                name: newSectionName,
                courseId: selectedCourse,
                instructorId: newSectionInstructor,
                schedule: newSectionSchedule
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            alert('Section created successfully!');
            setNewSectionName('');
            setNewSectionSchedule('');
            setNewSectionInstructor('');
            fetchSections();
        } catch (error) {
            console.error('Error creating section:', error);
            alert('Failed to create section.');
        }
    };

    const handleAssignInstructor = async (sectionId) => {
        if (!assignInstructorId) return alert('Select an instructor first');
        
        try {
            await axios.post(`http://localhost:5000/api/sections/${sectionId}/assign-instructor`, {
                instructorId: assignInstructorId
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            alert('Instructor assigned successfully!');
            fetchSections();
        } catch (error) {
            console.error('Error assigning instructor:', error);
        }
    };

    const handleAddStudents = async (sectionId) => {
        if (selectedStudentIds.length === 0) return alert('Select at least one student');

        try {
            await axios.post(`http://localhost:5000/api/sections/${sectionId}/add-student`, {
                studentIds: selectedStudentIds
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            alert('Students added successfully!');
            setSelectedStudentIds([]);
            fetchSections();
        } catch (error) {
            console.error('Error adding students:', error);
        }
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudentIds(prev => 
            prev.includes(studentId) 
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
                <PageHeader title="Manage Sections" subtitle="Create, configure and assign students to groups." />
                
                <div className="space-y-10">
                    {/* Section Creation Panel */}
                    <Card hover={false}>
                        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-gray-900">Create New Section</h2>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleCreateSection} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                                    <select 
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600 bg-white"
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                    >
                                        <option value="">-- Choose a course --</option>
                                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Section Name (e.g. Batch 1) *</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600"
                                        value={newSectionName}
                                        onChange={(e) => setNewSectionName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assign Instructor *</label>
                                    <select 
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600 bg-white"
                                        value={newSectionInstructor}
                                        onChange={(e) => setNewSectionInstructor(e.target.value)}
                                    >
                                        <option value="">-- Assign Instructor --</option>
                                        {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                                    <input 
                                        type="text" 
                                        placeholder="E.g., Mon/Wed 10:00 AM"
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-600 focus:border-blue-600"
                                        value={newSectionSchedule}
                                        onChange={(e) => setNewSectionSchedule(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <Button type="submit" variant="primary" disabled={!selectedCourse}>
                                        Create Section
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>

                    {/* Manage Existing Sections Panel */}
                    {selectedCourse && (
                        <Card hover={false}>
                            <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                                <h2 className="text-xl font-bold text-gray-900">Manage Sections for Selected Course</h2>
                            </CardHeader>
                            <CardBody>
                                {sections.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">No sections found for this course.</div>
                                ) : (
                                    <div className="space-y-6">
                                        {sections.map(section => (
                                            <div key={section.id} className="border border-gray-200 bg-white rounded-lg p-6 shadow-sm">
                                                <div className="mb-6 pb-4 border-b border-gray-100">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{section.name}</h3>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                        <span><span className="font-semibold">Schedule:</span> {section.schedule || 'N/A'}</span>
                                                        <span><span className="font-semibold">Instructor:</span> {section.instructor_name || 'Unassigned'}</span>
                                                        <span><span className="font-semibold">Enrolls:</span> {section.student_count || 0}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    {/* Assign New Instructor */}
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Re-assign Instructor</h4>
                                                        <div className="flex gap-3">
                                                            <select 
                                                                className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-blue-600 focus:border-blue-600"
                                                                value={selectedSectionId === section.id ? assignInstructorId : ''}
                                                                onChange={(e) => {
                                                                    setSelectedSectionId(section.id);
                                                                    setAssignInstructorId(e.target.value);
                                                                }}
                                                            >
                                                                <option value="">-- Choose Instructor --</option>
                                                                {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                                            </select>
                                                            <Button 
                                                                variant="outline"
                                                                className="px-6 whitespace-nowrap"
                                                                onClick={() => handleAssignInstructor(section.id)}
                                                            >
                                                                Assign
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Add Students Multi-Select */}
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Enroll Students</h4>
                                                        <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto mb-4 bg-gray-50 shadow-inner grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {students.map(student => (
                                                                <label key={student.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-1.5 rounded transition-colors border border-transparent hover:border-gray-200">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="w-4 h-4 text-blue-600 focus:ring-blue-600 rounded border-gray-300"
                                                                        checked={selectedSectionId === section.id && selectedStudentIds.includes(student.id)}
                                                                        onChange={() => {
                                                                            setSelectedSectionId(section.id);
                                                                            toggleStudentSelection(student.id);
                                                                        }}
                                                                    />
                                                                    <span className="truncate">{student.name}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <Button 
                                                            variant="primary"
                                                            className="w-full"
                                                            onClick={() => handleAddStudents(section.id)}
                                                        >
                                                            Enroll Selected Students
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ManageSectionsPage;
