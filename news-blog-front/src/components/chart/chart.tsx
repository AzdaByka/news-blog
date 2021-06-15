import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import {format, parseISO, subDays, subMonths} from "date-fns";
import {Component} from "react";
import axios from "axios";
import {BASE, STATISTICS_AUDITORIUM, STATISTICS_PUBLICATION} from "../../constants/routes";
import Auth from "../../connection/auth";

interface IProps {
    data:[]
}

export default class Chart extends Component {

    constructor(states:IProps) {
        super(states);
        this.state = {
            date:[]
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get(
                BASE+STATISTICS_AUDITORIUM,
                {
                    params:{
                        "id":Auth.getUserId()
                    },
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
            )
            this.setState({
                date:response.data
            })
        } catch (e) {
            alert(e)

            console.log(e)
            this.setState({
                isLoaded: true,
                e
            });
        }
    }

    render() {
        const localState: any = this.state;

        let data: any[];
        data = [];
        for (let num = 12; num >= 0; num--) {
            data.push({
                date: subMonths(new Date(), num).toISOString().substr(0, 10),
                value: localState.date[num],
            });
            console.log(subMonths(new Date(), num).toISOString().substr(0, 10))

        }
        return (
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}/>
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>

                    <Area dataKey="value" stroke="#2451B7" fill="url(#color)"/>

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => {
                            const date = parseISO(str);
                                return format(date, "MMMM");
                        }}
                    />

                    <YAxis
                        dataKey="value"
                        axisLine={false}
                        tickLine={false}
                        tickCount={1}
                        tickFormatter={(number) => `${number}`}
                    />

                    <Tooltip content={<CustomTooltip active={false} label={'fdsfsd'} payload={'dfsf'}/>}/>

                    <CartesianGrid opacity={0.1} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

function CustomTooltip({ active, payload, label }:{active:any,payload:any, label:any }) {
    if (active) {
        return (
            <div className="tooltip">
                {/*<h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>*/}
                {/*<p>${payload[0].value.toFixed(2)} CAD</p>*/}
            </div>
        );
    }
    return null;
}