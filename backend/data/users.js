import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true,
    },
    {
        name: 'Ian Lombu',
        email: 'ian@gmail.com',
        password: bcrypt.hashSync('ian123', 10),
        isAdmin: true,
    },
    {
        name: 'Saduk',
        email: 'saduk@gmail.com',
        password: bcrypt.hashSync('saduk123', 10),
        isAdmin: false,
    },
    
]

export default users