"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmailAndPassword = exports.isAuthenticated = void 0;
exports.isAuthenticated = function (_a) {
    var email = _a.email;
    if (!email) {
        throw new Error('Please login to continue');
    }
};
exports.validateEmailAndPassword = function (_a) {
    var input = _a.input;
    try {
        var _b = __assign({}, input), email = _b.email, password = _b.password;
        var emailtPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!emailtPattern.test(email)) {
            throw new Error('Invalid email format');
        }
        if (password.length < 1) {
            throw new Error('The password cannot be empty');
        }
    }
    catch (error) {
        throw error;
    }
};
