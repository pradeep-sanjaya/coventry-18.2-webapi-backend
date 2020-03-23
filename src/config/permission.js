let permission = {
    admin: {
        product: ['view', 'edit', 'delete', 'add'],
        category: ['view', 'edit', 'delete', 'add'],
        cart: ['view', 'edit', 'delete', 'add'],
        user: ['view', 'edit', 'delete', 'add']
    },
    customer: {
        product: ['view'],
        category: ['view'],
        cart: ['view', 'edit', 'delete', 'add'],
        user: ['view']
    },
};

export default permission;
