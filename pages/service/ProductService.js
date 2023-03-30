export const ProductService = {
    getProductsData() {
        return [                  
            {
                id: '1028',               
                message: 'aaaa',               
                text: [
                    {
                        id: '1028-0',
                        letter: 'a',                        
                        status: 'N'
                    },
                    {
                        id: '1028-1',
                        letter: 'a',                        
                        status: 'N'
                    },
                    {
                        id: '1028-2',
                        letter: 'a',                        
                        status: 'N'
                    },
                    {
                        id: '1028-3',
                        letter: 'a',                        
                        status: 'N'
                    }
                ]
            },
            {
                id: '1029',                
                message: 'test',              
                text: [
                    {
                        id: '1029-0',
                        letter: 't',                        
                        status: 'N'
                    },
                    {
                        id: '1029-1',
                        letter: 'e',                        
                        status: 'N'
                    },
                    {
                        id: '1029-2',
                        letter: 's',                        
                        status: 'N'
                    },
                    {
                        id: '1029-3',
                        letter: 't',                        
                        status: 'Y'
                    }
                ]
            },
            {
                id: '1030',                
                message: 'test',              
                text: [
                    {
                        id: '1030-0',
                        letter: 't',                        
                        status: 'S'
                    },
                    {
                        id: '1030-1',
                        letter: 'e',                        
                        status: 'S'
                    },
                    {
                        id: '1030-2',
                        letter: 's',                        
                        status: 'S'
                    },
                    {
                        id: '1030-3',
                        letter: 't',                        
                        status: 'S'
                    }
                ]
            },
            {
                id: '1030',                
                message: 'test',              
                text: [
                    {
                        id: '1030-0',
                        letter: 't',                        
                        status: 'S'
                    },
                    {
                        id: '1030-1',
                        letter: 'e',                        
                        status: 'S'
                    },
                    {
                        id: '1030-2',
                        letter: 's',                        
                        status: 'S'
                    },
                    {
                        id: '1030-3',
                        letter: 't',                        
                        status: 'S'
                    }
                ]
            },
            {
                id: '1030',                
                message: 'test',              
                text: [
                    {
                        id: '1030-0',
                        letter: 't',                        
                        status: 'S'
                    },
                    {
                        id: '1030-1',
                        letter: 'e',                        
                        status: 'S'
                    },
                    {
                        id: '1030-2',
                        letter: 's',                        
                        status: 'S'
                    },
                    {
                        id: '1030-3',
                        letter: 't',                        
                        status: 'S'
                    }
                ]
            }
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

