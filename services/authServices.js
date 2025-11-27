import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

const { JWT_SECRET } = process.env;

export const findUser = async (where) => {
    return User.findOne({ where });
};

export const registerUser = async (payload) => {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ password, email }) => {
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user.id,
    };

    const token = createToken(payload);
    console.log(token);

    await user.update({ token });
    return {
        token,
        email: user.email,
    };
};

export const refreshUser = async (user) => {
    const token = createToken({ id: user.id });

    await user.update({ token });
    return {
        token,
        email: user.email,
    };
};

export const logoutUser = async (user) => {
    await user.update({ token: null });
    return true;
};
