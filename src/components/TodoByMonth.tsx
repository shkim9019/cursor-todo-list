"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { todosState } from "../lib/atoms";
import "react-calendar/dist/Calendar.css";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading.json";
import _ from "lodash";
import { format } from "date-fns";

const TodoByMonth: React.FC = () => {
    const todos = useRecoilValue(todosState);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const formatDate = (date: Date): string => {
        return format(date, "yyyy-MM-dd");
    };

    const getTodosForDate = useMemo(
        () => (date: Date) => {
            const dateString = formatDate(date);
            return todos.filter((todo) => _.isEqual(todo.date, dateString));
        },
        [todos]
    );

    const handleDateClick = (date: Date | Date[]) => {
        if (date instanceof Date) {
            const dateString = formatDate(date);
            router.push(`/todo/${dateString}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)] overflow-hidden">
                <Lottie
                    animationData={loadingAnimation}
                    style={{ width: 200, height: 200 }}
                />
            </div>
        );
    }

    return (
        <div className="todo-by-month w-full max-w-6xl mx-auto px-4">
            <Calendar
                onChange={(date) => handleDateClick(date as Date)}
                tileContent={({ date, view }) =>
                    view === "month" ? (
                        <div className="mt-2 space-y-[2px]">
                            {getTodosForDate(date)
                                .slice(0, 3)
                                .map((todo, index) => (
                                    <div
                                        key={index}
                                        className="text-[10px] leading-[14px] h-[14px] truncate bg-blue-100 rounded px-1 overflow-hidden"
                                        title={todo.content}
                                    >
                                        {todo.content}
                                    </div>
                                ))}
                            {getTodosForDate(date).length > 3 && (
                                <div className="text-[10px] leading-[14px] h-[14px] text-gray-500 truncate">
                                    ...
                                </div>
                            )}
                        </div>
                    ) : null
                }
                className="w-full rounded-lg shadow-lg text-sm"
                locale="ko-KR"
                tileClassName={({ date, view }) =>
                    view === "month"
                        ? "flex flex-col items-start justify-start p-2 h-[100px]"
                        : ""
                }
                formatDay={(locale, date) => date.getDate().toString()}
            />
        </div>
    );
};

export default TodoByMonth;
