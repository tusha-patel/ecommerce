import prisma from "@/libs/prismadb";
import moment from "moment";



export default async function getGraphData() {
    try {
        // get the start and end dates for the data range (7 days ago to today)


        const startDate = moment().subtract(6, "days").startOf("day")
        const endDate = moment().endOf("day");


        // query the database to get order data grouped by created date

        const result = await prisma.order.groupBy({
            by: ["createData"],
            where: {
                createData: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: "complete"
            },
            _sum: {
                amount: true,
            }
        });


        const aggregatedData: {
            [day: string]: { day: string, date: string, totalAmount: number }
        } = {};


        // creare a clone of the start date to iterate over each day

        const currentDate = startDate.clone();


        // iterrate over each day in the date range

        while (currentDate <= endDate) {
            // format the day as a string
            const day = currentDate.format("dddd");
            console.log("day <<< ", day, currentDate);

            aggregatedData[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0,
            }
            currentDate.add(1, "day");
        }


        result.forEach((entry) => {
            const day = moment(entry.createData).format("dddd");
            const amount = entry._sum.amount || 0
            aggregatedData[day].totalAmount += amount;
        });

        // convert the aggregatedData object to an array and sort it by date

        const formatterData = Object.values(aggregatedData).sort((a, b) => 
            moment(a.date).diff(moment(b.date))
        );


        // return the foratted data
        return formatterData;
    } catch (error: any) {
        throw new Error(error)
    }
}