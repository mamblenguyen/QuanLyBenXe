const formatDate = (dateString: any) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};


const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN') + ' VND';
};

export { formatDate, formatCurrency };
