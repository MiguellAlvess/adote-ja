const mongoose = require('mongoose')


async function main(){
    await mongoose.connect('mongodb://localhost:27017/adoteja')

    console.log("Conexão feita com sucesso")
}

main().catch((err) => console.log(err))


module.exports = mongoose 