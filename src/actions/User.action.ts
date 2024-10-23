"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import admin from "@/lib/firebaseAdmin";
import { User } from "@/types";

export const getUserInfo = async () => {
    const token = cookies().get("access_token");

    if (token) {
        try {
            const decodedToken = jwt.decode(token.value) as {
                uid: string;
                email: string;
            };

            const userInfo = await getUserById(decodedToken.uid);
            return userInfo;
        } catch (err) {
            console.log("err in Rootlayout.tsx -> ", err);
            return null;
        }
    } else {
        return null;
    }
};

export const getUserById = async (id: string) => {
    const userInfo = await admin.firestore().collection("users").doc(id).get();

    if (userInfo.exists) {
        return userInfo.data() as User;
    }

    return null;
};
