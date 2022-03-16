const devConfig = {
    host: 'localhost',
    database: 'ts',
    user: 'hidari',
    password: 'hidari123'
}

const prodConfig = {
    host: 'xxx.xxx.xxx.xxx',
    database: 'ts',
    port: 3306
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig