"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../common/entities/user.entity");
const usersList_output_dto_1 = require("./dto/usersList.output.dto");
const typeorm_2 = require("@nestjs/typeorm");
let NewService = class NewService {
    constructor(usersRepository, dataSource) {
        this.usersRepository = usersRepository;
        this.dataSource = dataSource;
    }
    async login(user, req) {
        try {
            const newUser = await this.usersRepository.save({
                name: user.name,
            });
            req.session.currentUser = {
                username: newUser.name,
                userId: newUser.id,
                role: "user",
            };
            return newUser;
        }
        catch (e) {
            if (e.code === "ER_DUP_ENTRY") {
                throw new common_1.ConflictException();
            }
            throw e;
        }
        return { statusCode: 200 };
    }
    async getProfile(currentUser) {
        if (!currentUser) {
            throw new common_1.UnauthorizedException();
        }
        return currentUser;
    }
    async getInfo() {
        const query = this.dataSource.createQueryBuilder(user_entity_1.UserEntity, "users");
        const results = await query.getMany();
        return { users: results.map(usersList_output_dto_1.UserListOutputDto.new) };
    }
    async validateUser(username, password) {
        const user = await this.usersRepository.findOne({
            where: { name: username },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Account with this email isn’t registered");
        }
        if (user) {
            return user;
        }
    }
};
NewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], NewService);
exports.NewService = NewService;
//# sourceMappingURL=new.service.js.map