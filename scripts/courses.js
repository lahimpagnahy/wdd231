
document.addEventListener('DOMContentLoaded', () => {
    
    const courses = [
      {
        code: "CSE 110",
        name: "Introduction to Programming",
        credits: 3,
        completed: true, 
        category: "CSE"
      },
      {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 3,
        completed: true, 
        category: "WDD"
      },
      {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 3,
        completed: true, 
        category: "CSE"
      },
      {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 3,
        completed: false, 
        category: "CSE"
      },
      {
        code: "WDD 131",
        name: "Web Frontend Development I",
        credits: 3,
        completed: true, 
        category: "WDD"
      },
      {
        code: "WDD 231",
        name: "Web Frontend Development II",
        credits: 3,
        completed: false, 
        category: "WDD"
      }
    ];
  
    
    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsDisplay = document.getElementById('total-credits');
    const allBtn = document.getElementById('all-btn');
    const cseBtn = document.getElementById('cse-btn');
    const wddBtn = document.getElementById('wdd-btn');
  
    
    function displayCourses(courseArray) {
      
      coursesContainer.innerHTML = '';
  
      
      courseArray.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-card ${course.completed ? 'course-completed' : 'course-not-completed'}`;
        courseElement.textContent = course.code;
        coursesContainer.appendChild(courseElement);
      });
  
      
      const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
      totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
    }
  
    
    function setActiveButton(activeButton) {
      
      allBtn.classList.remove('active-btn');
      cseBtn.classList.remove('active-btn');
      wddBtn.classList.remove('active-btn');
  
      
      activeButton.classList.add('active-btn');
    }
  
    
    allBtn.addEventListener('click', () => {
      setActiveButton(allBtn);
      displayCourses(courses);
    });
  
    cseBtn.addEventListener('click', () => {
      setActiveButton(cseBtn);
      const cseCoursesOnly = courses.filter(course => course.category === 'CSE');
      displayCourses(cseCoursesOnly);
    });
  
    wddBtn.addEventListener('click', () => {
      setActiveButton(wddBtn);
      const wddCoursesOnly = courses.filter(course => course.category === 'WDD');
      displayCourses(wddCoursesOnly);
    });
  
    
    displayCourses(courses);
  });