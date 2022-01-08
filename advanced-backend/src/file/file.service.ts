import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as fs from "fs"
import * as uuid from "uuid"
import * as util from "util";

@Injectable()
export class FileService {
    async createFile(file: any): Promise<string> {
        try {
            const fileFullName = this.getUniqueFullName(file.originalname)
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }

            const writeFilePromise = util.promisify(fs.writeFile)

            await writeFilePromise(path.join(filePath, fileFullName), file.buffer)

            return fileFullName;
        }
        catch (e) {
            console.log(e)
            throw new HttpException('Error occurred during operations upon file.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    private getName(fullName: string) {
        fullName = fullName.split('.')[0]
        return fullName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    }

    private getNameAndSlice(fullName: string) {
        fullName = this.getName(fullName)
        if(fullName.length > 200) {
            return fullName.slice(0, 200)
        }
        return fullName
    }

    private getExtension(fullName: string) {
        return fullName.split('.').pop();
    }

    private getUniqueName(fullName: string) {
        const fileName = this.getNameAndSlice(fullName)
        return fileName + '-' + uuid.v4()
    }

    private getUniqueFullName(fullName: string) {
        const fileUniqueName = this.getUniqueName(fullName)
        const imageExtension = this.getExtension(fullName)

        return fileUniqueName + '.' + imageExtension
    }
}
