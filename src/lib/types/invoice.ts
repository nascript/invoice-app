export interface Invoice {
  id: string; 
  name: string;
  number: string; 
  dueDate: string; 
  amount: number;
  status: "Paid" | "Unpaid" | "Pending";
}
