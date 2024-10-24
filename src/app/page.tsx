import TodoByMonth from "../components/TodoByMonth";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
            <h1 className="text-3xl font-bold text-primary">월별 할일 목록</h1>
            <div className="w-full max-w-5xl ">
                <TodoByMonth />
            </div>
        </main>
    );
}
