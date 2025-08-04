interface Employee {
    name: string;
    role: string;
    email: string;
    id: number;
    isActive: boolean;
}   

const team: Employee[] = [

    { id: 1, name: "ArunKumar", role: "Developer", email: "arunravur@gmail.com", isActive: true },
    { id: 2, name: "Ashwin Ram", role: "VB-operations", email: "ashwinram@gmail.com", isActive: true },
];

function addTeamMember(team: Employee[], member: Employee): Employee[] {
    return [...team, member];
}

const newMember: Employee = {
    id: 3,
    name: "Priya Sharma",
    role: "UI Designer",
    email: "priyasharma@gmail.com",
    isActive: true
};
const updatedTeam = addTeamMember(team, newMember);

function identity<T>(arg: T): T {
    return arg;
}

const a = identity<string>("Hello, TypeScript!");
const b = identity<number>(100);

interface Cardprops {
    title: string;
    content: string;
}

function Card({ title, content }: Cardprops) {
    return `
        <div className="card">
            <h3>${title}</h3>
            <p>${content}</p>
        </div>
    `;
}

function handleError(error: Error | null): void {
if (error) {
    console.error("An error occurred:", error.message);
}
}