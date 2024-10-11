export interface ProfileInfo {
    profile_id: string;
    name: string;
    email: string;
    user_role: string;
    balance: number;
}

export interface ContractData {
    contractor: string;
    title: string;
    description: string;
    amount: number;
    start_date: Date;
    end_date: Date;
}