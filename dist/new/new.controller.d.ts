import { NewService } from './new.service';
export declare class NewController {
    private readonly newService;
    constructor(newService: NewService);
    getInfo(): {
        info: string;
    };
}
