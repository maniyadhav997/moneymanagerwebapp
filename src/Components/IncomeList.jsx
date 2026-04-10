import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({transactions, onDelete}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Income Source
                </h5>
                <div className="flex items-center justify-end gap-2">
                    <button className="card-btn flex items-center gap-2">
                        <Mail size={15} className="text-base" /> Email
                    </button>
                     <button className="card-btn flex items-center gap-2 ">
                        <Download size={15} className="text-base" /> Download
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/** Display the incomes */}
                {transactions?.map((income) => (
                    <TransactionInfoCard 
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete = {() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default IncomeList;