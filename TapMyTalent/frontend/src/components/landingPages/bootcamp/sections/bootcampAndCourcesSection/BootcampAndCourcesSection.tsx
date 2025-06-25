import FullStackCourse from "../../../../../assets/images/fullStackCourseImage.webp";
import DataEngineerCourse from "../../../../../assets/images/bigDataCourseImage.webp";
import ProjectManagementCourse from "../../../../../assets/images/projectManagementCourseImage.webp";
import BootcampCard from "../bootcampCard/BootcampCard";
import './BootcampAndCourcesSection.css';

interface Course {
    image: string;
    title: string;
}

const BootcampAndCourcesSection = () => {

    const courses: Course[] = [
        {image: FullStackCourse, title: "Full Stack Mastery: From Zero to Hero"},
        {image: DataEngineerCourse, title: "Data Engineering Pro: Build Scalable Data Pipelines"},
        {image: ProjectManagementCourse, title: "Project Management Mastery: Plan, Execute, Succeed"}
    ];
    return (
        <section
            className="bootcamp-and-cources-section"
        >
            <div className="container bootcamp-and-cources-container">
                <h1 className="bootcamp-and-cources-title">Bootcamp and Courses</h1>
                <div className="bootcamp-and-cources-cards">
                    {courses.map((course, index) => (
                        <BootcampCard
                            key={index}
                            image={course.image}
                            title={course.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BootcampAndCourcesSection;