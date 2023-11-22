import { useState } from "react";
import { processedData } from "@/data/processedData";
import MyChart from "./chart";

export default function Main() {
    const [selectInvestment, setSelectInvestment] = useState("Fundo de Ações");

    const filteredInvestment = processedData.filter((investment) =>
        investment.description.includes(selectInvestment)
    );

    const onSelectInvestment = (event) => {
        setSelectInvestment(event.target.value);
    };

    return (
        <main className="container mx-auto mt-4">
            <form className="flex flex-col gap-2 text-lg lg:flex-row lg:justify-center">
                <label htmlFor="investments">Para informações detalhadas escolha o investimento:</label>
                <select
                    name="investments"
                    className="w-60 shadow-xl rounded-md p-1 bg-blue-100 cursor-pointer"
                    onChange={onSelectInvestment}
                >
                    {processedData.map((investment, index) => (
                        <option key={index}>{investment.description}</option>
                    ))}
                </select>
            </form>
            {filteredInvestment.map((investment, index) => (
                <div key={index} className="my-4 border-2 rounded-sm">
                    <h2 className="text-center font-bold text-xl p-1">
                        {investment.description}
                    </h2>
                    <h3 className="text-center font-bold text-lg p-1">
                        Rendimento total:
                        <span
                            className={`${investment.totalValueChange >= 0
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {` R$ ${investment.totalValueChange.toLocaleString("pt-BR", {
                                maximumFractionDigits: 2,
                            })}
            (${((investment.totalValueChange / 1000) * 100).toLocaleString(
                                "pt-BR",
                                { maximumFractionDigits: 2 }
                            )} %)`}
                        </span>
                    </h3>
                    <div className="flex justify-evenly">
                        <table className="table-auto w-1/4 m-4">
                            <tbody>
                                {investment.reports.map((report, index) => (
                                    <tr
                                        key={index}
                                        className={`leading-10 ${index % 2 === 0 ? "bg-blue-100" : "bg-white"
                                            }`}
                                    >
                                        <td className="w-20 text-right pl-3 font-semibold">{`${report.month.toLocaleString(
                                            "pt-BR",
                                            { month: "short" }
                                        )}/${report.year}`}</td>
                                        <td
                                            className={`font-semibold pl-12 ${report.percentChange !== 0
                                                ? report.percentChange >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                : ""
                                                }`}
                                        >
                                            {`${report.value.toLocaleString("pt-BR", {
                                                minimumFractionDigits: 2,
                                                style: "currency",
                                                currency: "BRL",
                                            })}`}
                                        </td>
                                        <td
                                            className={`w-20 pr-3 text-right font-semibold ${report.percentChange !== 0
                                                ? report.percentChange >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                : ""
                                                }`}
                                        >{`${report.percentChange.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                        })} %`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <span className="w-8/12 m-auto ">
                            <MyChart filteredInvestment={filteredInvestment} />
                        </span>
                    </div>
                </div>
            ))}
        </main>
    );
}
