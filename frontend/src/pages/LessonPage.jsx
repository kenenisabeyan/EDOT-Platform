import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, ArrowLeft, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

const LessonPage = () => {
  const { courseId } = useParams();
  
  // Real implementation would fetch lessons from API
  const [lessons] = useState([
    { id: 1, title: 'Introduction to React', duration: '15:20', completed: true },
    { id: 2, title: 'Setting up the Environment', duration: '10:45', completed: false },
    { id: 3, title: 'React Hooks Deep Dive', duration: '45:00', completed: false },
    { id: 4, title: 'State Management with Redux', duration: '55:30', completed: false }
  ]);
  
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [notes, setNotes] = useState('');

  const nextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const prevLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar specifically for Lesson Interface */}
      <nav className="bg-secondary text-white border-b border-gray-800 h-16 flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${courseId}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Course
          </Link>
          <div className="h-6 w-px bg-gray-700"></div>
          <h1 className="text-lg font-medium hidden md:block">Complete React Developer in 2026</h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-sm bg-gray-800 px-3 py-1 rounded-full text-gray-300">
                1 / {lessons.length} Completed
            </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
        {/* Left Side: Video & Content */}
        <div className="flex-1 overflow-y-auto bg-background flex flex-col border-r border-border">
          {/* Video Player Mockup */}
          <div className="bg-black aspect-video w-full flex items-center justify-center relative">
             <div className="text-white text-center">
                <PlayCircle size={64} className="mx-auto mb-4 opacity-50 cursor-pointer hover:opacity-100 hover:scale-110 transition-all text-primary" />
                <p>Simulating Video Player</p>
                <p className="text-sm text-gray-400">{currentLesson.title}</p>
             </div>
          </div>

          {/* Lesson Content Area */}
          <div className="p-8 max-w-4xl w-full mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl text-secondary">{currentLesson.title}</h2>
                <button className="flex items-center gap-2 bg-accent/10 text-green-700 hover:bg-accent hover:text-white border border-accent/20 px-4 py-2 rounded-button font-medium transition-colors">
                    <CheckCircle size={18} /> Mark as Completed
                </button>
            </div>
            
            <div className="flex gap-4 mb-8">
                <button onClick={prevLesson} disabled={currentLesson.id === lessons[0].id} className="btn-outline flex items-center gap-2 disabled:opacity-50">
                    <ChevronLeft size={16} /> Previous
                </button>
                <button onClick={nextLesson} disabled={currentLesson.id === lessons[lessons.length-1].id} className="btn-primary flex items-center gap-2 ml-auto">
                    Next Lesson <ChevronRight size={16} />
                </button>
            </div>

            {/* Notes Section */}
            <div className="mt-12 bg-white rounded-[12px] p-6 border border-border shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-secondary flex items-center gap-2">
                    <BookOpen size={20} className="text-primary"/> Personal Notes
                </h3>
                <textarea 
                    className="w-full h-32 border border-border rounded-[8px] p-4 focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-gray-50"
                    placeholder="Take notes for this lesson here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <button className="btn-primary mt-4 py-2 px-4 text-sm">Save Notes</button>
            </div>
          </div>
        </div>

        {/* Right Side: Curriculum Sidebar */}
        <div className="w-80 bg-white overflow-y-auto hidden lg:block">
            <div className="p-4 border-b border-border bg-gray-50">
                <h3 className="font-semibold text-secondary">Course Modules</h3>
                <div className="w-full bg-gray-200 mt-3 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
            </div>
            <div className="divide-y divide-border">
                {lessons.map((lesson) => (
                    <button 
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start gap-3 ${currentLesson.id === lesson.id ? 'bg-blue-50 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                    >
                        {lesson.completed ? (
                            <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                        ) : (
                            <PlayCircle size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                            <p className={`font-medium ${currentLesson.id === lesson.id ? 'text-primary' : 'text-gray-800'} text-sm`}>{lesson.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
