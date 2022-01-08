import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        if(!obj) {
            return null
        }

        const errors = await validate(obj)

        if(errors.length) {
            let messages = errors.map(err => {
                return {
                    property: err.property,
                    errors: Object.values(err.constraints)
                }
            })
            throw new ValidationException(messages)
        }

        return value
    }

}