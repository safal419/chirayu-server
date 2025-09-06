declare class TopperDto {
    name: string;
    grade: string;
    gpa: string;
    photo: string;
}
export declare class CreateResultDto {
    batch: string;
    year: string;
    totalStudents: number;
    successRate: number;
    toppers: TopperDto[];
}
export {};
