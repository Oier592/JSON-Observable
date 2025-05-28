import { User } from "./user";
import { Support } from "./support";

export interface Datuak {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
}
