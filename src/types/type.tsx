export interface Garage {
    id: number;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
}
export interface BusStation {
    id: string;
    name: string;
    address: string;
    province: {
        province_id: string;
        name: string;
    };
    status: {
        id: number,
        name: string
    }
}
export interface Bus {
    id: string;
    bus_number: string;
    model: {
        id: string,
        name: string,
        capacity: number
    };
    status: {
        id: number,
        name: string
    };
    images: [];
    garage?: Garage | null;
}
export interface Driver {
    id: 5,
    name: "Driver E",
    phone: "0808080808",
    email: "driverE@example.com",
    role: "driver",
}

export interface Schedule {
    id: number,
    departure_time: string,
    arrival_time: string,
    ticket_price: string,
    status_id: number,
    status_name: string
    bus_model_id: number
}
export interface Routes {
    id: number,
    departure_station_id: BusStation,
    arrival_station_id: BusStation,
    garage_id: Garage | null,
    schedule: Schedule[],
    bus_id: Bus,
    driver_id: Driver,
    status: {
        id: number,
        name: string
    }
}
export interface OneSchedule {
    id: number,
    departure_station_id: BusStation,
    arrival_station_id: BusStation,
    garage_id: Garage | null,
    schedule: Schedule,
    bus_id: Bus,
    driver_id: Driver,
    status: {
        id: number,
        name: string
    }
}

//Tickets


export interface Route {
    id: number;
    departure_station_id: number;
    arrival_station_id: number;
    garage_id: number;
    bus_id: number;
    driver_id: string;
    route_status_id: number;
    created_at: string;
    updated_at: string;
}

export interface TicketSchedule {
    id: number;
    route_id: number;
    departure_time: string;
    arrival_time: string;
    ticket_price: string;
    created_at: string;
    updated_at: string;
    schedule_status_id: number;
    route: Route;
}

export interface Ticket {
    id: number;
    name: string,
    phone: string,
    depart_station: string,
    depart_adress: string,
    arrival_station: string,
    arrival_adress: string,
    depart_time: string,
    arrival_time: string,
    ticket_price: string,
    bus_model: string,
    status_id: number,
    status_name: string,
    bus_number: string,
    date: string;
    ticket_seat: number[];
}