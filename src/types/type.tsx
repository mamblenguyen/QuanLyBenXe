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
    ticket_price: number,
    status_id: number,
    status_name: string
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