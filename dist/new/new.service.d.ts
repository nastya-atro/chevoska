import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../common/entities/user.entity";
import { UserListOutputDto } from "./dto/usersList.output.dto";
import { IncomingMessageSession } from "../shared/models/incoming-message-session.model";
export declare class NewService {
    private usersRepository;
    private dataSource;
    constructor(usersRepository: Repository<UserEntity>, dataSource: DataSource);
    login(user: any, req: IncomingMessageSession): Promise<({
        name: any;
    } & UserEntity) | {
        statusCode: number;
    }>;
    getProfile(currentUser: any): Promise<any>;
    getInfo(): Promise<{
        users: UserListOutputDto[];
    }>;
    validateUser(username: string, password: string): Promise<UserEntity>;
}
