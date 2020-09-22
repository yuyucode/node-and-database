const fs = require("fs");
const path = require("path")


class File {
    constructor(filename, name, ext, size, createTime, updateTime, isFile) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.isFile = isFile;
    }

    async getChildren() {
        if(this.isFile){
            return [];
        }
        let children =  await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const result = path.resolve(this.filename, name);
            return  File.getFile(result);
        })

        return Promise.all(children);
    }

    async getContent(isBuffer = false) {
        if(!this.isFile) {
            return null
        }
        if(isBuffer){
            return await fs.promises.readFile(this.filename)
        }else {
            return await fs.promises.readFile(this.filename, 'utf-8')
        }

    }


    static async getFile(filename) {
        const name = await path.basename(filename);
        const ext = await path.extname(name);
        const stats = await fs.promises.stat(filename);
        const {size, birthtime: createTime, mtime: updateTime} = stats
        const isFile = stats.isFile();
        return new File(filename, name, ext, size, createTime, updateTime, isFile);
    }

    static async getPathAllFile(filename) {
        let arr = await fs.promises.readdir(filename);
        arr = arr.map(name => {
            const result = `${filename}/${name}`;
            return  this.getFile(result);
        })
        return Promise.all((arr))
    }
}

async function test() {
    const filename = path.resolve(__dirname, 'src/');
    const file = await File.getFile(filename)
    console.log(await file.getContent())
    const children = await file.getChildren();
    // console.log(children)
}

test();