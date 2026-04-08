import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

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
            <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1 space-y-8">
                
                {/* Section Creation Panel */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
                    <h1 className="text-2xl font-semibold text-secondary mb-6">Create New Section</h1>
                    <form onSubmit={handleCreateSection} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                            <select 
                                required
                                className="w-full border border-gray-300 rounded-lg p-2.5"
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
                                className="w-full border border-gray-300 rounded-lg p-2.5"
                                value={newSectionName}
                                onChange={(e) => setNewSectionName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Instructor *</label>
                            <select 
                                required
                                className="w-full border border-gray-300 rounded-lg p-2.5"
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
                                className="w-full border border-gray-300 rounded-lg p-2.5"
                                value={newSectionSchedule}
                                onChange={(e) => setNewSectionSchedule(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button type="submit" className="btn-primary" disabled={!selectedCourse}>
                                Create Section
                            </button>
                        </div>
                    </form>
                </div>

                {/* Manage Existing Sections Panel */}
                {selectedCourse && (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
                        <h2 className="text-xl font-semibold text-secondary mb-6">Manage Sections for Selected Course</h2>
                        {sections.length === 0 ? (
                            <p className="text-gray-500">No sections found for this course.</p>
                        ) : (
                            <div className="space-y-6">
                                {sections.map(section => (
                                    <div key={section.id} className="border border-gray-200 rounded-lg p-5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-secondary">{section.name}</h3>
                                                <p className="text-sm text-gray-500">Schedule: {section.schedule || 'N/A'}</p>
                                                <p className="text-sm text-gray-500">Instructor: {section.instructor_name || 'Unassigned'}</p>
                                                <p className="text-sm text-gray-500">Enrolled Students: {section.student_count || 0}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-200">
                                            {/* Assign New Instructor */}
                                            <div>
                                                <h4 className="text-sm font-semibold mb-2">Re-assign Instructor</h4>
                                                <div className="flex gap-2">
                                                    <select 
                                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                                        value={selectedSectionId === section.id ? assignInstructorId : ''}
                                                        onChange={(e) => {
                                                            setSelectedSectionId(section.id);
                                                            setAssignInstructorId(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">-- Choose --</option>
                                                        {instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                                    </select>
                                                    <button 
                                                        className="btn-primary text-xs w-24 py-1"
                                                        onClick={() => handleAssignInstructor(section.id)}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Add Students Multi-Select */}
                                            <div>
                                                <h4 className="text-sm font-semibold mb-2">Add Students</h4>
                                                <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto mb-2 bg-gray-50">
                                                    {students.map(student => (
                                                        <label key={student.id} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">
                                                            <input 
                                                                type="checkbox" 
                                                                className="text-primary focus:ring-primary rounded"
                                                                checked={selectedSectionId === section.id && selectedStudentIds.includes(student.id)}
                                                                onChange={() => {
                                                                    setSelectedSectionId(section.id);
                                                                    toggleStudentSelection(student.id);
                                                                }}
                                                            />
                                                            {student.name}
                                                        </label>
                                                    ))}
                                                </div>
                                                <button 
                                                    className="btn-primary text-sm w-full py-2"
                                                    onClick={() => handleAddStudents(section.id)}
                                                >
                                                    Add Selected Students
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageSectionsPage;
