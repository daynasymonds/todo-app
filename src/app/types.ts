export type Task = {
    id: string;
    title: string;
    description: string | undefined;
    deadline: Date | undefined;
    isCompleted: boolean;

}

export type Tasks = Task[];