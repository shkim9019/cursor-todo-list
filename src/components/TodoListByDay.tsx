"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { todosState, Todo } from "../lib/atoms";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading.json";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";
import _ from "lodash";

interface TodoListByDayProps {
    date: string;
}

const TodoListByDay: React.FC<TodoListByDayProps> = ({ date }) => {
    const [todos, setTodos] = useRecoilState(todosState);
    const [newTodoContent, setNewTodoContent] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const todosForDay = todos.filter((todo) => _.isEqual(todo.date, date));

    const formatDate = (date: string): string => {
        // 입력된 문자열을 Date 객체로 파싱
        const parsedDate = parse(date, "yyyy-MM-dd", new Date());
        // 파싱된 Date 객체를 원하는 형식으로 포맷팅
        return format(parsedDate, "yyyy-MM-dd");
    };

    const addTodo = useCallback(() => {
        const trimmedContent = newTodoContent.trim();
        if (trimmedContent) {
            const newTodo: Todo = {
                id: uuidv4(),
                date: formatDate(date),
                content: trimmedContent,
                completed: false,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoContent(""); // 입력 필드 비우기
        }
    }, [newTodoContent, date, setTodos]);

    const handleKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (_.isEqual(e.key, "Enter") && !isComposing) {
                e.preventDefault();
                addTodo();
            }
        },
        [addTodo, isComposing]
    );

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                _.isEqual(todo.id, id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => !_.isEqual(todo.id, id)));
    };

    const formattedDate = format(
        parse(date, "yyyy-MM-dd", new Date()),
        "yyyy년 MM월 dd일",
        { locale: ko }
    );

    if (!isClient) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Lottie
                    animationData={loadingAnimation}
                    style={{ width: 200, height: 200 }}
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-4 sm:mt-6 md:mt-10 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
                <button
                    onClick={() => router.push("/")}
                    className="bg-primary text-white p-2 rounded hover:bg-opacity-90 text-responsive-sm mb-2 sm:mb-0"
                >
                    ← 달력으로
                </button>
                <div className="text-center">
                    <h2 className="text-responsive-xl font-bold mb-1 sm:mb-2">
                        할일 목록
                    </h2>
                    <p className="text-responsive-base text-gray-600">
                        {formattedDate}
                    </p>
                </div>
                <div className="w-20 hidden sm:block"></div>
            </div>
            <div className="mb-4 sm:mb-6">
                <input
                    type="text"
                    value={newTodoContent}
                    onChange={(e) => setNewTodoContent(e.target.value)}
                    onKeyUp={handleKeyUp}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    className="w-full p-2 sm:p-3 border rounded text-responsive-base"
                    placeholder="새로운 할일 추가"
                />
                <button
                    onClick={addTodo}
                    className="mt-2 sm:mt-3 w-full bg-primary text-white p-2 sm:p-3 rounded hover:bg-opacity-90 text-responsive-base"
                >
                    할일 추가
                </button>
            </div>
            <ul className="space-y-2 sm:space-y-3">
                {todosForDay.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between p-2 sm:p-3 border rounded"
                    >
                        <span
                            className={`flex-grow text-responsive-base ${
                                todo.completed
                                    ? "line-through text-gray-500"
                                    : ""
                            }`}
                        >
                            {todo.content}
                        </span>
                        <div>
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="ml-2 p-1 sm:p-2 bg-tertiary rounded text-responsive-sm"
                            >
                                {todo.completed ? "취소" : "완료"}
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="ml-2 p-1 sm:p-2 bg-accent text-white rounded text-responsive-sm"
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoListByDay;
