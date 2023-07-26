"use client"
import CourseView from '@/app/Components/CourseView';
import SavedCourseCard from '@/app/Components/SavedCoursesPage/SavedCourseCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
export default function Saved() {
    // we're gonna fetch courses here
    const courses = [
        {
            imageUrl:
                "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxMXx8bWF4aW1hbGZvY3VzfGVufDF8fHx8MTY1MjIyMDQyNA&ixlib=rb-1.2.1&q=80&w=1080",
            title: "Power BI",
            duration: "1h 53m",
            rating: 4.9,
            price: 24,
            tutor: {
                name: "John Eames",
                imageUrl:
                    "https://assets.api.uizard.io/api/cdn/stream/e0a18e97-fd79-46de-abbf-93741b790082.jpg",
            },
            description: "Learn how to use Power BI, from beginner basics to advanced techniques, with online video tutorials taught by industry experts.",
            recommendedCourses: [],
        },
        {
            imageUrl:
                "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudHxlbnwxfHx8fDE2NTc1Mzg0Njg&ixlib=rb-1.2.1&q=80&w=1080",
            title: "Agile Project Management",
            duration: "59m",
            rating: 4.3,
            price: 18,
            tutor: {
                name: "Curt Rits",
                imageUrl:
                    "https://assets.api.uizard.io/api/cdn/stream/e0a18e97-fd79-46de-abbf-93741b790082.jpg",
            },
            recommendedCourses: [],
            description: "Learn how to use Agile Project Management, from beginner basics to advanced techniques, with online video tutorials taught by industry experts.",
        },
        {
            title: "Pivot Tables",
            tutor: {
                name: "Jane Doe",
                imageUrl: "https://images.unsplash.com/photo-1527423460268-0b3795a97e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxNDh8fGxhZHl8ZW58MXx8fHwxNjcyOTk1Njcw&ixlib=rb-4.0.3&q=80&w=1080",
            },
            imageUrl: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwyfHxleGNlbHxlbnwxfHx8fDE2NzI5OTU0NTg&ixlib=rb-4.0.3&q=80&w=1080",
            duration: "1h 24m",
            rating: 4.6,
            description: "Explore the world of data science and analytics.",
            price: 24,
            recommendedCourses: [],
        },
        {
            title: "Powe BI",
            tutor: {
                name: "Ian Brown",
                imageUrl: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxMnx8bWFufGVufDF8fHx8MTY3Mjk2ODk3NQ&ixlib=rb-4.0.3&q=80&w=1080",
            },
            imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxNXx8Y29udGVudHxlbnwxfHx8fDE2NzI5OTU1OTA&ixlib=rb-4.0.3&q=80&w=1080",
            duration: "1h 17m",
            rating: 4.1,
            description: "Build cross-platform mobile apps using React Native.",
            price: 100,
            description: "Learn how to use Power BI, from beginner basics to advanced techniques, with online video tutorials taught by industry experts.",
            recommendedCourses: [],
        },
    ]
    const searchParams = useSearchParams()
    const router = useRouter()
    const path = usePathname()

    const [expandedCourseIndex, setExpandedCourseIndex] = useState(
        searchParams.get('courseIndex') || 0
    );

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        return params.toString()
    }, [expandedCourseIndex])

    const handleCourseClick = (e, index) => {
        e.preventDefault();
        setExpandedCourseIndex(index);
        router.push(
            `${path}?${createQueryString('courseIndex', index)}`,
        )
    };

    return (
        <main className='min-w-full md:pl-12'>
            <div className='flex min-w-full'>
                <div className='basis-full'>
                    {
                        courses.map((course, index) => (
                            <div key={index}>
                                <SavedCourseCard index={index} handleClick={handleCourseClick} key={index} course={course} />
                                <div>
                                    {expandedCourseIndex === index && (
                                        <div className='block lg:hidden'>
                                            <CourseView course={course} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className='hidden lg:block md:basis-full'>
                    {
                        <CourseView course={courses[expandedCourseIndex]} />
                    }
                </div>
            </div>
        </main>
    )
}
