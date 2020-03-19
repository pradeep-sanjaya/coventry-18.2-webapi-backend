let permission = {
    admin:{
        product:['view','edit','delete','add'],
        category:['view','edit','delete','add'],
        user:['view','edit','delete','add']
    },
    customer:{
        product:['view'],
        category:['view'],
        user:[]
    },
};

export default permission;
