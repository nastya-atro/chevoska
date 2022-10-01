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
exports.NewController = void 0;
const common_1 = require("@nestjs/common");
const new_service_1 = require("./new.service");
const current_user_decorators_1 = require("../common/decorators/current-user.decorators");
let NewController = class NewController {
    constructor(newService) {
        this.newService = newService;
    }
    login(req) {
        return this.newService.login(req.body, req);
    }
    logout(req, res) {
        req.session.destroy(function () {
            res.clearCookie(process.env.SESSION_NAME);
            res.status(200);
            res.send({ message: "Successfully logged out" });
        });
    }
    getProfile(user) {
        return this.newService.getProfile(user);
    }
    getInfo() {
        return this.newService.getInfo();
    }
};
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NewController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("/currentUser"),
    __param(0, (0, current_user_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("/users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewController.prototype, "getInfo", null);
NewController = __decorate([
    (0, common_1.Controller)("system"),
    (0, common_1.UseGuards)(),
    __metadata("design:paramtypes", [new_service_1.NewService])
], NewController);
exports.NewController = NewController;
//# sourceMappingURL=new.controller.js.map