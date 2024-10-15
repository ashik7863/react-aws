export const GetColumn = (name) => {
    if(name=='Menu'){
        const expenseColumns = [
            { header: 'No.', field: 'no' },
            { header: 'Menu ID', field: 'menu_id' },
            { header: 'Menu Name', field: 'menu_name' },
            { header: 'Description', field: 'description' }
        ];
        return expenseColumns;
    }
};
