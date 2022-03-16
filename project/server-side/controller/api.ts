import file_upload = require("../utils/file_upload")

export = {
    upload: async (req: Express.Request) => {
        const file = await file_upload(req)
        console.log(file)
    }
}