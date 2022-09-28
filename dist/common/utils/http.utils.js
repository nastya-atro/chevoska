"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = exports.createResponse = void 0;
const createResponse = (body) => (Object.assign({ errorCode: null, message: null, payload: null, status: null }, body));
exports.createResponse = createResponse;
exports.response = {
    ok: (body) => (0, exports.createResponse)(Object.assign(Object.assign({}, body), { status: 'OK' })),
    error: (body) => (0, exports.createResponse)(Object.assign(Object.assign({}, body), { status: 'ERROR' })),
};
//# sourceMappingURL=http.utils.js.map