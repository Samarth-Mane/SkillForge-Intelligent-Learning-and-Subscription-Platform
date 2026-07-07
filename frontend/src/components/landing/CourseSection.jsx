import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import CourseCard from "../course/CourseCard";
import { courseService } from "../../services/courseService";

const CourseSection = ({
    title,
    categoryId,
    featured = false,
    limit = 4,
}) => {

    const [courses, setCourses] = useState([]);

	useEffect(() => {

	    if (featured) {

	        courseService.getFeatured()
	            .then(({ data }) => {
	                setCourses(data.data || []);
	            });

	    } else {

	        courseService.getAll({
	            categoryId,
	            size: limit,
	        }).then(({ data }) => {
	            setCourses(data.content || []);
	        });

	    }

	}, [categoryId, featured]);

    if(courses.length===0) return null;

    return(

        <section className="section-padding">

            <div className="container-max">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="font-display text-3xl font-bold text-white">

                        {title}

                    </h2>

                    <Link
					to={
					    featured
					        ? "/courses"
					        : `/courses?category=${encodeURIComponent(title.replace(/^[^\w]+/, "").trim())}`
					}
                        className="text-indigo-400 flex items-center gap-2"
                    >
                        View All
                        <HiArrowRight/>
                    </Link>

                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {courses.map(course=>(

                        <motion.div
                            key={course.id}
                            initial={{opacity:0,y:20}}
                            whileInView={{opacity:1,y:0}}
                        >

                            <CourseCard course={course}/>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default CourseSection;