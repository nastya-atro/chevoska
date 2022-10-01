import { NewService } from "./new.service";
export declare class NewController {
    private readonly newService;
    constructor(newService: NewService);
    login(req: any): Promise<({
        name: any;
    } & import("../common/entities/user.entity").UserEntity) | {
        statusCode: number;
    }>;
    logout(req: any, res: any): void;
    getProfile(user: any): Promise<any>;
    getInfo(): Promise<{
        users: import("./dto/usersList.output.dto").UserListOutputDto[];
    }>;
}
