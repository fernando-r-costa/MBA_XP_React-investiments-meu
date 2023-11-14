import { investments, reports } from "./data";

let reportsSort = [];

reportsSort = reports.sort((a, b) => a.month - b.month);

function getShortMonthName(monthNumber) {
    const months = [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
    ];
    return months[monthNumber - 1] || "";
}

function processInvestmentData(investments, reportsSort) {
    const processedData = [];

    investments.forEach((investment) => {
        const investmentData = {
            description: investment.description,
            reports: [],
            totalValueChange: 0,
        };

        const investmentReports = reportsSort.filter((report) =>
            report.investmentId.includes(investment.id)
        );

        investmentReports.forEach((report, index) => {
            const currentReport = {
                month: getShortMonthName(report.month),
                year: report.year,
                value: report.value,
                percentChange: 0,
            };

            if (index > 0) {
                const previousReport = investmentReports[index - 1];
                currentReport.percentChange =
                    ((currentReport.value - previousReport.value) /
                        previousReport.value) *
                    100;
            }

            investmentData.reports.push(currentReport);

            if (index === 0) {
                investmentData.totalValueChange = currentReport.value;
            } else if (index === investmentReports.length - 1) {
                investmentData.totalValueChange =
                    currentReport.value - investmentData.reports[0].value;
            }
        });

        processedData.push(investmentData);
    });

    return processedData;
}

export const processedData = processInvestmentData(investments, reportsSort);
