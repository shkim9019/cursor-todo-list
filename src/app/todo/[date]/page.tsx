import TodoListByDay from "../../../components/TodoListByDay";

export default function TodoPage({ params }: { params: { date: string } }) {
    return (
        <main>
            <TodoListByDay date={params.date} />
        </main>
    );
}
