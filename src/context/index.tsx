export const getStatusColor = (statusId: number | null) => {
    let statusColor = '#000';

    switch (statusId) {
        case 1:
            statusColor = 'green';
            break;
        case 2:
            statusColor = 'orange';
            break;
        case 3:
            statusColor = 'red';
            break;
        default:
            statusColor = '#000';
            break;
    }

    return statusColor;
};