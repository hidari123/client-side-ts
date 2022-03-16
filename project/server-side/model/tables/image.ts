module.exports = sql => {
    sql.query(
        'SELECT table_name FROM information_schema.TABLES WHERE table_name = "image"',
        (err, res) => {
            if (res) return
            sql.query(`CREATE TABLE \`image\` {
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`file_key\` VARCHER(45) NOT NULL,
                \`file_name\` VARCHER(45) NOT NULL,
                PRIMARY KEY (\`id\`)
            }`)
        }
    )
}